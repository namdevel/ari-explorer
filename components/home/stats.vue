<script setup>
const props = defineProps({
  transfer_count: Number,
  transaction_total: Number,
  transaction_1h: Number,
  max_block: Number,
  dapp_count: Number,
  nft_count: Number,
});


</script>
<template>
    <div>
        <van-grid :column-num="2" direction="horizontal" :gutter="10" class="mt-3">
          <van-grid-item
            icon="https://testnetex.arichain.com/assets/img/main/icon_tps.svg"
          >
            <template #text>
              <div class="text-center ms-3">
                <span class="block font-bold text-xs">TPS</span>
                <span class="block text-[#F44E6E] text-lg font-bold">{{ props.transaction_1h }}</span>
                <span class="block text-gray-400 text-xs">Tx/hour</span>
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            icon="https://testnetex.arichain.com/assets/img/main/icon_total.svg"
          >
            <template #text>
              <div class="text-center ms-3">
                <span class="block font-bold text-xs">Total Transfer</span>
                <span class="block text-[#F44E6E] text-lg font-bold">{{ props.transfer_count }}</span>
                <span class="block text-gray-400 text-xs">Total</span>
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            icon="https://testnetex.arichain.com/assets/img/main/icon_nft.svg"
          >
            <template #text>
              <div class="text-center ms-3">
                <span class="block font-bold text-xs">Total NFTs</span>
                <span class="block text-[#F44E6E] text-lg font-bold">{{ props.nft_count }}</span>
                <span class="block text-gray-400 text-xs">Total</span>
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            icon="https://testnetex.arichain.com/assets/img/main/icon_latest.svg"
          >
            <template #text>
              <div class="text-center ms-3">
                <span class="block font-bold text-xs">Latest Block</span>
                <span class="block text-[#F44E6E] text-lg font-bold">{{ props.max_block }}</span>
                <span class="block text-gray-400 text-xs">Just before</span>
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            icon="https://testnetex.arichain.com/assets/img/main/icon_transac.svg"
          >
            <template #text>
              <div class="text-center ms-3">
                <span class="block font-bold text-xs">Transactions</span>
                <span class="block text-[#F44E6E] text-lg font-bold"
                  >{{ transaction_total }}</span
                >
                <span class="block text-gray-400 text-xs">Total</span>
              </div>
            </template>
          </van-grid-item>
          <van-grid-item
            icon="https://testnetex.arichain.com/assets/img/main/icon_dapp.svg"
          >
            <template #text>
              <div class="text-center ms-3">
                <span class="block font-bold text-xs">Total Token</span>
                <span class="block text-[#F44E6E] text-lg font-bold">{{ props.dapp_count }}</span>
                <span class="block text-gray-400 text-xs">Total</span>
              </div>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
</template>