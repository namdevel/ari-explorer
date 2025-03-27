<script setup>
const views_nft = ref(10);
const nft_data = ref([]); // Pastikan array ini kosong secara default
const loading_nft = ref(false);

const holders_view = [
  { text: "View 10", value: 10 },
  { text: "View 25", value: 25 },
  { text: "View 50", value: 50 },
  { text: "View 100", value: 100 },
];

function shortenWalletAddress(address) {
  if (!address) return "";
  return address.slice(0, 8) + "..." + address.slice(-8);
}
</script>

<template>
  <div>
    <div>
      <div class="flex justify-between items-center p-4 ari-block">
        <span class="font-bold">
          <i class="fa fa-cubes text-[#F44E6E] me-2"></i> Issued NFTs
        </span>
        <van-dropdown-menu>
          <van-dropdown-item v-model="views_nft" :options="holders_view" />
        </van-dropdown-menu>
      </div>
    </div>

    <div v-if="loading_nft" style="padding-bottom: 50px !important">
      <div class="text-center pt-4">
        <van-loading type="spinner" size="24px" />
      </div>
    </div>

    <div v-else class="max-w-4xl mx-auto ari-block text-white pb-5">
      <div class="w-full">
        <table class="w-full table-fixed border ari-border rounded-lg ari-block text-white border-collapse">
          <!-- Header -->
          <thead v-if="nft_data.length > 0" class="ari-block">
            <tr>
              <th class="py-3 px-4 border-b ari-border text-left text-sm md:text-base">Name / Owner</th>
              <th class="py-3 px-4 border-b ari-border text-center text-sm md:text-base">State</th>
              <th class="py-3 px-4 border-b ari-border text-sm md:text-base">Public Key</th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody v-if="nft_data.length > 0">
            <tr v-for="nft in nft_data" :key="nft.dapp_name" class="hover:bg-[#29292b] transition duration-200">
              <td class="py-3 px-4 border-b ari-border text-sm md:text-base">
                <div class="flex items-center space-x-3">
                  <!-- Gambar -->
                  <img
                    :src="'https://testnetex.arichain.com/' + (nft.info?.image || 'assets/img/default-nft.png')"
                    width="30"
                    height="30"
                    class="flex-shrink-0 rounded"
                    alt="NFT Image"
                  />

                  <!-- Nama dan Owner -->
                  <div>
                    <div>{{ nft.dapp_name }}</div>
                    <div class="text-gray-400 text-xs">{{ nft.owner }}</div>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4 border-b ari-border text-center text-sm md:text-base">
                {{ nft.dapp_state }}
              </td>
              <td class="py-3 px-4 border-b ari-border text-sm md:text-base">
                {{ shortenWalletAddress(nft.dapp_key) }}
              </td>
            </tr>
          </tbody>

          <!-- Tampilkan pesan jika tidak ada data -->
          <tbody v-else>
            <tr>
              <td colspan="3" class="text-center py-4 text-gray-400">Results not found</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
