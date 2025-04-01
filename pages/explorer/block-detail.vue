<script setup>
const route = useRoute();
const block = ref(route.query.block || "");
const details = reactive({
  block_height: "-",
  timestamp: "-",
  previous_block_hash: "-",
  block_id: "-",
  bp: "-",
  total_fee: "-",
});
const transactions = ref([]);
const total_transactions = ref(0);
const loader = ref(false);

async function fetchBlockInfo() {
    loader.value = true;
  if (!block.value) return;

  const block_info = await $fetch(`https://ari-explorer.lupa.pw/api/block/${block.value}`);
  if(block_info.overview) {
    details.block_height = block_info.overview.block_height;
    details.timestamp = block_info.overview.timestamp;
    details.previous_block_hash = shortenHash(block_info.overview.previous_block_hash);
    details.block_id = shortenHash(block_info.overview.block_id);
    details.bp = block_info.overview.bp;
    details.total_fee = block_info.overview.total_fee;
    transactions.value = block_info.transactions;
    total_transactions.value = block_info.total_transactions;
  }
  loader.value = false;
}

onMounted(() => {
    fetchBlockInfo();
});
</script>


<template>
  <div>
    <div style="padding-bottom: 50px !important">
      <CoreNavbar />
      <div>
        <div class="max-w-4xl mx-auto ari-block text-white">
          <h5 class="text-xl ari-text font-semibold mb-4 text-center pt-4">
            Block Details
          </h5>
          <p class="text-sm text-center text-gray-400">Total of <strong class="text-[#F44E6E]">{{ total_transactions }}</strong> Transactions</p>
        </div>
      </div>

      <!-- Grid Container -->
      <div class="max-w-4xl mx-auto ari-block p-4 rounded-lg">
        <div class="grid grid-cols-1 gap-4">
          <div class="flex justify-between">
            <span class="text-gray-400 text-sm">Block Height </span>
            <span class="text-sm font-semibold">{{
                details.block_height
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400 text-sm">Time stamp</span>
            <span class="text-sm font-semibold">{{
                details.timestamp
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400 text-sm">Previous Block Hash</span>
            <span class="text-[#F44E6E] text-sm font-semibold">{{
                details.previous_block_hash
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-gray-400 text-sm">Block ID</span>
            <span class="text-sm font-semibold">{{
              details.block_id
            }}</span>
          </div>
            <div class="flex justify-between">
                <span class="text-gray-400 text-sm">BP</span>
                <span class="text-sm font-semibold">{{
                details.bp
                }}</span>
            </div>
            <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Total Fee</span>
                <span class="text-sm font-semibold">{{
                details.total_fee
                }}</span>
            </div>
        </div>
      </div>
      <div class="pb-5">
        <div class="w-full mt-4">
            <table class="w-full table-fixed border ari-border rounded-lg ari-block text-white border-collapse">
              <!-- Header -->
              <thead class="ari-block">
                <tr>
                  <th class="py-3 px-4 border-b ari-border text-left text-sm md:text-base">Txn Hash / Method</th>
                  <th class="py-3 px-4 border-b ari-border text-left text-sm md:text-base">From / To</th>
                  <th class="py-3 px-4 border-b ari-border text-center text-sm md:text-base">Amount / Coin</th>
                </tr>
              </thead>
          
              <!-- Body -->
              <tbody>
                <template v-for="tx in transactions" :key="tx.txHash">
                  <tr class="hover:bg-[#29292b] transition duration-200">
                    <!-- Txn Hash / Method -->
                    <td class="py-3 px-4 border-b ari-border text-sm md:text-base">
                      <div :title="tx.txHash">
                        {{ shortenTx(tx.txHash) }}
                      </div>
                      <div class="text-gray-400 text-xs">{{ tx.method }}</div>
                    </td>
   
                    
                    <!-- From / To -->
                    <td v-if="tx.type === 'join_dapp' || tx.type === 'account_update'" class="py-3 px-4 border-b ari-border text-sm md:text-base">
                      <div>{{ shortenWalletAddress(tx.from) }}</div>
                      <div :title="tx.to || '-'" class="text-gray-400 text-xs">
                        {{ tx.from || "-" }}
                      </div>
                    </td>
                    <td v-else class="py-3 px-4 border-b ari-border text-sm md:text-base">
                      <div>{{ tx.from }}</div>
                      <div :title="tx.to" class="text-gray-400 text-xs">
                        {{ shortenWalletAddress(tx.to) }}
                      </div>
                    </td>
                    
                    <!-- Amount / Coin -->
                    <td class="py-3 px-4 border-b ari-border text-center text-sm md:text-base">
                      <div>{{ parseFloat(tx.amount) ? Math.floor(parseFloat(tx.amount)) : "-" }}</div>
                      <div class="text-gray-400 text-xs">
                        {{ tx.method.includes("transfer") ? tx.coin : "" }}
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
