// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/mdc",
    "@nuxthub/core",
    "@nuxt/image",
  ],

  components: {
    global: true,
    dirs: [
      '~/components',
    ]
  },

  nitro: {
    experimental: {
      openAPI: true,
      tasks: true
    },
    scheduledTasks: {
      "*/1 * * * *": "cron:test",
    },
  },

  // nitro: {
  //   experimental: {
  //     tasks: true
  //   }
  // },
  
  hub: {
    database: true,
    cache: true
  },
})