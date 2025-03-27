<script setup>
const router = useRouter();
const blocks = ref([]);
const currentPage = ref(1);
const totalBlocks = ref(0);
const pageSize = 10; // Show 10 items per page
const maxPageNumbers = 2; // Show up to 5 page numbers at a time

async function fetchBlocks(page) {
  const start = (page - 1) * pageSize;
  const payload = new URLSearchParams({ start, limit: pageSize, futuretoken: 'c7ce5f8b64857785f1e35af02d468d35' });

  try {
    const response = await $fetch("https://ari-explorer.lupa.pw/proxy/block_range", {
      method: "POST",
      body: payload,
    });

    blocks.value = response.blocks || [];
    totalBlocks.value = response.header_block_number || 0;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Fetch initial data on mount
onMounted(() => fetchBlocks(currentPage.value));

// Change page function
function changePage(newPage) {
  const totalPages = Math.ceil(totalBlocks.value / pageSize);
  if (newPage >= 1 && newPage <= totalPages) {
    currentPage.value = newPage;
    fetchBlocks(newPage);
  }
}

// Get paginated page numbers
const displayedPages = computed(() => {
  const totalPages = Math.ceil(totalBlocks.value / pageSize);
  const half = Math.floor(maxPageNumbers / 2);
  let startPage = Math.max(currentPage.value - half, 1);
  let endPage = Math.min(startPage + maxPageNumbers - 1, totalPages);

  if (endPage - startPage + 1 < maxPageNumbers) {
    startPage = Math.max(endPage - maxPageNumbers + 1, 1);
  }

  return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});

const gotoBlockPage = (blockno) => {
  viewBlock(router, blockno);
};

const gotoAddressPage = (address) => {
  viewAddress(router, address);
};
</script>

<template>
  <div style="padding-bottom: 50px !important">
    <CoreNavbar />
    <div>
      <div class="max-w-4xl mx-auto ari-block text-white pb-5">
        <h5 class="text-xl ari-text font-semibold mb-4 text-center pt-4">Blocks</h5>
        <p class="text-sm text-center text-gray-400 mb-4">Total of <strong class="text-[#F44E6E]">{{ totalBlocks }}</strong> Blocks</p>
        <div class="w-full mt-4">
          <table class="w-full table-fixed border ari-border rounded-lg ari-block text-white border-collapse">
            <!-- Header -->
            <thead class="ari-block">
              <tr>
                <th class="py-3 px-4 border-b ari-border text-left text-sm md:text-base">#</th>
                <th class="py-3 px-4 border-b ari-border text-left text-sm md:text-base">TX</th>
                <th class="py-3 px-4 border-b ari-border text-left text-sm md:text-base">BP</th>
                <th class="py-3 px-4 border-b ari-border text-center text-sm md:text-base">Fee</th>
                <th class="py-3 px-4 border-b ari-border text-center text-sm md:text-base">Date</th>
              </tr>
            </thead>
        
            <!-- Body -->
            <tbody>
              <template v-for="block in blocks" :key="block.blockno">
                <tr v-if="block.blockno !== 0" class="hover:bg-[#29292b] transition duration-200">
                  <td class="py-3 px-4 border-b ari-border text-sm md:text-base"><span @click="gotoBlockPage(block.blockno)">{{ block.blockno }}</span></td>
                  <td class="py-3 px-4 border-b ari-border text-sm md:text-base">{{ block.tr_num }}</td>
                  <td class="py-3 px-4 border-b ari-border text-sm md:text-base"><span @click="gotoAddressPage(block.bp)">{{ block.bp }}</span></td>
                  <!-- Wrap hanya di Fee -->
                  <td class="py-3 px-4 border-b ari-border text-center text-sm md:text-base break-words whitespace-normal">
                    {{ block.fee }}
                  </td>
                  <!-- Wrap hanya di Date -->
                  <td class="py-3 px-4 border-b ari-border text-center text-sm md:text-base break-words whitespace-normal">
                    {{ block.date }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        
        

        <!-- Pagination -->
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
            :class="[
              'px-3 py-2 rounded',
              currentPage === page ? 'bg-red-500 text-white' : 'ari-block  hover:bg-gray-600'
            ]"
          >
            {{ page }}
          </button>
        
          <!-- Next & Last -->
          <button
            @click="changePage(currentPage + 1)"
            :disabled="currentPage >= Math.ceil(totalBlocks / pageSize)"
            class="px-3 py-2 ari-block  hover:bg-gray-600 disabled:ari-block  rounded"
          >
            <i class="fas fa-angle-right"></i> <!-- Next -->
          </button>
          <button
            @click="changePage(Math.ceil(totalBlocks / pageSize))"
            :disabled="currentPage >= Math.ceil(totalBlocks / pageSize)"
            class="px-3 py-2 ari-block  hover:bg-gray-600 disabled:ari-block  rounded"
          >
            <i class="fas fa-angle-double-right"></i> <!-- Last -->
          </button>
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