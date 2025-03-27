<script setup>
const route = useRoute();
const user = ref(route.query.user || "");
const address_data = ["TX", "TRX", "Created NFT", "Owned NFT"];
const details = reactive({
  created: "-",
  balance: "-",
  token: "-",
});

const active = ref(0);
const loader = ref(false);

async function fetchWalletInfo() {
    loader.value = true;
  if (!user.value) return;

  const wallet_info = await $fetch(`https://ari-explorer.lupa.pw/api/wallet_info/${user.value}`);
  if(wallet_info.created) {
    details.created = wallet_info.created;
    details.balance = wallet_info.balance;
    details.token = wallet_info.token;
  }
  loader.value = false;
}

onMounted(() => {
  fetchWalletInfo();
});
</script>


<template>
  <div>
    <div style="padding-bottom: 50px !important">
      <CoreNavbar />
      <div>
        <div class="max-w-4xl mx-auto ari-block text-white">
          <h5 class="text-xl ari-text font-semibold mb-4 text-center pt-4">
            Address Details
          </h5>
          <p class="text-sm text-center text-gray-400">Overview</p>
        </div>
      </div>

      <!-- Grid Container -->
      <div class="max-w-4xl mx-auto ari-block p-4 rounded-lg">
        <div class="grid grid-cols-1 gap-4">
          <div class="flex justify-between">
            <span class="text-gray-400 text-sm">Wallet</span>
            <span class="text-sm font-semibold">{{
              shortenWalletAddress(user)
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400 text-sm">Created</span>
            <span class="text-sm font-semibold">{{
              details.created
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400 text-sm">Balance</span>
            <span class="text-[#F44E6E] text-sm font-semibold">{{
              details.balance
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400 text-sm">Token</span>
            <span class="text-sm font-semibold">{{
              details.token
            }}</span>
          </div>
        </div>
      </div>
      <div class="pb-5">
        <van-tabs v-model:active="active" color="#F44E6E">
          <van-tab v-for="index in address_data" :title="index">
            <template v-if="index === 'TX'">
                <DetailTransaction :user="user" />
            </template>
            <template v-if="index === 'TRX'">
                <DetailToken :user="user" />
            </template>
            <template v-if="index === 'Created NFT'">
                <van-empty image="search" description="Results not found" />
            </template>
            <template v-if="index === 'Owned NFT'">
                <van-empty image="search" description="Results not found" />
            </template>
            <template v-else>
            </template>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <CoreTabbar />
  </div>
</template>
