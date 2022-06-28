/* eslint-disable */
export default class CookieManager {
  constructor () {
    // Sets cookies if some have been set (e.g. when the user has visited the site before already)
    this.cookies = document.cookie
    this.cookies ? this.hasCookies = true : this.hasCookies = false
  }

  updateCookieStore () {
    // To be called when Cookies have been updated
    this.cookies = document.cookie
  }

  config (expireTimes, path, domain, secure, sameSite) {
    // configuration
    const defaultConfig = {
      expires: '1d',
      path: '; path=/',
      domain: '',
      secure: '',
      sameSite: '; SameSite=Lax'
    }
    defaultConfig.expires = expireTimes ? expireTimes : '1d'
    defaultConfig.path = path ? '; path=' + path : '; path=/'
    defaultConfig.domain = domain ? '; domain=' + domain : ''
    defaultConfig.secure = secure ? '; Secure' : ''
    defaultConfig.sameSite = sameSite ? '; SameSite=' + sameSite : '; SameSite=Lax'
  }

  setCookie (key, value, expireTimes, path, domain, secure, sameSite) {
    // sets cookie under those parameters
    const defaultConfig = {
      expires: '1d',
      path: '; path=/',
      domain: '',
      secure: '',
      sameSite: '; SameSite=Lax'
    }
    if (!key) {
      throw new Error('Cookie name is not found in the first argument.')
    } else if (/^(?:expires|max\-age|path|domain|secure|SameSite)$/i.test(key)) {
      throw new Error('Cookie name illegality. Cannot be set to ["expires","max-age","path","domain","secure","SameSite"]\t current key name: ' + key)
    }
    // support json object
    if (value && value.constructor === Object) {
      value = JSON.stringify(value)
    }
    let _expires = ''
    expireTimes = expireTimes === undefined ? defaultConfig.expires : expireTimes
    if (expireTimes && expireTimes !== 0) {
      switch (expireTimes.constructor) {
        case Number:
          if (expireTimes === Infinity || expireTimes === -1) {
            _expires = '; expires=Fri, 31 Dec 9999 23:59:59 GMT'
          } else {
            _expires = '; max-age=' + expireTimes
          }
          break
        case String:
          if (/^(?:\d+(y|m|d|h|min|s))$/i.test(expireTimes)) {
            // get capture number group
            let _expireTime = expireTimes.replace(/^(\d+)(?:y|m|d|h|min|s)$/i, '$1')
            // get capture type group , to lower case
            switch (expireTimes.replace(/^(?:\d+)(y|m|d|h|min|s)$/i, '$1').toLowerCase()) {
              // Frequency sorting
              case 'm':
                _expires = '; max-age=' + +_expireTime * 2592000
                break // 60 * 60 * 24 * 30
              case 'd':
                _expires = '; max-age=' + +_expireTime * 86400
                break // 60 * 60 * 24
              case 'h':
                _expires = '; max-age=' + +_expireTime * 3600
                break // 60 * 60
              case 'min':
                _expires = '; max-age=' + +_expireTime * 60
                break // 60
              case 's':
                _expires = '; max-age=' + _expireTime
                break
              case 'y':
                _expires = '; max-age=' + +_expireTime * 31104000
                break // 60 * 60 * 24 * 30 * 12
              default:
                Error('unknown exception of "set operation"')
            }
          } else {
            _expires = '; expires=' + expireTimes
          }
          break
        case Date:
          _expires = '; expires=' + expireTimes.toUTCString()
          break
      }
    }
    document.cookie =
      encodeURIComponent(key) + '=' + encodeURIComponent(value) +
      _expires +
      (domain ? '; domain=' + domain : defaultConfig.domain) +
      (path ? '; path=' + path : defaultConfig.path) +
      (secure === undefined ? defaultConfig.secure : secure ? '; Secure' : '') +
      (sameSite === undefined ? defaultConfig.sameSite : (sameSite ? '; SameSite=' + sameSite : ''))
    return this
  }

  getCookie (key) {
    let value = decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null
    if (value && value.substring(0, 1) === '{' && value.substring(value.length - 1, value.length) === '}') {
      try {
        value = JSON.parse(value)
      } catch (e) {
        return value
      }
      return value
    }
  }

  removeCookie (key, path, domain) {
    const defaultConfig = {
      expires: '1d',
      path: '; path=/',
      domain: '',
      secure: '',
      sameSite: '; SameSite=Lax'
    }
    // remove certain cookie
    if (!key) {
      return false
    }
    document.cookie = encodeURIComponent(key) +
      '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
      (domain ? '; domain=' + domain : defaultConfig.domain) +
      (path ? '; path=' + path : defaultConfig.path) + '; SameSite=Lax'
    return this
  }

  resolveCookie (key) {
    // checks if there is a specific cookie
    return (new RegExp('(?:^|;\\s*)' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(this.cookies)
  }

  resolveAllCookies () {
    if (!document.cookie) return [];
    const _keys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/)
    for (let _index = 0; _index < _keys.length; _index++) {
      _keys[_index] = decodeURIComponent(_keys[_index]);
    }
    return _keys
  }
}
