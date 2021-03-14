import { VuexPersistence } from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'litosite-vuex',
      storage: window.localStorage,
    }).plugin(store)
  })
}
