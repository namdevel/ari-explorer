<script setup>
let intervalId = null;
const transfer_count = ref(0);
const transaction_total = ref(0);
const transaction_1h = ref(0);
const transaction_1d = ref(0);
const max_block = ref(0);
const dapp_count = ref(0);
const nft_count = ref(0);
const loading = ref(true);
const latest_block = ref([]);
const latest_transactions = ref([]);

async function fetchData() {
  const response = await $fetch(
    "https://ari-explorer.lupa.pw/proxy/main_info"
  );

  if (response.info) {
    transfer_count.value = response.info.transfer_count;
    transaction_total.value = response.info.transaction_total;
    transaction_1h.value = response.info.transaction_1h;
    transaction_1d.value = response.info.transaction_1d;
    max_block.value = response.info.max_block;
    dapp_count.value = response.info.dapp_count;
    nft_count.value = response.info.nft_count;
    latest_block.value = response.blocks;
    latest_transactions.value = response.transactions;
  }

  console.log(response.info);
  loading.value = false;
}

onMounted(() => {
  fetchData(); // Fetch data initially
  intervalId = setInterval(fetchData, 3000); // Refresh every second
});

onUnmounted(() => {
  clearInterval(intervalId); // Stop interval when component unmounts
});


</script>

<template>
  <div style="padding-bottom: 80px !important">
    <CoreNavbar />
    <HomeStats
      :transfer_count="transfer_count"
      :transaction_total="transaction_total"
      :transaction_1h="transaction_1h"
      :transaction_1d="transaction_1d"
      :max_block="max_block"
      :dapp_count="dapp_count"
      :nft_count="nft_count"
    />
    <HomeBlocks :latest_block="latest_block" />
    <HomeTransactions :latest_transactions="latest_transactions" />
    <CoreTabbar />
  </div>
</template>
