<script setup>
import { Locale } from 'vant';
import enUS from 'vant/es/locale/lang/en-US';

Locale.use('en-US', enUS);

</script>

<template>
  <div>
    <NuxtLayout>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    </NuxtLayout>
  </div>
</template>
