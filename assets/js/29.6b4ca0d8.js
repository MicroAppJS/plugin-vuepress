(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{628:function(t,s,r){"use strict";r.r(s);var a=r(11),e=Object(a.a)({},(function(){var t=this,s=t.$createElement,r=t._self._c||s;return r("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[r("h1",{attrs:{id:"rss"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#rss"}},[t._v("#")]),t._v(" RSS")]),t._v(" "),r("p",[t._v("RSS 配置。")]),t._v(" "),r("h2",{attrs:{id:"introduce"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#introduce"}},[t._v("#")]),t._v(" Introduce")]),t._v(" "),r("p",[t._v("通过 "),r("code",[t._v("blogConfig.rss")]),t._v(" 配置评论组件, 只支持 "),r("code",[t._v("blog")]),t._v(" 类型。")]),t._v(" "),r("h2",{attrs:{id:"usage"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#usage"}},[t._v("#")]),t._v(" Usage")]),t._v(" "),r("p",[t._v("使用方式如下：")]),t._v(" "),r("div",{staticClass:"language-js extra-class"},[r("div",{staticClass:"custom-style-wrapper window-controls"},[r("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",width:"54",height:"14",viewBox:"0 0 54 14"}},[r("g",{attrs:{fill:"none","fill-rule":"evenodd",transform:"translate(1 1)"}},[r("circle",{attrs:{cx:"6",cy:"6",r:"6",fill:"#FF5F56",stroke:"#E0443E","stroke-width":".5"}}),r("circle",{attrs:{cx:"26",cy:"6",r:"6",fill:"#FFBD2E",stroke:"#DEA123","stroke-width":".5"}}),r("circle",{attrs:{cx:"46",cy:"6",r:"6",fill:"#27C93F",stroke:"#1AAB29","stroke-width":".5"}})])])]),r("pre",{pre:!0,attrs:{class:"language-js"}},[r("code",[r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// microapp/config/vuepress.js")]),t._v("\nmodule"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("exports "),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),r("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("blogConfig")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("rss")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n          "),r("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("siteUrl")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'https://zyao89.cn'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// required")]),t._v("\n          "),r("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("copyright")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token string"}},[t._v("'2018 Zyao89'")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// optional")]),t._v("\n          "),r("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("filter")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),r("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("frontmatter")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=>")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("return")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),r("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("true")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v("|")]),r("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// filter some post")]),t._v("\n          "),r("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("count")]),r("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token number"}},[t._v("20")]),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),r("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// How much articles")]),t._v("\n        "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n    "),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),r("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])]),t._v(" "),r("CodeResult",{attrs:{lang:"js",code:"%2F%2F%20microapp%2Fconfig%2Fvuepress.js%0Amodule.exports%20%3D%20%7B%0A%20%20%20%20blogConfig%3A%20%7B%0A%20%20%20%20%20%20%20%20rss%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20siteUrl%3A%20'https%3A%2F%2Fzyao89.cn'%2C%20%2F%2F%20required%0A%20%20%20%20%20%20%20%20%20%20copyright%3A%20'2018%20Zyao89'%2C%20%2F%2F%20optional%0A%20%20%20%20%20%20%20%20%20%20filter%3A%20(frontmatter)%20%3D%3E%20%7B%20return%20%5Btrue%7Cfalse%5D%20%7D%2C%20%2F%2F%20filter%20some%20post%0A%20%20%20%20%20%20%20%20%20%20count%3A%2020%2C%20%2F%2F%20How%20much%20articles%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D"}})],1),r("h2",{attrs:{id:"options"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#options"}},[t._v("#")]),t._v(" Options")]),t._v(" "),r("h3",{attrs:{id:"siteurl"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#siteurl"}},[t._v("#")]),t._v(" siteUrl")]),t._v(" "),r("ul",[r("li",[t._v("required: "),r("code",[t._v("true")])]),t._v(" "),r("li",[t._v("类型: "),r("code",[t._v("string")])]),t._v(" "),r("li",[t._v("默认值: "),r("code",[t._v("undefined")])]),t._v(" "),r("li",[t._v("example: "),r("code",[t._v("https://zyao89.cn")])])]),t._v(" "),r("p",[t._v("网站地址.")]),t._v(" "),r("h3",{attrs:{id:"copyright"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#copyright"}},[t._v("#")]),t._v(" copyright")]),t._v(" "),r("ul",[r("li",[t._v("required: "),r("code",[t._v("false")])]),t._v(" "),r("li",[t._v("类型: "),r("code",[t._v("string")])]),t._v(" "),r("li",[t._v("默认值: "),r("code",[t._v("${$themeConfig.copyright}")])]),t._v(" "),r("li",[t._v("example: "),r("code",[t._v("reco_luan 2019")])])]),t._v(" "),r("p",[t._v("版权信息。")]),t._v(" "),r("h3",{attrs:{id:"filter"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#filter"}},[t._v("#")]),t._v(" filter")]),t._v(" "),r("ul",[r("li",[t._v("required: "),r("code",[t._v("false")])]),t._v(" "),r("li",[t._v("类型: "),r("code",[t._v("function")])]),t._v(" "),r("li",[t._v("默认值: "),r("code",[t._v("(frontmatter) => true")])]),t._v(" "),r("li",[t._v("example: "),r("code",[t._v("(frontmatter) => { return [true|false] }")])])]),t._v(" "),r("p",[t._v("博客的过滤器。")]),t._v(" "),r("h3",{attrs:{id:"count"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#count"}},[t._v("#")]),t._v(" count")]),t._v(" "),r("ul",[r("li",[t._v("required: "),r("code",[t._v("false")])]),t._v(" "),r("li",[t._v("类型: "),r("code",[t._v("number")])]),t._v(" "),r("li",[t._v("default: "),r("code",[t._v("20")])])]),t._v(" "),r("p",[t._v("显示最近多少篇博客。")])])}),[],!1,null,null,null);s.default=e.exports}}]);