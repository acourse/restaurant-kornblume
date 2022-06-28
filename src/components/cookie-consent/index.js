import { createApp, ref } from 'vue'
import config from './cookies.config.json'
import CookieManager from './cookie-manager'
/* eslint-disable */
const settingsCookieKey = 'consent_settings'
const CookieConsent = () => {
    return createApp({
        setup (props, { expose }) {
            const cookieManager = new CookieManager()
            let cookiesMap = ref(null)
            const showedConsent = ref(false)
            const createCookieMap = () => {
                if(cookiesMap.value === null){
                    let map = new Map()
                    for ( const [key, value] of Object.entries(config) ) {
                        const cookieChildrenArray = value.cookies.map(childValue => {
                            return { key: childValue.key, hasConsented: false }
                        })
                        map.set(key, { hasConsented: false, cookies: cookieChildrenArray })
                    }
                    return map
                } else {
                    let map = new Map()
                    cookiesMap.value.forEach((value, key) => {
                        map.set(key, { ...value, cookies: JSON.parse(JSON.stringify(value.cookies)) })
                    })
                    return map
                }
            }

            const init = () => {
                const encodedSettingsCookie = getCookie(settingsCookieKey)

                if(encodedSettingsCookie) {
                    const decodedSettings = decodeCookie(encodedSettingsCookie)
                    cookiesMap.value = objToMap(JSON.parse(decodedSettings))
                    showedConsent.value = true
                } else {
                    cookiesMap.value = createCookieMap()
                }
            }
            init()

            const hasConsent = (key) => {
              const cookie = findCookieInMap(cookiesMap, key)
              if(!cookie) {
                throw new Error('Cookie was not found!')
              }
                return cookie.hasConsented
            }

            const setConsent = (newCookieMap) => {
                newCookieMap.forEach((value, key) => {
                    //check if the category is required
                    const isRequired = config[key].required
                    // new Array to prevent reactivity
                    let newCookieArray = []
                    newCookieArray = value.cookies.map((cookie) => {
                        return { ...cookie, hasConsented: isRequired || !!cookie.hasConsented }
                    })
                    cookiesMap.value.set(key, { ...value, cookies: newCookieArray, hasConsented: isRequired || !!value.hasConsented })
                })
                setConsentCookie()
                showedConsent.value = true
                removeWrongCookies()
            }

            const setConsentForCategory = (key, category) => {
                cookiesMap.value.set(key, category)
            }

            const setConsentCookie = () => {
                cookieManager.setCookie(settingsCookieKey, encodeCookie(JSON.stringify(mapToObj(cookiesMap.value))), '28d', '/', '', '', '')
            }

            const removeWrongCookies = () => {
                const cookieArray = cookieManager.resolveAllCookies()
                cookiesMap.value.forEach((value, key) => {
                    value.cookies.forEach(e => {
                        const cookieName = config[key].cookies.find(ce => ce.key === e.key).cookie_name
                        if(cookieArray.includes(cookieName)) {
                            const res = cookieManager.removeCookie(cookieName)
                        }
                    })
                })
            }

            expose({
                cookiesMap,
                setConsent,
                hasConsent,
                setConsentForCategory,
                cookieManager,
                config,
                showedConsent,
                createCookieMap
            })
        }
    })
}

const CookieConsentPlugin = {
    install (app) {
        const cookieConsent = CookieConsent()
        app.config.globalProperties.$consent = cookieConsent.mount('#app')
    }
}

export default CookieConsentPlugin

function findCookieInMap (cookiesMap, key) {
    if (!key.includes('.')) {
        return cookiesMap.value.get(key)
    } else {
        const keyArray = key.split('.')
        return cookiesMap.value.get(keyArray[0]).cookies.find(e => e.key === keyArray[1])
    }
}

function mapToObj(map){
    let obj = {}
    map.forEach(function(v, k){
        obj[k] = v
    })
    return obj
}

function getSettingsCookie(){

}

function encodeCookie(str) {
    return btoa(str)
}

function decodeCookie(str) {
    return atob(decodeURIComponent(str));

}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

function objToMap(obj) {
    const map = new Map()
    for (const objKey in obj) {
        map.set(objKey, obj[objKey])
    }
    return map
}

function createCopyOfCookieMap (value, key, map) {

}
