<script setup>
const active = ref('home');
const router = useRouter();
const goHome = () => {
    router.push('/');
};

const notifyUser = () => {
    showToast('Search functionality is coming soon!');
};
</script>

<template>
  <div>
    <van-tabbar active-color="#f44e6e" v-model="active">
      <van-tabbar-item name="home" @click="goHome()" icon="home-o">Home</van-tabbar-item>
      <van-tabbar-item @click="notifyUser" icon="search">Search</van-tabbar-item>
      <van-tabbar-item to="/explorer/holder" icon="friends-o">Holder</van-tabbar-item>
      <van-tabbar-item to="/dapps" icon="apps-o">DApps</van-tabbar-item>
    </van-tabbar>
  </div>
</template>