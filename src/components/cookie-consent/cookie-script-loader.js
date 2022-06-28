 export const loadElfsight = (callback) => {
   const existingScript = document.getElementById('elfSight')
   if (!existingScript) {
     const script = document.createElement('script')
     script.src = 'https://apps.elfsight.com/p/platform.js'
     script.id = 'elfSight'
       script.setAttribute('defer', '')
     document.head.appendChild(script)
     script.onload = () => {
       if (callback) callback()
     }
   }
   if (existingScript && callback) callback()
 }

 export const loadGoogleTagManager = (callback) => {
   const existingScript = document.getElementById('googleTagManager')
   if (!existingScript) {
     const script = document.createElement('script')
     script.src = 'https://www.googletagmanager.com/gtag/js?id=AW-775720646'
     script.id = 'googleTagManager'
     document.head.appendChild(script)
     script.onload = () => {
       if (callback) callback()
     }
   }
   if (existingScript && callback) callback()
 }

 export const loadGoogleAds = (callback) => {
   const existingScript = document.getElementById('googleAds')
   if (!existingScript) {
     const script = document.createElement('script')
     script.innerHTML = "window.dataLayer = window.dataLayer || [];\n" +
       "            function gtag(){dataLayer.push(arguments);}\n" +
       "            gtag('js', new Date());\n" +
       "\n" +
       "            gtag('config', 'AW-775720646');"
     script.id = 'googleAds'
       script.setAttribute('async', '')
     document.head.appendChild(script)
     script.onload = () => {
       if (callback) callback()
     }
   }
   if (existingScript && callback) callback()
 }

 export const loadMews = (callback) => {
   const existingScript = document.getElementById('mews')
   if (!existingScript) {
     const script = document.createElement('script')
     script.innerHTML = "(function(m,e,w,s){c=m.createElement(e);c.onload=function(){\n" +
         "\n" +
         "                Mews.D.apply(null,s)};c.async=1;c.src=w;t=m.getElementsByTagName(e)[0];t.parentNode.insertBefore(c,t);})\n" +
         "\n" +
         "            (document,'script','https://app.mews.com/distributor/distributor.min.js',[['da994d9e-9945-48e2-a300-ae1300f164d6']]);"
     script.id = 'mews'
     document.head.appendChild(script)
     script.onload = () => {
       if (callback) callback()
     }
   }
   if (existingScript && callback) callback()
 }

 export const loadTheFork = (callback) => {
     const existingScript = document.getElementById('theFork')
     if (!existingScript) {
         const script = document.createElement('script')
         script.src = 'https://module.lafourchette.com/de_DE/js/horizontal/722634-53187'
         script.type = 'text/javascript'
         script.id = 'theFork'
         document.head.appendChild(script)
         script.onload = () => {
             if (callback) callback()
         }
     }
     if (existingScript && callback) callback()
 }
