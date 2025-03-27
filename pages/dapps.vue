<script setup>
const dapp_count = ref(0);
const token_count = ref(0);
const dapp_data = ref([]);
const token_data = ref([]);
const loading_dapp = ref(true);
const loading_token = ref(true);
const views_dapp = ref(10);
const views_token = ref(10);

async function fetchData() {
  loading_dapp.value = true;
  const response = await $fetch(
    `https://ari-explorer.lupa.pw/api/dapp?page=1&limit=${views_dapp.value}`
  );

  if (response.dapp_count) {
    dapp_count.value = response.dapp_count;
    dapp_data.value = response.data;
  }

  console.log(response);
  loading_dapp.value = false;
}

async function fetchDataToken() {
  loading_token.value = true;
  const response = await $fetch(
    `https://ari-explorer.lupa.pw/api/token?page=1&limit=${views_token.value}`
  );

  if (response.token_count) {
    token_count.value = response.dapp_count;
    token_data.value = response.data;
  }

  console.log(response);
  loading_token.value = false;
}

onMounted(() => {
  fetchData();
  fetchDataToken();
});

watch(views_dapp, () => {
  fetchData();
});

watch(views_token, () => {
  fetchDataToken();
});
</script>

<template>
  <div>
    <div style="padding-bottom: 50px !important">
      <CoreNavbar />
      <div class="max-w-4xl mx-auto ari-block text-white pb-5">
      <div>
        <h5 class="text-xl ari-text font-semibold mb-4 text-center pt-4">
          DApps
        </h5>
        
        <p class="text-sm text-center text-gray-400 mb-4">
          Total of
          <strong class="text-[#F44E6E]">{{ dapp_count }}</strong> DApps
        </p>
        <div class="text-center">
          <van-button to="/dapp/transaction" color="#F44E6E" plain>View DApp Transactions</van-button>
        </div>
      </div>

      <DappList
        :dapp_data="dapp_data"
        :views_dapp="views_dapp"
        :loading_dapp="loading_dapp"
      />
      <DappToken
        :token_data="token_data"
        :views_token="views_token"
        :loading_token="loading_token"
      />
      <DappNft />
    </div>
  </div>
    <CoreTabbar />
  </div>
</template>
