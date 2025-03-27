<script setup>
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "//site-assets.fontawesome.com/releases/v6.2.0/css/all.css",
    },
  ],
});
</script>
<template>
  <div>
    <main class="content shadow-inset">
      <slot />
    </main>
  </div>
</template>
<style>
.content {
  background-color: #f7f8fa;
  width: 100%;
  max-width: 480px;
  height: 100%;
  margin: 0 auto;
}

.van-theme-light body {
  background-color: #969799;
}
.van-theme-dark body {
  background-color: #1c1c1e;
}

.van-theme-light html {
  background-color: #969799 !important;
}
.van-theme-dark html {
  background-color: #1c1c1e !important;
}
.van-theme-light .ari-block {
  color: #323233 !important;
  background-color: #fff !important;
}
.van-theme-dark .ari-block {
  color: #f5f5f5 !important;
  background-color: #1c1c1e !important;
}
.van-theme-dark .content {
  color: #f5f5f5;
  background-color: #1c1c1e;
}
.van-theme-light .ari-text {
  color: #323233 !important;
}
.van-theme-dark .ari-text {
  color: #f5f5f5 !important;
}
.van-theme-light .ari-border {
  border-color: #eee !important;
}
.van-theme-dark .ari-border {
  border-color: #29292b !important;
}
</style>
