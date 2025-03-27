<script setup>
const router = useRouter();
const props = defineProps({
    token_name:String,
    details:Object,
});
console.log(props.details.symbol_name);
const transactions = ref([]);
const currentPage = ref(1);
const totalTransactions = ref(0);
const pageSize = 10;
const maxPageNumbers = 2;

async function fetchTransactions(page) {
  if (!props.details.symbol_name) return;

  const start = (page - 1) * pageSize;
  const url = `https://ari-explorer.lupa.pw/api/token/${props.details.symbol_name}/transactions?start=${start}&limit=${pageSize}`;

  try {
    const response = await $fetch(url, { method: "GET" });

    if(response.transaction_count){
        transactions.value = response.transaction_list || [];
        totalTransactions.value = response.transaction_count || 0;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Fetch initial data on mount
watchEffect(() => {
  if (props.details.symbol_name && props.details.symbol_name !== "-") {
    fetchTransactions(currentPage.value);
  }
});

// Change page function
function changePage(newPage) {
  const totalPages = Math.ceil(totalTransactions.value / pageSize);
  if (newPage >= 1 && newPage <= totalPages) {
    currentPage.value = newPage;
    fetchTransactions(newPage);
  }
}

// Get paginated page numbers
const displayedPages = computed(() => {
  const totalPages = Math.ceil(totalTransactions.value / pageSize);
  const half = Math.floor(maxPageNumbers / 2);
  let startPage = Math.max(currentPage.value - half, 1);
  let endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

  if (endPage - startPage + 1 < maxPageNumbers) {
    startPage = Math.max(endPage - maxPageNumbers + 1, 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

// Utils
function shortenWalletAddress(address) {
    if (!address.includes("ARW")) {
        return address;
    }
  return address.slice(0, 6) + address.slice(-6) + "...";
}
function shortTx(tx) {
  return tx.slice(0, 4) + tx.slice(-4) + "...";
}

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
    <div>
        <div>
            <div class="max-w-4xl mx-auto ari-block text-white">
              <h5 class="text-xl ari-text font-semibold mb-4 text-center pt-4">
                Token Details
              </h5>
              <p class="text-sm text-center text-gray-400">Total of <strong class="text-[#F44E6E]">{{ totalTransactions }}</strong> Transactions</p>
            </div>
          </div>
    
          <!-- Grid Container -->
          <div class="max-w-4xl mx-auto ari-block p-4 rounded-lg">
            <div class="grid grid-cols-1 gap-4">
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">DApp Name</span>
                <span class="text-sm font-semibold">{{
                  props.details.dapp_name
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Supply</span>
                <span class="text-[#F44E6E] text-sm font-semibold">{{
                    props.details.supply
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-400 text-sm">Info</span>
                <span class="text-sm font-semibold">{{
                    props.details.info
                }}</span>
              </div>
            </div>
          </div>
    </div>
    <div>
        <div class="w-full">
            <table class="w-full table-fixed border ari-border rounded-lg ari-block text-white border-collapse">
              <!-- Header -->
              <thead class="ari-block">
                <tr>
                  <th class="py-3 px-4 border-b ari-border text-left text-sm md:text-base">Txn Hash / Method</th>
                  <th class="py-3 px-4 border-b ari-border text-left text-sm md:text-base">Block / Age</th>
                  <th class="py-3 px-4 border-b ari-border text-left text-sm md:text-base">From / To</th>
                  <th class="py-3 px-4 border-b ari-border text-center text-sm md:text-base">Amount / Coin</th>
                </tr>
              </thead>
          
              <!-- Body -->
              <tbody>
                <template v-for="tx in transactions" :key="tx.tx_id">
                  <tr class="hover:bg-[#29292b] transition duration-200">
                    <!-- Txn Hash / Method -->
                    <td class="py-3 px-4 border-b ari-border text-sm md:text-base">
                      <div :title="tx.tx_id" @click="gotoTransactionPage(tx.tx_id)">
                        {{ shortTx(tx.tx_id) }}
                      </div>
                      <div class="text-gray-400 text-xs">{{ tx.transaction.type }}</div>
                    </td>
                    
                    <!-- Block / Age -->
                    <td class="py-3 px-4 border-b ari-border text-sm md:text-base">
                      <div @click="gotoBlockPage(tx.block)">{{ tx.block }}</div>
                      <div class="text-gray-400 text-xs">{{ tx.diff_date }}</div>
                    </td>
                    
                    <!-- From / To -->
                    <td v-if="tx.transaction.type === 'join_dapp' || tx.transaction.type === 'account_update'" class="py-3 px-4 border-b ari-border text-sm md:text-base">
                      <div @click="gotoAddressPage(tx.transaction.from)" >{{ shortenWalletAddress(tx.transaction.from) }}</div>
                      <div :title="tx.transaction.dapp" class="text-gray-400 text-xs" @click="gotoAddressPage(tx.transaction.dapp)">
                        {{ tx.transaction.dapp }}
                      </div>
                    </td>
                    <td v-else class="py-3 px-4 border-b ari-border text-sm md:text-base">
                      <div @click="gotoAddressPage(tx.transaction.from)">{{ shortenWalletAddress(tx.transaction.from) }}</div>
                      <div :title="tx.transaction.to" class="text-gray-400 text-xs" @click="gotoAddressPage(tx.transaction.to)">
                        {{ shortenWalletAddress(tx.transaction.to) }}
                      </div>
                    </td>
                    
                    <!-- Amount / Coin -->
                    <td class="py-3 px-4 border-b ari-border text-center text-sm md:text-base">
                      <div>{{ parseFloat(tx.transaction.amount) ? Math.floor(parseFloat(tx.transaction.amount)) : "-" }}</div>
                      <div class="text-gray-400 text-xs">
                        {{ tx.transaction.coin }}
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <div class="flex justify-center items-center mt-4 space-x-1">
            <!-- First & Prev -->
            <button
              @click="changePage(1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 ari-block hover:bg-gray-600 disabled:ari-block  rounded"
            >
              <i class="fas fa-angle-double-left"></i> <!-- First -->
            </button>
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 ari-block  hover:bg-gray-600 disabled:ari-block  rounded"
            >
              <i class="fas fa-angle-left"></i> <!-- Prev -->
            </button>
          
            <!-- Page Numbers -->
            <button
              v-for="page in displayedPages"
              :key="page"
              @click="changePage(page)"
              :class="[ 'px-3 py-2 rounded', currentPage === page ? 'bg-red-500 text-white' : 'ari-block hover:bg-gray-600' ]"
            >
              {{ page }}
            </button>
          
            <!-- Next & Last -->
            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage >= Math.ceil(totalTransactions / pageSize)"
              class="px-3 py-2 ari-block  hover:bg-gray-600 disabled:ari-block  rounded"
            >
              <i class="fas fa-angle-right"></i> <!-- Next -->
            </button>
            <button
              @click="changePage(Math.ceil(totalTransactions / pageSize))"
              :disabled="currentPage >= Math.ceil(totalTransactions / pageSize)"
              class="px-3 py-2 ari-block  hover:bg-gray-600 disabled:ari-block  rounded"
            >
              <i class="fas fa-angle-double-right"></i> <!-- Last -->
            </button>
          </div>
    </div>
</template>
