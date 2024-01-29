// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'RROCOCO',
      htmlAttrs: {
        lang: 'ru',
      },
      link: [
        {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
      ],
      meta: [
        { property: 'og:title', content: 'RROCOCO' },
        { property: 'og:description', content: 'АВТОРСКАЯ УПАКОВКА РУЧНОЙ РАБОТЫ' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: '' },
        { property: 'og:locale', content: 'ru' },
        { property: 'og:image', content: '' },
      ]
    }
  },
  modules: [
    '@vueuse/nuxt', 
    '@pinia/nuxt',
    '@element-plus/nuxt'
  ],
  components: {
    global: true,
    dirs: ['~/components']
  },
})
