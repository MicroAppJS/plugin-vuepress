(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{425:function(t,n,e){t.exports={link:"link_2CDXrBpV"}},542:function(t,n,e){"use strict";var r=e(425),a=e.n(r);e.d(n,"default",(function(){return a.a}))},617:function(t,n,e){"use strict";e.r(n);var r={name:"Link",props:{href:String,icon:String,text:String,hideOutboundIcon:Boolean,target:{type:String,default:"_blank"},rel:String},computed:{isBlankTarget:function(){return"_blank"===this.target},_rel:function(){return this.rel?this.rel:this.isBlankTarget?"noopener noreferrer":""}}},a=e(542),i=e(11);var l=Object(i.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("a",{staticClass:"nav-link external",class:t.$style.link,attrs:{href:t.href,target:t.target,rel:t._rel}},[t.icon?e("SvgIcon",{staticClass:"icon",attrs:{name:t.icon}}):t._e(),t._v(" "),t._t("default",(function(){return[t._v(t._s(t.text))]})),t._v(" "),t.hideOutboundIcon?t._e():[t.isBlankTarget?e("OutboundLink"):t._e()]],2)}),[],!1,(function(t){this.$style=a.default.locals||a.default}),null,null);n.default=l.exports}}]);