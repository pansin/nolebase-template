---
layout: home
sidebar: false

title: PansiNote
titleTemplate: 志诚AI笔记

hero:
  name: PansiNote
  text: 正在跳转到笔记主页...
  tagline: 志诚AI笔记 - 记录回忆，知识和畅想的地方
  image:
    src: /logo.svg
    alt: PansiNote
  actions:
    - theme: brand
      text: 进入笔记
      link: /笔记/
    - theme: alt
      text: GitHub 上浏览
      link: https://github.com/nolebase/nolebase

features:
  - title: 自动跳转
    details: 页面将在 3 秒后自动跳转到笔记主页，或点击上方按钮立即进入。
    icon: 🚀
---

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // 3秒后自动跳转到笔记页面
  setTimeout(() => {
    window.location.href = '/笔记/'
  }, 3000)
})
</script>

<style>
.hero-text {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.5; }
  100% { opacity: 1; }
}
</style>