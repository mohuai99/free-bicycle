import Vue from 'vue'
import VueI18n from 'vue-i18n'
import EN from './en'
import CN from './cn'

Vue.use(VueI18n)
Vue.use(function(Vue, opts) {
    if (opts === void 0) {
        opts = {}
    }

    Vue.prototype.$wsq_i18n = function(key) {
        let exists = this.$te(key)
        return exists ? this.$t(key) : key.substr(key.lastIndexOf('.') + 1)
    }
})

var locales = {
        en: EN,
        cn: CN
    },
    href = window.location.href,
    lang = href && href.split('?').length > 0 && href.split('?')[1];

Vue.config.lang = lang || 'cn'
Object.keys(locales).forEach(function(lang) {
    Vue.locale(lang, locales[lang])
})
