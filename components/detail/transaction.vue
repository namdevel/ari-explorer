<script setup>
const props = defineProps({
    user:String
});
const router = useRouter();
const transactions = ref([]);
const currentPage = ref(1);
const totalTransactions = ref(0);
const pageSize = 5; // Show 10 items per page
const maxPageNumbers = 2; // Show up to 5 page numbers at a time

async function fetchTransactions(page) {
  if (!props.user) return; // Jika tidak ada user, hentikan request

  const start = (page - 1) * pageSize;
  const url = `https://ari-explorer.lupa.pw/api/wallet/transfer?start=${start}&limit=${pageSize}&user=${props.user}&futuretoken=24ac8c4132b4218f87d8fc1d531dfb41`;

  try {
    const response = await $fetch(url, { method: "GET" });

    transactions.value = response.transaction_list || [];
    totalTransactions.value = response.transaction_count || 0;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Fetch initial data on mount
onMounted(() => fetchTransactions(currentPage.value));

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
      <div v-if="!transactions.length">
        <van-empty image="search" description="Results not found" />
    </div>
        <div v-if="transactions.length" class="w-full">
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
                <template v-for="tx in transactions" :key="tx.trx_id">
                  <tr class="hover:bg-[#29292b] transition duration-200">
                    <!-- Txn Hash / Method -->
                    <td class="py-3 px-4 border-b ari-border text-sm md:text-base">
                      <div :title="tx.trx_id" @click="gotoTransactionPage(tx.trx_id)">
                        {{ shortTx(tx.trx_id) }}
                      </div>
                      <div class="text-gray-400 text-xs">{{ tx.type }}</div>
                    </td>
                    
                    <!-- Block / Age -->
                    <td class="py-3 px-4 border-b ari-border text-sm md:text-base">
                      <div @click="gotoBlockPage(tx.block_no)">{{ tx.block_no }}</div>
                      <div class="text-gray-400 text-xs">{{ tx.reg_date }}</div>
                    </td>
                    
                    <!-- From / To -->
                    <td v-if="tx.type === 'join_dapp' || tx.type === 'account_update'" class="py-3 px-4 border-b ari-border text-sm md:text-base">
                      <div @click="gotoAddressPage(tx.from)">{{ shortenWalletAddress(tx.from) }}</div>
                      <div :title="tx.dapp" class="text-gray-400 text-xs" @click="gotoAddressPage(tx.dapp)">
                        {{ tx.dapp }}
                      </div>
                    </td>
                    <td v-else class="py-3 px-4 border-b ari-border text-sm md:text-base">
                      <div @click="gotoAddressPage(tx.from)">{{ shortenWalletAddress(tx.from) }}</div>
                      <div :title="tx.to" class="text-gray-400 text-xs" @click="gotoAddressPage(tx.to)">
                        {{ shortenWalletAddress(tx.to) }}
                      </div>
                    </td>
                    
                    <!-- Amount / Coin -->
                    <td class="py-3 px-4 border-b ari-border text-center text-sm md:text-base">
                      <div>{{ parseFloat(tx.amount) ? Math.floor(parseFloat(tx.amount)) : "-" }}</div>
                      <div class="text-gray-400 text-xs">
                        {{ tx.type.includes("transfer") ? tx.amount.split(" ")[1] : "" }}
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <div v-if="transactions.length" class="flex justify-center items-center mt-4 space-x-1">
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
