/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "dd50e49caddae234a8e4b5b0613185cc"
  },
  {
    "url": "assets/css/0.styles.79664c9f.css",
    "revision": "27d0830be33e191a595791214fa73938"
  },
  {
    "url": "assets/img/avatar.8babcb7f.svg",
    "revision": "8babcb7fe47e21c362c59493f8abe533"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.915d9d12.js",
    "revision": "93fee006a3e0929c2d238ee7a64716fd"
  },
  {
    "url": "assets/js/10.f16850e1.js",
    "revision": "b6fa6e21f8dd3350213c15f47334bef8"
  },
  {
    "url": "assets/js/11.ed5b47af.js",
    "revision": "3ea16b37edfb033ec56d426e7460bf90"
  },
  {
    "url": "assets/js/12.370780fe.js",
    "revision": "4a49d9587d7fc370bf6f8a6b5996a9c1"
  },
  {
    "url": "assets/js/13.52c5c151.js",
    "revision": "836caf9a77e0563385a88c2479c355c0"
  },
  {
    "url": "assets/js/14.a91cbd10.js",
    "revision": "fc7b87cf41a36c72dc8d6d73f66d9a50"
  },
  {
    "url": "assets/js/15.cd126eaf.js",
    "revision": "4bf047fe54afc80aae12e884d441279e"
  },
  {
    "url": "assets/js/16.5009586c.js",
    "revision": "d33195badd2de3626eb511b949eef304"
  },
  {
    "url": "assets/js/17.73440732.js",
    "revision": "0005f5ae9853b48c3a9271998f48329a"
  },
  {
    "url": "assets/js/18.ad4ad5c9.js",
    "revision": "7d97c5c5dc0c94bf40ed777be0c8da93"
  },
  {
    "url": "assets/js/19.85234e46.js",
    "revision": "5037033fef5ceff12e6fd10186de8e1b"
  },
  {
    "url": "assets/js/2.0bf59f5e.js",
    "revision": "8639b75fd5d584259597e2a61f23f9fc"
  },
  {
    "url": "assets/js/20.97903f34.js",
    "revision": "20f86f36066250f0bb86cce1252e9df3"
  },
  {
    "url": "assets/js/21.121e0a17.js",
    "revision": "f5748109c63f7f8b5b44609251be983a"
  },
  {
    "url": "assets/js/22.40951907.js",
    "revision": "27bae0ada03ddc240bf1160635b9992c"
  },
  {
    "url": "assets/js/23.9bcfc8a4.js",
    "revision": "0bbed4c835b874dff1b4a35b6d4637ed"
  },
  {
    "url": "assets/js/24.a7f3e25a.js",
    "revision": "039d6c20f2e88dc3e30159cd18f5a14d"
  },
  {
    "url": "assets/js/25.f96eddcb.js",
    "revision": "8fdb39722d29a179b1b52474f7d58ac0"
  },
  {
    "url": "assets/js/26.0aa7d6b2.js",
    "revision": "591147de371a3bb45a4361407f7314e9"
  },
  {
    "url": "assets/js/27.f9c8a464.js",
    "revision": "38be17194b0ea6126512ffcf4b7d267e"
  },
  {
    "url": "assets/js/28.389ea01c.js",
    "revision": "8e36a6d1443e2702014f77daa61f93c6"
  },
  {
    "url": "assets/js/29.e43c1c8d.js",
    "revision": "871bde02b77f108b2baf382fcc115b94"
  },
  {
    "url": "assets/js/30.434e9562.js",
    "revision": "9619854e28404b59aed3915091a24bd3"
  },
  {
    "url": "assets/js/31.34cd8561.js",
    "revision": "5df57038f2816822e981f0b3af130c7c"
  },
  {
    "url": "assets/js/32.1d209446.js",
    "revision": "51f3786a58a57bd543563e185ebaa959"
  },
  {
    "url": "assets/js/33.f332adb4.js",
    "revision": "d94b485a6acfdfa1b2f01121cd5ee6c8"
  },
  {
    "url": "assets/js/34.1dc791f4.js",
    "revision": "de091b73e41b7634c6e8dcce96e475a0"
  },
  {
    "url": "assets/js/35.74a85d19.js",
    "revision": "6fb0db727141bab75d853032ca1636bb"
  },
  {
    "url": "assets/js/36.17cc1767.js",
    "revision": "0dcaa5d80e36e358e9cd6df43d696bfb"
  },
  {
    "url": "assets/js/37.cd833b66.js",
    "revision": "b579ca9df6d8789487e5f9bdb300c310"
  },
  {
    "url": "assets/js/38.a8e033ec.js",
    "revision": "633c91d9aeda3556396e86c511ea9d3c"
  },
  {
    "url": "assets/js/39.9831c39a.js",
    "revision": "9f36c7b4f6f954ceee548f0d3c047da4"
  },
  {
    "url": "assets/js/40.3c22d7c3.js",
    "revision": "3d716e133574f25f3cf30e8206160eaa"
  },
  {
    "url": "assets/js/41.660b93f0.js",
    "revision": "7c07b970ec6c192c6ea41857ad2b6ed3"
  },
  {
    "url": "assets/js/42.ff0129f3.js",
    "revision": "2d7fbf38b4f4aeadc14464b1b2541441"
  },
  {
    "url": "assets/js/43.05510948.js",
    "revision": "34c96423ed21709d46ef9818f85cc5e4"
  },
  {
    "url": "assets/js/44.cfca2216.js",
    "revision": "73e18e6708283b51b9551d49c6aedcb7"
  },
  {
    "url": "assets/js/45.0e9c815b.js",
    "revision": "02bcd6b817edeb0c7f8825af7a305f4b"
  },
  {
    "url": "assets/js/46.dc396b23.js",
    "revision": "7d4aa307e191e5ab5706834d0c1d10db"
  },
  {
    "url": "assets/js/47.8fbc859b.js",
    "revision": "50823c11ea17c4d932e2b12cb8512a76"
  },
  {
    "url": "assets/js/8.d93058b1.js",
    "revision": "7efd4cbc5264a343b6c7e9445dca4e71"
  },
  {
    "url": "assets/js/9.3c8853ae.js",
    "revision": "99c2b98936dd4e29281da5ecc10b2e51"
  },
  {
    "url": "assets/js/app.472e4c3f.js",
    "revision": "b6cb54d2bbc41dd55186268c1898d84f"
  },
  {
    "url": "assets/js/icon-svg.fcfb672f.js",
    "revision": "fa41d68019181a1720475fb622d57b7a"
  },
  {
    "url": "assets/js/vendors~flowchart.2c1eae5c.js",
    "revision": "8796a879aefa6958e511479df054bafb"
  },
  {
    "url": "assets/js/vendors~icon-svg.b8b67e16.js",
    "revision": "267cedeecb58f538c25f6923b00a954f"
  },
  {
    "url": "assets/js/vuejs-paginate.10aefe92.js",
    "revision": "0144c9e752f6fa4f702fe84852b7fe72"
  },
  {
    "url": "banner/designer_mindset.svg",
    "revision": "06a17862c47e475d5bfef3b10c18dd22"
  },
  {
    "url": "banner/good_team.svg",
    "revision": "67670919ded15ec263c13cf3614f4040"
  },
  {
    "url": "banner/portfolio_update.svg",
    "revision": "997c206730cf789cc242bac9e5d99afa"
  },
  {
    "url": "banner/superhero.svg",
    "revision": "23333259330f2715b63f48fb0772a795"
  },
  {
    "url": "icons/favicon.png",
    "revision": "832a679eb73da5d45aeb1a83042702af"
  },
  {
    "url": "icons/favicon.svg",
    "revision": "7104bdbe1e365657d12901702d8f4fd8"
  },
  {
    "url": "icons/favicon@0,25x.png",
    "revision": "a8a9d3ce5d03a8302ef61ad29af0a0e1"
  },
  {
    "url": "icons/favicon@0,5x.png",
    "revision": "02ea300f5ec7e89d4ade1241c49ff43c"
  },
  {
    "url": "icons/favicon@0,75x.png",
    "revision": "cf1fe52208a3e5f8a6af03eff5a67505"
  },
  {
    "url": "icons/favicon@1x.png",
    "revision": "2745d7010081620633775ceb547bd3c9"
  },
  {
    "url": "logo.png",
    "revision": "50cccd0c2aa8112e2fae9ef18fd49a32"
  },
  {
    "url": "zh/config/blog/author.html",
    "revision": "3279c53154b0b8c26a1d4d54de2330fd"
  },
  {
    "url": "zh/config/blog/blog-config.html",
    "revision": "b4cbe0888a21e059fb74edeaca79ee34"
  },
  {
    "url": "zh/config/blog/category-tag.html",
    "revision": "bca4c3dc0aa3bf919d188e5d0a07a755"
  },
  {
    "url": "zh/config/blog/comment.html",
    "revision": "e4083790b21d9d9c11b8faf5187859fa"
  },
  {
    "url": "zh/config/blog/frontmatter.html",
    "revision": "bda3191572cde13c09c924f090eb3c1f"
  },
  {
    "url": "zh/config/blog/home.html",
    "revision": "f672f2d92fb5c6aad0473e33bcd3414e"
  },
  {
    "url": "zh/config/blog/index.html",
    "revision": "e6d8ef1e7943211fba2e351f91fc563b"
  },
  {
    "url": "zh/config/blog/rss.html",
    "revision": "51b34804edc7a6e7af41496be092dd40"
  },
  {
    "url": "zh/config/copyright.html",
    "revision": "33156c9a4d8d5dfe97a0cfbd3242934d"
  },
  {
    "url": "zh/config/footer.html",
    "revision": "6df4415e3f4f774aaae690d01fcebe61"
  },
  {
    "url": "zh/config/friend-link.html",
    "revision": "b7e6268e74792a0108ddb70d96630140"
  },
  {
    "url": "zh/config/google-analytics.html",
    "revision": "5ed02f33207efbad86ec80a22c46178a"
  },
  {
    "url": "zh/config/home.html",
    "revision": "dc85d480fbec43817f6b50fd22a389a9"
  },
  {
    "url": "zh/config/index.html",
    "revision": "261c362d042c583ca11ca0d232deb63a"
  },
  {
    "url": "zh/config/redirect.html",
    "revision": "c97544e5b719b39a9edb2cbfa8959e3e"
  },
  {
    "url": "zh/config/svg-icon.html",
    "revision": "2d8d86ee891499fbe3b3ccd593729bfd"
  },
  {
    "url": "zh/guide/assets.html",
    "revision": "43d7b8993e3f68cb0531785b009c8202"
  },
  {
    "url": "zh/guide/basic-config.html",
    "revision": "54e328285cf4916d276906c9b28b806b"
  },
  {
    "url": "zh/guide/deep/frontmatter.html",
    "revision": "1056402c2206ee9a74e24acc51d51509"
  },
  {
    "url": "zh/guide/deep/global-computed.html",
    "revision": "b1a1b8e9ca37d081242df727fd6e5307"
  },
  {
    "url": "zh/guide/deep/markdown-slot.html",
    "revision": "ca755628bd993c9c9533e589c44a45b3"
  },
  {
    "url": "zh/guide/deep/permalinks.html",
    "revision": "1c4bf75c09fed67a12e4e61051a4ec69"
  },
  {
    "url": "zh/guide/deploy.html",
    "revision": "e6543f7b727290021b1fa7b96ac86e71"
  },
  {
    "url": "zh/guide/getting-started.html",
    "revision": "796ea85df630d5a278e9818b3fb2eb90"
  },
  {
    "url": "zh/guide/i18n.html",
    "revision": "f7e53c6bcfe6e440c82bde16a49ef46f"
  },
  {
    "url": "zh/guide/index.html",
    "revision": "70f710fa4e641ab948600c68b0605fe1"
  },
  {
    "url": "zh/guide/theme-config.html",
    "revision": "aceb9fa85057a3d862f1b667e6271cce"
  },
  {
    "url": "zh/index.html",
    "revision": "c9320aaaf327fd5f776f5539ad857df2"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
