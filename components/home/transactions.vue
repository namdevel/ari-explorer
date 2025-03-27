<script setup>
const props = defineProps({
  latest_transactions: Array,
});

function extractAmountAndType(amountString) {
  const parts = amountString.split(" ");
  return {
    amount: parseInt(parts[0]),
    type: parts[1],
  };
}


const router = useRouter();
const gotoPage = (address) => {
  viewAddress(router, address);
};

const gotoTransactionPage = (txid) => {
  viewTransaction(router, txid);
};
</script>
<template>
    <div>
        <div
          class="flex justify-between items-center p-4 ari-block mt-3"
        >
          <span class="font-bold"><i class="fa fa-send-back text-[#F44E6E] me-2"></i>Latest Transactions</span>
          <nuxt-link
            to="/explorer/transaction"
            class="text-[#F44E6E] font-medium text-sm hover:underline"
            >View More</nuxt-link
          >
        </div>
      </div>
      <div >
        <van-cell-group>
          <van-cell center v-for="tx in latest_transactions" :key="tx.txid" :title="tx.trx_id" >
            <template #title>
              <div>
                <span class="text-gray-400 text-xs" @click="gotoTransactionPage(tx.trx_id)"
                  >{{ tx.trx_id }}</span
                >
              </div>
            </template>
            <template #icon>
              <img
                src="https://testnetex.arichain.com/assets/img/common/icon_tx.svg"
                width="20"
                class="me-3"
              />
            </template>
            <template #label>
              <div v-if="tx.type === 'join_dapp' || tx.type === 'account_update'">
                <span class="text-[#F44E6E] font-bold text-xs" @click="gotoPage(tx.from)">{{ shortenWalletAddress(tx.from) }}</span>
                <span class="text-gray-400 text-xs"
                  ><i class="fa fa-circle-right ms-3 me-2"></i
                  >{{ tx.dapp }}</span
                >
              </div>
              <div v-else>
                <span class="text-[#F44E6E] font-bold text-xs" @click="gotoPage(tx.from)">{{ tx.from }}</span>
                <span class="text-gray-400 text-xs"
                @click="gotoPage(tx.to)"><i class="fa fa-circle-right ms-3 me-2"></i
                  >{{ shortenWalletAddress(tx.to) }}</span
                >
              </div>
            </template>
            <template #extra>
              <div class="text-center ms-3">
                <span v-if="tx.type === 'transfer' || tx.type === 'transfer_token'" class="block text-xs"><strong>{{ extractAmountAndType(tx.amount).amount }}</strong><br>{{ extractAmountAndType(tx.amount).type }}</span>
               <span v-else class="block text-xs">-</span>
                <span class="block text-gray-400 text-xs">{{ tx.reg_date }}</span>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
</template>