<script setup>
const route = useRoute();
const router = useRouter();
const txhash = ref(route.query.txhash || "");
const details = reactive({
  transaction_hash: "-",
  block: "-",
  timestamp: "-",
});
const transactions = ref([]);
const total_transactions = ref(0);
const loader = ref(false);

async function fetchTransactionInfo() {
  loader.value = true;
  if (!txhash.value) return;

  const block_info = await $fetch(
    `https://ari-explorer.lupa.pw/api/transaction/${txhash.value}`
  );
  if (block_info.overview) {
    details.transaction_hash = shortenTx(block_info.overview.transaction_hash);
    details.block = block_info.overview.block;
    details.timestamp = block_info.overview.timestamp;
    transactions.value = block_info.transactions;
    total_transactions.value = block_info.transactions.length;
  }
  loader.value = false;
}

onMounted(() => {
  fetchTransactionInfo();
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
        <div class="max-w-4xl mx-auto ari-block text-white">
          <h5 class="text-xl ari-text font-semibold mb-4 text-center pt-4">
            Transaction Details
          </h5>
          <p class="text-sm text-center text-gray-400">
            Total of
            <strong class="text-[#F44E6E]">{{ total_transactions }}</strong>
            Transactions
          </p>
        </div>
      </div>

      <!-- Grid Container -->
      <div class="max-w-4xl mx-auto ari-block p-4 rounded-lg">
        <div class="grid grid-cols-1 gap-4">
          <div class="flex justify-between">
            <span class="text-gray-400 text-sm">Transaction Hash </span>
            <span class="text-sm font-semibold">{{
              details.transaction_hash
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400 text-sm">Block</span>
            <span class="text-sm font-semibold">{{ details.block }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400 text-sm">Time stamp</span>
            <span class="text-sm font-semibold">{{ details.timestamp }}</span>
          </div>
        </div>
      </div>
      <div class="pb-5">
        <div class="w-full mt-4">
          <table
            class="w-full table-fixed border ari-border rounded-lg ari-block text-white border-collapse"
          >
            <!-- Header -->
            <thead class="ari-block">
              <tr>
                <th
                  class="py-3 px-4 border-b ari-border text-left text-sm md:text-base"
                >
                  Memo / Method
                </th>
                <th
                  class="py-3 px-4 border-b ari-border text-left text-sm md:text-base"
                >
                  From / To
                </th>
                <th
                  class="py-3 px-4 border-b ari-border text-center text-sm md:text-base"
                >
                  Amount / Coin
                </th>
              </tr>
            </thead>

            <!-- Body -->
            <tbody>
              <template v-for="tx in transactions" :key="tx.txHash">
                <tr class="hover:bg-[#29292b] transition duration-200">
                  <!-- Txn Hash / Method -->
                  <td
                    class="py-3 px-4 border-b ari-border text-sm md:text-base"
                  >
                    <div :title="tx.memo">
                      {{ tx.memo }}
                    </div>
                    <div class="text-gray-400 text-xs">{{ tx.method }}</div>
                  </td>

                  <!-- From / To -->
                  <td
                    v-if="
                      tx.method === 'join_dapp' || tx.method === 'account_create'
                    "
                    class="py-3 px-4 border-b ari-border text-sm md:text-base"
                  >
                    
                    <div :title="tx.creator || '-'" class="text-gray-400 text-xs" @click="gotoAddressPage(tx.creator)">
                      {{ tx.creator || "-" }}
                    </div>
                    <div  @click="gotoAddressPage(tx.new_account_name)">{{ shortenWalletAddress(tx.new_account_name) }}</div>
                  </td>
                  <td
                    v-else
                    class="py-3 px-4 border-b ari-border text-sm md:text-base"
                  >
                    <div @click="gotoAddressPage(tx.from)">{{ tx.from }}</div>
                    <div :title="tx.to" class="text-gray-400 text-xs" @click="gotoAddressPage(tx.to)">
                      {{ shortenWalletAddress(tx.to) }}
                    </div>
                  </td>

                  <!-- Amount / Coin -->
                  <td
                    class="py-3 px-4 border-b ari-border text-center text-sm md:text-base"
                  >
                    <div>
                      {{
                        parseFloat(tx.amount)
                          ? Math.floor(parseFloat(tx.amount))
                          : "-"
                      }}
                    </div>
                    <div class="text-gray-400 text-xs">
                      {{
                        tx.method.includes("transfer")
                          ? tx.amount.split(" ")[1]
                          : ""
                      }}
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <CoreTabbar />
  </div>
</template>
