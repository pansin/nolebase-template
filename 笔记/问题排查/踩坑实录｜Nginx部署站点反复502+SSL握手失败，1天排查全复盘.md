# 踩坑实录｜Nginx部署站点反复502+SSL握手失败，1天排查全复盘

做运维/开发的朋友，有没有过这样的崩溃时刻：同一台服务器，一个站点正常运行，另一个站点却反复报502、SSL握手失败，排查半天找不到根源？

今天就给大家分享一次真实的排查经历——服务器上affine.riseai.com.cn正常访问，但同配置的maxdb.riseai.com.cn却接连出现「HTTP ERROR 502」「SSL_ERROR_SYSCALL」「ERR_CERT_COMMON_NAME_INVALID」三大错误，从上午折腾到下午，终于彻底解决。

全程实操无废话，包含Nginx配置、后端服务、域名解析、SSL证书四大核心排查点，新手也能跟着避坑，建议收藏备用！

## 一、问题初现：同一服务器，两个站点天差地别

环境说明：CentOS服务器，Nginx反向代理，两个站点（affine.riseai.com.cn、maxdb.riseai.com.cn），均配置SSL证书，后端服务监听8080端口（Gunicorn部署）。

异常现象：

- affine.riseai.com.cn：访问正常，SSL无警告，后端响应正常；

- maxdb.riseai.com.cn：客户端访问报「This page isn’t working HTTP ERROR 502」，用curl测试报「SSL_ERROR_SYSCALL in connection to maxdb.riseai.com.cn:443」，后续又出现「Your connection is not private（ERR_CERT_COMMON_NAME_INVALID）」。

初步判断：排除服务器防火墙、443端口占用问题（毕竟另一个站点正常），问题集中在maxdb站点的Nginx配置、后端转发或SSL证书上。

## 二、排查过程：从502到SSL，层层剥茧找根源

排查原则：先排除简单问题，再定位复杂问题；先服务器端，再客户端；先基础配置，再深层冲突。

### 第一步：排查502错误——后端服务是否正常？

502错误的核心原因通常是「Nginx转发请求到后端失败」，所以先从后端服务入手。

1. 检查后端8080端口监听状态（服务器端执行）：

```bash
ss -tulpn | grep 8080
```

输出结果正常，8080端口已正常监听（0.0.0.0:8080和[::]:8080均处于LISTEN状态），排除「后端服务未启动」问题。

2. 测试后端服务响应（模拟Nginx转发）：

```bash
# 测试根路径
curl -v http://127.0.0.1:8080/
# 测试/admin/路径
curl -v http://127.0.0.1:8080/admin/
```

测试结果：根路径返回302重定向到/admin/，/admin/路径返回200 OK+完整HTML页面——后端服务完全正常，502不是后端的问题。

### 第二步：排查502根源——Nginx转发配置是否异常？

后端正常，那问题就出在Nginx转发逻辑上。查看maxdb的Nginx主配置和root.conf（反向代理配置文件），发现2个致命问题：

1. 重复的443 server块：maxdb配置了两个监听443端口、server_name同为maxdb.riseai.com.cn的server块，且SSL参数（ssl_prefer_server_ciphers）一个为on、一个为off，导致配置冲突，Nginx转发逻辑混乱。

2. 302重定向未处理：后端根路径返回302重定向到/admin/，但Nginx未配置proxy_redirect指令，导致重定向地址指向内网127.0.0.1:8080，客户端无法访问，触发502。

修复操作：

- 删除重复的443 server块，保留一个完整的server块；

- 在root.conf中添加proxy_redirect指令，重写后端返回的内网重定向地址：

```nginx
proxy_redirect http://127.0.0.1:8080/ /;
proxy_redirect http://localhost:8080/ /;
```

重启Nginx后，502错误暂时消失，但新的问题出现了——SSL握手失败。

### 第三步：排查SSL握手失败——为什么同服务器另一个站点正常？

客户端执行curl测试，报错：「curl: (35) LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to maxdb.riseai.com.cn:443」。

既然affine站点正常，说明服务器443端口、防火墙、SSL协议兼容都没问题，问题集中在maxdb的Nginx SSL配置。

排查操作：

1. 对比maxdb和affine的SSL配置，发现maxdb的SSL协议、加密套件与affine不一致，且存在变量转义错误（proxy_set_header Host \$host; 中反斜杠多余）。

