<script setup>
const router = useRouter();
const currentSupply = ref("0");
const totalHolder = ref("0");
const totalBurned = ref("0");
const holderRank = ref([]);
const loading = ref(true);
const views = ref(10);
const holders_view = [
  { text: "View 10", value: 10 },
  { text: "View 25", value: 25 },
  { text: "View 50", value: 50 },
  { text: "View 100", value: 100 },
];
async function fetchData() {
  loading.value = true;
  const response = await $fetch(
    `https://ari-explorer.lupa.pw/api/holders?page=1&limit=${views.value}`
  );

  if (response.currentSupply) {
    currentSupply.value = response.currentSupply;
    totalHolder.value = response.totalHolder;
    totalBurned.value = response.totalBurn;
    holderRank.value = response.holders;
  }

  console.log(response);
  loading.value = false;
}

onMounted(() => {
  fetchData();
});
function shortenWalletAddress(address) {
  if (address.length < 18) return address;
  return address.slice(0, 18) + "...";
}

function extractAmountAndType(amountString) {
  const parts = amountString.split(" ");
  return {
    amount: parseInt(parts[0]),
    type: parts[1],
  };
}
watch(views, () => {
  fetchData();
});

const gotoAddressPage = (address) => {
  viewAddress(router, address);
};
</script>

<template>
  <div>
    <div style="padding-bottom: 50px !important">
      <CoreNavbar />

      <div>
        <van-grid
          :column-num="1"
          direction="horizontal"
          :gutter="10"
          class="mt-3"
        >
          <van-grid-item
            
          >
            <template #text>
              <div class="text-center ms-3">
                <span class="block font-bold text-xs">CURRENT SUPPLY</span>
                <span class="block text-[#F44E6E] text-lg font-bold">{{
                  currentSupply.split(" ")[0]
                }}</span>
                <span class="block text-gray-400 text-xs">ARI</span>
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            
          >
            <template #text>
              <div class="text-center ms-3">
                <span class="block font-bold text-xs">TOTAL HOLDER</span>
                <span class="block text-[#F44E6E] text-lg font-bold">{{
                  totalHolder
                }}</span>
                <span class="block text-gray-400 text-xs"></span>
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            
          >
            <template #text>
              <div class="text-center ms-3">
                <span class="block font-bold text-xs">TOTAL BURN</span>
                <span class="block text-[#F44E6E] text-lg font-bold">{{
                  totalBurned.split(" ")[0]
                }}</span>
                <span class="block text-gray-400 text-xs">ARI</span>
              </div>
            </template>
          </van-grid-item>
        </van-grid>
      </div>

      <div>
        <div>
          <div class="flex justify-between items-center p-4 ari-block mt-3">
            <span class="font-bold"
              ><i class="fa fa-cubes text-[#F44E6E] me-2"></i>TOP HOLDER</span
            >
            <van-dropdown-menu>
              <van-dropdown-item v-model="views" :options="holders_view" />
            </van-dropdown-menu>
          </div>
        </div>
        <div v-if="loading" style="padding-bottom: 450px !important">
          <div class="text-center pt-4">
            <van-loading type="spinner" size="24px" />
          </div>
        </div>
        <div v-else class="max-w-4xl mx-auto ari-block text-white pb-5">
          <div class="w-full">
            <table
              class="w-full table-fixed border ari-border rounded-lg ari-block text-white border-collapse"
            >
              <!-- Header -->
              <thead class="ari-block">
                <tr>
                  <th
                    class="py-3 px-4 border-b ari-border text-left text-sm md:text-base w-[60px] text-center"
                  >
                    Rank
                  </th>
                  <th
                    class="py-3 px-4 border-b ari-border text-sm md:text-base"
                  >
                    Address
                  </th>
                  <th
                    class="py-3 px-4 border-b ari-border text-center text-left text-sm md:text-base"
                  >
                    Amount
                  </th>
                </tr>
              </thead>

              <!-- Body -->
              <tbody>
                <template v-for="rank in holderRank" :key="rank.rank">
                  <tr class="hover:bg-[#29292b] transition duration-200">
                    <td
                      class="py-3 px-4 border-b ari-border text-sm md:text-base w-[60px] text-center"
                    >
                      {{ rank.rank }}
                    </td>
                    <td
                      class="py-3 px-4 border-b ari-border text-sm md:text-base" @click="gotoAddressPage(rank.address)"
                    >
                      {{ shortenWalletAddress(rank.address) }}
                    </td>
                    <td
                      class="py-3 px-4 border-b ari-border text-sm md:text-base"
                    >
                      <div class="text-center ms-3">
                        <span class="block text-xs"
                          ><strong>{{
                            extractAmountAndType(rank.amount).amount
                          }}</strong></span
                        >
                        <span class="block text-xs">{{
                          extractAmountAndType(rank.amount).type
                        }}</span>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
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
