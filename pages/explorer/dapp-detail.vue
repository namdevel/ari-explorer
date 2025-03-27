<script setup>
const route = useRoute();
const router = useRouter();
const dapp = ref(route.query.dapp || "");
const details = reactive({
  token: "-",
  supply: "-",
  info: "-",
});

const loader = ref(false);

async function fetchWalletInfo() {
  loader.value = true;
  if (!dapp.value) return;

  const dapp_info = await $fetch(
    `https://ari-explorer.lupa.pw/api/dapp_info/${dapp.value}`
  );
  if (dapp_info.overview.token) {
    details.token = dapp_info.overview.token;
    details.supply = dapp_info.overview.supply;
    details.info = dapp_info.overview.info;
  }
  loader.value = false;
}

onMounted(() => {
  fetchWalletInfo();
});
const gotoBlockPage = (blockno) => {
  viewBlock(router, blockno);
};

const gotoAddressPage = (address) => {
  viewAddress(router, address);
};

const gotoTransactionPage = (tx) => {
  viewTransaction(router, tx);
};

</script>

<template>
  <div style="padding-bottom: 50px !important">
    <CoreNavbar />
    
    <DetailDapptrx :dapp_name="dapp" :details="details" />
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
