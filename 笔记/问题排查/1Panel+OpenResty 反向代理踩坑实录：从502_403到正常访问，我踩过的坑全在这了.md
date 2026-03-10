# 1Panel+OpenResty 反向代理踩坑实录：从502/403到正常访问，我踩过的坑全在这了

使用 1Panel 搭建反向代理，本以为是“点点点”的轻松事，结果一路踩坑：配置报错`duplicate location "/"`、访问出现**502 Bad Gateway**、日志狂刷**403 Forbidden**……

如果你也在 1Panel 上用 OpenResty 做反向代理，遇到空白页、启动失败、访问异常，这篇实战总结能帮你少走几小时弯路。

---

## 一、本次踩坑背景

- 环境：1Panel 面板 + OpenResty

- 用途：将`contract.riseai.com.cn`反向代理到目标服务

- 症状：

    1. 配置检测失败：`duplicate location "/"`

    2. 访问出现 502 / 403 交替报错

    3. 日志显示 IPv6 网络不可达、连接被拒绝

---

## 二、第一个坑：duplicate location "/" 重复路由

### 问题原因

1Panel 会**自动生成默认** **`location /`**，

我们手动再写反向代理`location /`，Nginx 判定重复，直接启动失败。

### 解决思路

- 不要在`proxy/root.conf`里重复写`location /`

- 要么**只保留一个根路径匹配**

- 要么清空`root.conf`，把完整配置写在主配置里

- 反向代理 + 静态网站不能同时开

### 关键结论

**同一个 server 内，永远只能有一个有效** **`location /`** **。**

---

## 三、第二个坑：502 Bad Gateway 网关错误

### 问题原因

502 只有一个核心：

**代理服务器连不上目标上游服务。**

本次真实诱因：

1. Nginx 优先走 IPv6，但服务器**IPv6 不通**

2. 目标端口 443 无法连通

3. SSL 握手失败、超时过短

4. DNS 解析异常

### 解决关键配置

```Nginx

resolver 223.5.5.5 114.114.114.114 ipv6=off;
```

一句话强制只走 IPv4，彻底解决 IPv6 不可达问题。

再配合：

- `proxy_ssl_verify off`

- 加长超时时间

- 正确设置`Host`头

502 基本都能解决。

---

## 四、第三个坑：403 Forbidden 拒绝访问

### 问题原因

能连接，但**目标服务直接拒绝**。

常见场景：

- IP 被拉黑/白名单限制

- 缺少正确请求头（被当成爬虫）

- Host 头不匹配

### 解决思路

- 检查目标服务是否开启 IP 白名单

- 代理时带上`User-Agent`、`Referer`

- `Host`必须写目标真实域名

---

## 五、一套可直接复制的稳定反向代理配置

适用于：1Panel + OpenResty 反向代理

```Nginx

server {
    listen 80;
    server_name contract.riseai.com.cn;

    resolver 223.5.5.5 114.114.114.114 ipv6=off;
    resolver_timeout 10s;

    location / {
        proxy_pass https://目标域名;
        proxy_set_header Host 目标域名;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_ssl_verify off;
        proxy_ssl_server_name on;

        proxy_connect_timeout 60s;
        proxy_read_timeout 60s;
        proxy_send_timeout 60s;
    }

    access_log /www/sites/域名/log/access.log main;
    error_log /www/sites/域名/log/error.log warn;
}
```

---

## 六、全文总结（一句话避坑）

1. **重复** **`location /`** = 1Panel 自动配置与手动配置冲突

2. **502** = 服务器连不上目标（优先查 IPv6、端口、DNS）

3. **403** = 目标拒绝你（IP 白名单、请求头、Host 问题）

4. **反向代理只需要一个** **`location /`**

5. 强制 IPv4：`resolver ... ipv6=off`

---

如果你也在 1Panel 上折腾建站、反向代理、静态网站部署，这类看似小、实则卡很久的问题特别常见。

下次遇到 502 / 403 / 配置启动失败，不用乱搜教程，按这篇思路排查，90% 的问题都能快速定位。

需要完整配置、定制适配你自己的域名，我可以直接帮你改成可复制粘贴的最终版。
> （注：文档部分内容可能由 AI 生成）