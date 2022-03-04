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
    "revision": "864de6b7842bfb17c8d96462ade9a7be"
  },
  {
    "url": "assets/css/0.styles.54910ce6.css",
    "revision": "4487b989d5930f9a887133cbe553de5b"
  },
  {
    "url": "assets/img/2021-10-26-21-54-27.97fd595d.png",
    "revision": "97fd595d38e5f130483001623dd4738f"
  },
  {
    "url": "assets/img/2021-11-01-14-23-07.0856c5f2.png",
    "revision": "0856c5f28d3a711c11c0384fa8ca283e"
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
    "url": "assets/js/1.5a9c6188.js",
    "revision": "87f5e628d952eadc17e1ef3e53339f06"
  },
  {
    "url": "assets/js/10.deb9fa22.js",
    "revision": "8ef2f83a9d9ae9672445467510025983"
  },
  {
    "url": "assets/js/11.d96c8f38.js",
    "revision": "7e05f0e963b7028a24b24347e2276337"
  },
  {
    "url": "assets/js/12.27ab1329.js",
    "revision": "c080545f846eae6f012320f0e908c736"
  },
  {
    "url": "assets/js/13.14cdc134.js",
    "revision": "60fc4c8acb18c2a29e238e0cf71cc2cf"
  },
  {
    "url": "assets/js/14.6717cc37.js",
    "revision": "458cdecf5534f64c39bc344abaf888ef"
  },
  {
    "url": "assets/js/15.8646eb84.js",
    "revision": "a2d31de6a28fdacabd972cac95f4cf8f"
  },
  {
    "url": "assets/js/16.a797fe64.js",
    "revision": "c8cde9d76c52fc362c005a662cf23207"
  },
  {
    "url": "assets/js/17.c8476345.js",
    "revision": "6f6e0d6762fbff7781de08f2bdcba744"
  },
  {
    "url": "assets/js/18.367c3bdc.js",
    "revision": "e5fe20926922ddcacc2b5d158a03b84c"
  },
  {
    "url": "assets/js/19.28be726c.js",
    "revision": "1f24f3a8901410bed699bf4c6de76127"
  },
  {
    "url": "assets/js/2.2e366187.js",
    "revision": "868e89ddd185a9fd58c07c27d8f2847b"
  },
  {
    "url": "assets/js/20.d48972ec.js",
    "revision": "c991cd3d79189b2fe7fd8b84adb8e374"
  },
  {
    "url": "assets/js/21.00ce8d11.js",
    "revision": "7819e8118ff97653d2317b7d60a96315"
  },
  {
    "url": "assets/js/22.4f2ec7c2.js",
    "revision": "5e662d2a7dd1d0846d30f2545a027957"
  },
  {
    "url": "assets/js/23.5ce2b7bf.js",
    "revision": "40c4c3c854add1cb8e44f5568a7babe3"
  },
  {
    "url": "assets/js/24.00a9fdea.js",
    "revision": "94b970345393384559ba2eafaf7689bc"
  },
  {
    "url": "assets/js/25.5d4f9188.js",
    "revision": "9e60869ac31134e192f00581100a350b"
  },
  {
    "url": "assets/js/26.f22fe074.js",
    "revision": "a7e567f1c7526919b69fe8ac1c27dd90"
  },
  {
    "url": "assets/js/27.545e3716.js",
    "revision": "47394165a306c3365d54368b7c3d38fd"
  },
  {
    "url": "assets/js/28.2d08f1c9.js",
    "revision": "d41919c424e62e546b272d5cbf2c0dc3"
  },
  {
    "url": "assets/js/29.6b4ca0d8.js",
    "revision": "f4d40c959b680beca7b7c7a5e193962c"
  },
  {
    "url": "assets/js/30.495aaa45.js",
    "revision": "942881ef78cc7d24b2525f4bbd4a7736"
  },
  {
    "url": "assets/js/31.1b2a5470.js",
    "revision": "03e5b5e411cb444d7fc6e128ae7183e8"
  },
  {
    "url": "assets/js/32.73df0542.js",
    "revision": "779c4d5752ee1e6dfd6bc1640f9679da"
  },
  {
    "url": "assets/js/33.e1baa2ed.js",
    "revision": "61bdf1706afa72a4862df5585dd7f7ec"
  },
  {
    "url": "assets/js/34.f387dc45.js",
    "revision": "d47e2e1822b200597ec3636c2fc3075c"
  },
  {
    "url": "assets/js/35.9576aa38.js",
    "revision": "ac028372c71221bb0eb3b30343bbfde6"
  },
  {
    "url": "assets/js/36.d27e0e98.js",
    "revision": "c525e33ad594c3dabe778197a3d27ce3"
  },
  {
    "url": "assets/js/37.522c1085.js",
    "revision": "c37163faa2b53046bcd2c619e1838557"
  },
  {
    "url": "assets/js/38.f043124e.js",
    "revision": "798ea2065fe1921d69caebdae1b19576"
  },
  {
    "url": "assets/js/39.228bfe6f.js",
    "revision": "bbf752b3d0a9a3febcb8593ed88a3a96"
  },
  {
    "url": "assets/js/40.6504a6bc.js",
    "revision": "fcc5f2093d9e129edbf0b8abce13019a"
  },
  {
    "url": "assets/js/41.03490ca5.js",
    "revision": "069c80f6623ad2075fbf05893613e363"
  },
  {
    "url": "assets/js/42.3d7a2ccd.js",
    "revision": "b839b4ef6f017a75ea94e3b9b50a27f5"
  },
  {
    "url": "assets/js/43.af69c805.js",
    "revision": "6e1c18cd75fedfd9bb9710aa69d08553"
  },
  {
    "url": "assets/js/44.b0783103.js",
    "revision": "859c6f0200d44fdce7452dd091f648a5"
  },
  {
    "url": "assets/js/45.fd7ef253.js",
    "revision": "33aa8d7a910158bf079f3820e233dec2"
  },
  {
    "url": "assets/js/46.518839a1.js",
    "revision": "cd08179dd1c712e88f0e1c5041592644"
  },
  {
    "url": "assets/js/47.3bf633f2.js",
    "revision": "5903f39b216b53945ceb49744243d69b"
  },
  {
    "url": "assets/js/48.f1b6ef6e.js",
    "revision": "bb3903b20c37dc1a811d7d61d2f75c70"
  },
  {
    "url": "assets/js/49.63f03738.js",
    "revision": "3b0352645f8202132eccb204a7caf880"
  },
  {
    "url": "assets/js/50.f3edcb97.js",
    "revision": "5000ce8b35e8b6a6ac2c967ce2e40fb0"
  },
  {
    "url": "assets/js/51.105ac267.js",
    "revision": "cb49ec0d8a1601fb01be39bf223a63d2"
  },
  {
    "url": "assets/js/52.979493f6.js",
    "revision": "d038edc7cf19ee185fb8fa007c18f788"
  },
  {
    "url": "assets/js/53.c1e50294.js",
    "revision": "7befa2e16b5b153393612cb00c7e662f"
  },
  {
    "url": "assets/js/54.4be3800a.js",
    "revision": "b63fbd6a48055505b21677797ec4c8f2"
  },
  {
    "url": "assets/js/55.17d2888c.js",
    "revision": "b1cd015f637ffdf57a23a57e8b6b0f23"
  },
  {
    "url": "assets/js/56.00001064.js",
    "revision": "41a8815ad0f2725b4527579ab616ff36"
  },
  {
    "url": "assets/js/57.684158ee.js",
    "revision": "ae2b538d995b7f14e9c4b359380369f4"
  },
  {
    "url": "assets/js/58.c984c231.js",
    "revision": "26dedf44346e5ee4b77c2c8b3bb9f4cd"
  },
  {
    "url": "assets/js/59.7bd1883a.js",
    "revision": "d2276025b3e6ddd81444c20f9793bb17"
  },
  {
    "url": "assets/js/60.4343150b.js",
    "revision": "d711d0ac483f1f58185ab6caf4235139"
  },
  {
    "url": "assets/js/61.a7767f71.js",
    "revision": "48d5e246e40f0267fd2e4ba51340eee7"
  },
  {
    "url": "assets/js/62.1fcf24cd.js",
    "revision": "7e311db35f8ff321887f50e62f827d33"
  },
  {
    "url": "assets/js/63.09b153f6.js",
    "revision": "5b9f32aac2a4c8ab03abb2cc4c87d15f"
  },
  {
    "url": "assets/js/64.0c0ee169.js",
    "revision": "711ee39f0d7a794204bdb45aeb655624"
  },
  {
    "url": "assets/js/65.acb676c8.js",
    "revision": "3f01ab39db234a3d55ac39dd5aef0e80"
  },
  {
    "url": "assets/js/66.ab699001.js",
    "revision": "f2bf07f6bde8c14b8a0a12776207a635"
  },
  {
    "url": "assets/js/67.66285632.js",
    "revision": "9abfee533c34f8f76f94204ad8e4ca32"
  },
  {
    "url": "assets/js/8.4dc3cb1c.js",
    "revision": "98a1f044cea09be634195eebd22c014a"
  },
  {
    "url": "assets/js/9.5d6500eb.js",
    "revision": "649ccdc16939fef540d0c5aef2ab89e8"
  },
  {
    "url": "assets/js/app.9866d445.js",
    "revision": "36e74fba07def019c21bd6f9b21c4e5f"
  },
  {
    "url": "assets/js/icon-svg.7f439e1e.js",
    "revision": "b239b2b016742b1b2657f59c8f11c8a1"
  },
  {
    "url": "assets/js/vendors~flowchart.134cf908.js",
    "revision": "84113f0758af33d1f10d78c4f89a0355"
  },
  {
    "url": "assets/js/vendors~icon-svg.27a8ad63.js",
    "revision": "8a2dac32eee035d46a2a26293763b6ca"
  },
  {
    "url": "assets/js/vuejs-paginate.741fe58e.js",
    "revision": "685e1be1097935151669ac25db43dfe7"
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
    "url": "config/blog/author.html",
    "revision": "290f91c52512aad899aacdea426cfbe3"
  },
  {
    "url": "config/blog/blog-config.html",
    "revision": "9a8fa87dc018a8f6549988b337e2699b"
  },
  {
    "url": "config/blog/category-tag.html",
    "revision": "7c4b9dc0f11160f48eecfbb32b09350c"
  },
  {
    "url": "config/blog/comment.html",
    "revision": "4fc518ba63d4a343969bb974b544bc47"
  },
  {
    "url": "config/blog/frontmatter.html",
    "revision": "e3ebdc5b1c346c7567fee3c9f1938477"
  },
  {
    "url": "config/blog/home.html",
    "revision": "863513518a5e9a68eebf916faf60c197"
  },
  {
    "url": "config/blog/index.html",
    "revision": "ba7f3781d33b0075fd9a43533403ee9c"
  },
  {
    "url": "config/blog/rss.html",
    "revision": "f61f214813cf0a49d1a62217550c19b3"
  },
  {
    "url": "config/copyright.html",
    "revision": "f87cc891555e6cea314f054cf6b5d661"
  },
  {
    "url": "config/footer.html",
    "revision": "68f82e68d78da984a77888b4c346a453"
  },
  {
    "url": "config/friend-link.html",
    "revision": "679671f501c94337d5817a1314adc9a8"
  },
  {
    "url": "config/google-analytics.html",
    "revision": "2cebfb2590cf52334e2b163b078ee124"
  },
  {
    "url": "config/home.html",
    "revision": "a0a9ce523573eb1401c633d93a8685c1"
  },
  {
    "url": "config/index.html",
    "revision": "cb6e61af1cfe4721e538bfac8edb298d"
  },
  {
    "url": "config/redirect.html",
    "revision": "2d851da941df05ec9ac8cc30d52773eb"
  },
  {
    "url": "config/svg-icon.html",
    "revision": "078e83b8c68a6454a3d951c4179c1f96"
  },
  {
    "url": "guide/assets.html",
    "revision": "b60a02b2f46909b3dc1c77a385ddc413"
  },
  {
    "url": "guide/basic-config.html",
    "revision": "62b77813abfd4c0d890d729515b5aabd"
  },
  {
    "url": "guide/deep/frontmatter.html",
    "revision": "4d9b4eb644289d434e61aa83496b5cf2"
  },
  {
    "url": "guide/deep/global-computed.html",
    "revision": "5ad7fdc92df5a89a434cb7534ea2704e"
  },
  {
    "url": "guide/deep/markdown-slot.html",
    "revision": "7b9dfdf8e8e3ecb3adf1b27e7fb0a4c5"
  },
  {
    "url": "guide/deep/permalinks.html",
    "revision": "85ad17bbe2a2a99354e49c49e3e305ff"
  },
  {
    "url": "guide/deploy.html",
    "revision": "321a729cb009d803b685b5e62dfa3616"
  },
  {
    "url": "guide/getting-started.html",
    "revision": "832b9f4d19cb1e58109e3375ca93ccba"
  },
  {
    "url": "guide/i18n.html",
    "revision": "a8c07102d500d10b15f4b53490fc5b6c"
  },
  {
    "url": "guide/index.html",
    "revision": "ca1c3e215ec4328752bb720ff45c883e"
  },
  {
    "url": "guide/theme-config.html",
    "revision": "e338de7904acdc1517410e5a58b8ea16"
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
    "url": "index.html",
    "revision": "30f68403f9dcbfc8bd76e7b3afabca4a"
  },
  {
    "url": "logo.png",
    "revision": "50cccd0c2aa8112e2fae9ef18fd49a32"
  },
  {
    "url": "markdown/advance/1-link.html",
    "revision": "d5bd039217a48126c77527df50f86f6e"
  },
  {
    "url": "markdown/advance/2-frontmatter.html",
    "revision": "2f5ca616d35b4523561f65ef58aa1227"
  },
  {
    "url": "markdown/advance/3-container.html",
    "revision": "56c35465f7677e099a90e6d1f397d4c4"
  },
  {
    "url": "markdown/advance/4-highlight.html",
    "revision": "1b2a1293789a82770992370f49a26102"
  },
  {
    "url": "markdown/advance/5-import.html",
    "revision": "768555052158db12f068109d9a8cc967"
  },
  {
    "url": "markdown/advance/6-include.html",
    "revision": "ee23ad0e02a8e0adc3ace8c8d6542f69"
  },
  {
    "url": "markdown/advance/7-mermaid.html",
    "revision": "1f5161c1f91a1d9da694a6786c9cce15"
  },
  {
    "url": "markdown/advance/fragments/code-snippet-with-region.html",
    "revision": "4fb5e39c974f040f07ebd1a6815e9a2a"
  },
  {
    "url": "markdown/basic/1-line.html",
    "revision": "39778e75b6f214a83097e1de4a6046aa"
  },
  {
    "url": "markdown/basic/10-emoji.html",
    "revision": "307a19c6d2ea3ca26bd8ef0565517b24"
  },
  {
    "url": "markdown/basic/11-diff.html",
    "revision": "95adb530c760b48529f82f2b53e36bed"
  },
  {
    "url": "markdown/basic/2-title.html",
    "revision": "814dfd26e6056fb0b082e7393208a4ba"
  },
  {
    "url": "markdown/basic/3-text.html",
    "revision": "a6214aa5ae8f2d91990bb699fa381abd"
  },
  {
    "url": "markdown/basic/4-pic.html",
    "revision": "d3f6f3bd1fa6130a8bbc7fa6e3235c92"
  },
  {
    "url": "markdown/basic/5-link.html",
    "revision": "da282f74e2525fea14dfdafb755348af"
  },
  {
    "url": "markdown/basic/6-list.html",
    "revision": "98c69f08b05ea4621137a67095a0e203"
  },
  {
    "url": "markdown/basic/7-block.html",
    "revision": "10567cb6ca37676626956b192847dbb0"
  },
  {
    "url": "markdown/basic/8-highlight.html",
    "revision": "af99289d3e9d591fc1340c6a5b04e6ff"
  },
  {
    "url": "markdown/basic/9-table.html",
    "revision": "f3774f8d5c491b1b723ac13205ffe937"
  },
  {
    "url": "markdown/index.html",
    "revision": "ff4f2bac387124107ea575dfdbb12c22"
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