2. 修复maxdb的SSL配置，完全对齐affine的配置逻辑：

- 删除\$host前的反斜杠，修复变量解析错误；

- 对齐SSL协议（保留TLSv1.3 TLSv1.2 TLSv1.1 TLSv1）和加密套件，提升兼容性；

- 确保SSL证书路径正确，未混用affine的证书。

重启Nginx后，执行curl -I https://maxdb.riseai.com.cn/admin/ -k，仍报相同错误——排查陷入僵局。

### 第四步：突发转机——域名解析居然被删了！

反复检查Nginx配置、SSL证书、后端服务，均未发现问题，突然想到：会不会是域名解析出问题了？

登录域名服务商后台，果然！maxdb.riseai.com.cn的A记录被误删除，导致客户端访问时，DNS无法解析到服务器IP，看似是SSL握手失败，实则是“连不上服务器”。

修复操作：添加A记录解析，主机记录填maxdb，记录值填服务器公网IP，TTL设为600（10分钟生效）。

临时应急：客户端绑定hosts文件（服务器IP + maxdb.riseai.com.cn），立即测试，SSL握手失败问题解决，但又出现了新的警告。

### 第五步：最终收尾——证书域名不匹配导致“连接不安全”

浏览器访问时，提示「Your connection is not private」，报错代码「net::ERR_CERT_COMMON_NAME_INVALID」，核心原因：SSL证书绑定的域名不包含maxdb.riseai.com.cn。

排查操作：查看证书绑定的域名（服务器端执行）：

```bash
openssl x509 -in /www/sites/maxdb.riseai.com.cn/ssl/fullchain.pem -noout -text | grep -A 1 "Subject Alternative Name"
```

结果显示，证书仅绑定了affine.riseai.com.cn，未包含maxdb.riseai.com.cn——这是合法证书最常见的坑！

修复操作：重新申请SSL证书，添加maxdb.riseai.com.cn到域名列表，下载新的fullchain.pem和privkey.pem，替换到maxdb的ssl目录，重启Nginx，清除浏览器缓存。

## 三、问题总结：5个核心坑+避坑指南

本次排查历经5个小时，从502到SSL握手，再到域名解析、证书匹配，踩了5个典型的坑，整理成避坑指南，帮大家少走弯路：

### 坑1：Nginx重复server块导致配置冲突

✅ 避坑：同一域名、同一端口，仅保留一个server块，避免SSL参数、转发逻辑冲突。

### 坑2：后端302重定向未配置proxy_redirect

✅ 避坑：如果后端有重定向，务必在Nginx中添加proxy_redirect指令，重写内网重定向地址为外网域名。

### 坑3：Nginx变量转义错误

✅ 避坑：proxy_set_header Host $host; 中无需加反斜杠，反斜杠会导致Nginx无法解析变量。

### 坑4：误删域名解析，导致DNS无法解析

✅ 避坑：站点异常时，先测试域名解析（nslookup 域名），排除解析问题，再排查其他配置。

### 坑5：SSL证书绑定域名不完整

✅ 避坑：申请SSL证书时，务必将所有需要使用该证书的域名（含子域名）都添加到SAN列表中，避免证书不匹配。

## 四、最终效果&总结

修复所有问题后，客户端访问maxdb.riseai.com.cn：

- 域名解析正常，能正确指向服务器IP；

- SSL握手成功，浏览器无“连接不安全”提示；

- 根路径自动重定向到/admin/，页面正常显示，无502错误。

其实很多Nginx站点异常，都不是复杂的技术问题，而是细节配置失误——重复配置、参数错误、误操作（删解析）、证书漏绑域名，这些都是运维中高频出现的坑。

本次排查的核心逻辑：先定位“哪个环节出问题”（后端→Nginx→域名→证书），再对比“正常站点与异常站点的差异”，逐步缩小范围，最终找到根源。

如果你的站点也遇到502、SSL握手失败等问题，不妨按照本文的排查步骤逐一测试，大部分问题都能迎刃而解。

最后，收藏本文，下次遇到类似问题，直接对照排查，节省时间成本～

留言区聊聊：你在部署Nginx时，还踩过哪些难忘的坑？
> （注：文档部分内容可能由 AI 生成）