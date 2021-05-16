export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  // env: {
  //   baseUrl: process.env.BASE_URL,
  // },
  ssr: false,
  head: {
    title: 'Litosite',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Nunito|Nunito+Sans:300,500,600,700,900|Rubik:300,500,700',
      },
    ],
  },

  // auth: {
  //   cookie: false,
  //   redirect: {
  //     login: '/signin',
  //     callback: '/',
  //     home: '/',
  //   },
  //   rewriteRedirects: false,
  //   resetOnError: true,
  // },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#e3bb1b', height: '5px' },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],
  // router: {
  //   middleware: ['auth'],
  // },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/bootstrap-icons',
    { src: '~/plugins/vue-sweet-alert', ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    'nuxt-leaflet',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@nuxtjs/auth',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseUrl: 'http://ec2-54-235-59-243.compute-1.amazonaws.com',
  },

  auth: {
    cookie: false,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'rest-auth/login/',
            method: 'post',
            propertyName: 'key',
          },
          user: {
            url: 'rest-auth/user/',
            method: 'get',
            propertyName: false,
          },
          logout: { url: 'rest-auth/logout/', method: 'post' },
        },
        tokenType: 'Token',
        tokenName: 'Authorization',
      },
      redirect: {
        login: '/',
        home: '/',
      },
    },
  },

  // router: {
  //   middleware: ['auth'],
  // },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
      name: 'Litosite',
      short_name: 'Litosite',
      description: 'LitoSite adalah sebuah portal informasi litologi',
      display: 'standalone',
      background_color: '#e3bb1b',
      theme_color: '#e3bb1b',
      // icons: [
      //   {
      //     src: 'icon.png',
      //     sizes: '512x512',
      //     type: 'image/png',
      //   },
      // ],
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [
        '@babel/plugin-proposal-optional-chaining',
        '@babel/plugin-proposal-nullish-coalescing-operator',
      ],
    },
  },
}
