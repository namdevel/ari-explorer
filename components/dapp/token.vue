<script setup>
const router = useRouter();
const props = defineProps({
    views_token: Number,
    token_data: Array,
    loading_token: Boolean,
});

const holders_view = [
  { text: "View 10", value: 10 },
  { text: "View 25", value: 25 },
  { text: "View 50", value: 50 },
  { text: "View 100", value: 100 },
];

function shortenWalletAddress(address) {
  if (address.length < 10) return address;
  return address.slice(0, 10) + "...";
}

function extractAmountAndType(amountString) {
  const parts = amountString.split(" ");
  return {
    amount: parseInt(parts[0]),
    type: parts[1],
  };
}

const gotoTokenPage = (token) => {
  viewToken(router, token);
};

const gotoDappPage = (dapp) => {
  viewDapp(router, dapp);
};
</script>
<template>
    <div>
        <div>
          <div class="flex justify-between items-center p-4 ari-block">
            <span class="font-bold"
              ><i class="fa fa-cubes text-[#F44E6E] me-2"></i>Token List</span
            >
            <van-dropdown-menu>
              <van-dropdown-item v-model="props.views_token" :options="holders_view" />
            </van-dropdown-menu>
          </div>
        </div>
        <div v-if="props.loading_token" style="padding-bottom: 50px !important">
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
                    class="py-3 px-4 border-b ari-border text-left text-sm md:text-base"
                  >
                    Token / Name
                  </th>
                  <th
                    class="py-3 px-4 border-b ari-border text-center text-left text-sm md:text-base"
                  >
                    SUPPLY
                  </th>
                  <th
                    class="py-3 px-4 border-b ari-border w-[60px] text-left text-sm md:text-base"
                  >
                    INFO
                  </th>
                </tr>
              </thead>

              <!-- Body -->
              <tbody>
                <template v-for="token in props.token_data" :key="token.dapp_name">
                  <tr class="hover:bg-[#29292b] transition duration-200">
                    <td class="py-3 px-4 border-b ari-border text-sm md:text-base">
                      <div class="flex items-center space-x-3">
                        <!-- Gambar -->
                        <img
                          :src="'https://testnetex.arichain.com/' + token.info.image"
                          width="20"
                          class="flex-shrink-0"
                        />
                    
                        <!-- Nama dan Owner -->
                        <div>
                          <div @click="gotoTokenPage(token.token_name)">{{ token.token_name }}</div>
                          <div @click="gotoDappPage(token.dapp_name)" class="text-gray-400 text-xs">{{ token.dapp_name }}</div>
                        </div>
                      </div>
                    </td>
                    <td
                      class="py-3 px-4 border-b ari-border  text-center text-sm md:text-base"
                    >
                    <div>
                        <div>{{ extractAmountAndType(token.current_supply).amount }}</div>
                        <div class="text-gray-400 text-xs">{{ extractAmountAndType(token.current_supply).type }}</div>
                      </div>
                    </td>
                    <td
                      class="py-3 px-4 border-b ari-border text-sm text-center w-[60px] md:text-base"
                    >
                      {{ token.info.contents }}
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
</template>