<script setup>
const props = defineProps({
  latest_block: Array,
});

const router = useRouter();
const gotoBlockPage = (blockno) => {
  viewBlock(router, blockno);
};

const gotoAddressPage = (address) => {
  viewAddress(router, address);
};
</script>
<template>
    <div>
        <div
          class="flex justify-between items-center p-4 ari-block mt-3"
        >
          <span class="font-bold"><i class="fa fa-cubes text-[#F44E6E] me-2"></i>Latest Blocks</span>
          <nuxt-link
            to="/explorer/block"
            class="text-[#F44E6E] font-medium text-sm hover:underline"
            >View More</nuxt-link
          >
        </div>
      </div>
    
      <div>
        <van-cell-group>
          <van-cell v-for="block in latest_block" :key="block.blockno" center :label="block.date" >
            <template #title>
              <div>
                <span @click="gotoBlockPage(block.blockno)" class="text-gray-400 "
                  >{{ block.blockno }}</span
                >
              </div>
            </template>
            <template #icon>
              <img
                src="https://testnetex.arichain.com/assets/img/common/icon_block.svg"
                width="20"
                class="me-3"
              />
            </template>
            <template #extra>
              <div class="text-center ms-3">
                <span class="block font-bold">BP</span>
                <span class="block text-[#F44E6E] font-bold text-xs" @click="gotoAddressPage(block.bp)"
                  >{{ block.bp }}</span
                >
                <span class="block text-gray-400 text-xs">{{ block.tr_num }} txns in block</span>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
</template>