// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  ssr: false,
  modules:[
    '@vueuse/nuxt',
    '@vant/nuxt',
    'nuxt-swiper',
    '@nuxtjs/tailwindcss'
  ]
})