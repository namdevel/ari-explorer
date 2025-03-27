<script setup>
const route = useRoute();
const token = ref(route.query.token || "");
const details = reactive({
  dapp_name: "-",
  symbol_name: "-",
  supply: "-",
  info: "-",
});

const loader = ref(false);

async function fetchWalletInfo() {
  loader.value = true;
  if (!token.value) return;

  const token_info = await $fetch(
    `https://ari-explorer.lupa.pw/api/token_info/${token.value}`
  );
  if (token_info.overview.dapp_name) {
    details.dapp_name = token_info.overview.dapp_name;
    details.supply = token_info.overview.initial_supply;
    details.info = token_info.overview.info;
    details.symbol_name = token_info.overview.symbol_name;

  }
  loader.value = false;
}

onMounted(() => {
  fetchWalletInfo();
});


</script>

<template>
  <div style="padding-bottom: 50px !important">
    <CoreNavbar />
    
    <DetailTokenDetail :token_name="token" :details="details" />
    <CoreTabbar />
  </div>
</template>

<style scoped>
.van-theme-light .ari-border {
  border-color: #eee !important;
}
.van-theme-dark .ari-border {
  border-color: #29292b !important;
}
</style>
