<script setup>
import { StatusBar, Style } from '@capacitor/status-bar';

const isDark = useDark({
  selector: "html",
  attribute: "class",
  valueDark: "van-theme-dark dark",
  valueLight: "van-theme-light light",
});
const switchTheme = useToggle(isDark);
const icon_theme = computed(() =>
  !isDark.value ? "fa fa-lightbulb-on c-yellow" : "fa fa-moon-stars"
);
watch(isDark, (newValue) => {
  if (newValue) {
    StatusBar.setStyle({ style: Style.Light });
    StatusBar.setBackgroundColor({ color: "#1c1c1e" });
  } else {
    StatusBar.setStyle({ style: Style.Dark });
    StatusBar.setBackgroundColor({ color: "#f44e6e" });
  }
});
</script>
<template>
    <div>
        <van-sticky>
        <van-nav-bar title="Title" left-text="Back" left-arrow>
          <template #right>
            <i :class="icon_theme" @click="switchTheme()" />
          </template>
          <template #title>
            <h4>ARICHAIN <span style="color: #f44e6e">Explorer</span></h4>
          </template>
          <template #left>
            <img
              src="https://testnetex.arichain.com/assets/img/favicon.ico"
              alt="logo"
              width="20"
            />
          </template>
        </van-nav-bar>
      </van-sticky>
      </div>
</template>