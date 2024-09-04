// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/mdc",
    "@nuxthub/core",
    "@canopie-club/toolbox",
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
      tasks: true
    },
    // scheduledTasks: {
    //   "*/1 * * * *": "cron:test",
    // },
  },

  // nitro: {
  //   experimental: {
  //     tasks: true
  //   }
  // },
  
  hub: {
    // @ts-ignore
    database: true,
    // database: {
    //   name: "canopie-portal",
    //   id: process.env.DB_ID,
    // },
    cache: true
  },
})