webpackJsonp([1],{"9rLS":function(t,e){},NHnr:function(t,e,n){"use strict";function a(t){n("9rLS")}function r(t){n("gu2T")}function s(t){n("xlGV")}Object.defineProperty(e,"__esModule",{value:!0});var o=n("7+uW"),u={name:"app"},i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},l=[],c={render:i,staticRenderFns:l},p=c,v=n("VU/8"),_=a,f=v(u,p,!1,_,null,null),h=f.exports,m=n("/ocq"),g={name:"HelloWorld",data:function(){return{msg:"Welcome to Your Vue.js App"}}},d=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"hello"},[n("h1",[t._v(t._s(t.msg))]),t._v(" "),n("h2",[t._v("Essential Links")]),t._v(" "),t._m(0,!1,!1),t._v(" "),n("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1,!1,!1)])},w=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("Core Docs")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("Forum")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("Community Chat")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("Twitter")])]),t._v(" "),n("br"),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("Docs for This Template")])])])},function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",[n("li",[n("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[t._v("vue-router")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[t._v("vuex")])]),t._v(" "),n("li",[n("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[t._v("vue-loader")])]),t._v(" "),n("li",[n("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[t._v("awesome-vue")])])])}],b={render:d,staticRenderFns:w},y=b,k=n("VU/8"),q=r,j=k(g,y,!1,q,"data-v-4241e014",null),x=j.exports,E=n("gRE1"),C=n.n(E),F=n("lHA8"),R=n.n(F),I=function(t){var e=new Date(1e3*t.creation_date),n=Math.floor((new Date-e)/3600/24/1e3),a=void 0!==t.accepted_answer_id,r=t.answer_count,s="";return a?s="potential-none":0===r?s="potential-high":r>1&&(s="potential-low"),{title:t.title,url:t.link,tags:t.tags,score:t.score,date:e,days:n,views:t.view_count,accepted:a,answers:r,bounty:{value:t.bounty_amount,date:new Date(1e3*t.bounty_closes_date)},owner:{url:t.owner.link,name:t.owner.display_name,rep:t.owner.reputation},potentialClass:s}},T=function(t,e){t.quotaMax=e.quota_max,t.quotaRemaining=e.quota_remaining,e.items.map(I).forEach(function(e){t.repo[e.url]=e})},V=function(t){var e=new R.a(t.tagsInput.split(/\s+/));t.questions=C()(t.repo).filter(function(t){return t.tags.some(function(t){return e.has(t)})}).sort(function(t,e){return e.bounty.date-t.bounty.date})},D=function(t,e){var n=new R.a(t.questions.filter(function(t,n){return n<e}).map(function(t){return t.url}));C()(t.repo).map(function(t){return t.url}).filter(function(t){return!n.has(t)}).forEach(function(e){return delete t.repo[e]})},H={name:"Bounties",data:function(){return{repo:{},questions:[],tagsInput:"java bash sonarqube awk git shell javascript maven sonarlint r unix go python junit",quotaMax:0,quotaRemaining:0}},mounted:function(){var t=this;this.fetch("http://localhost:8080/static/sample1.json").then(function(e){t.merge(e),t.applyFilters(),t.evictExcess(3)})},methods:{fetch:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t){return fetch(t).then(function(t){return t.json()})}),update:function(){var t=this;this.fetch("https://api.stackexchange.com/2.2/questions/featured?pagesize=100&site=stackoverflow").then(function(e){t.merge(e),t.applyFilters()})},merge:function(t){T(this,t)},applyFilters:function(){V(this)},evictExcess:function(t){D(this,t)}}},M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"questions"},[n("p",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.tagsInput,expression:"tagsInput"}],attrs:{size:"80"},domProps:{value:t.tagsInput},on:{change:t.applyFilters,input:function(e){e.target.composing||(t.tagsInput=e.target.value)}}})]),t._v(" "),n("h1",[t._v("Questions "),n("button",{on:{click:t.update}},[t._v("Update")]),t._v(" "+t._s(t.quotaRemaining)+"/"+t._s(t.quotaMax))]),t._v(" "),t._l(t.questions,function(e){return n("div",{staticClass:"question",class:e.potentialClass},[n("h2",[n("a",{attrs:{href:e.url}},[t._v(t._s(e.title))])]),t._v(" "),n("p",t._l(e.tags,function(e){return n("span",{staticClass:"tag"},[t._v(t._s(e))])})),t._v(" "),n("p",[t._v("\n      days: "+t._s(e.days)+"\n      views: "+t._s(e.views)+"\n      answers: "+t._s(e.answers)+"\n      score: "+t._s(e.score)+"\n      op: "+t._s(e.owner.rep)+"\n      value: "+t._s(e.bounty.value)+"\n    ")])])})],2)},$=[],A={render:M,staticRenderFns:$},S=A,U=n("VU/8"),W=s,L=U(H,S,!1,W,"data-v-5a86a560",null),N=L.exports;o.a.use(m.a);var z=new m.a({routes:[{path:"/hello",name:"HelloWorld",component:x},{path:"/",name:"Bounties",component:N}]});o.a.config.productionTip=!1,new o.a({el:"#app",router:z,template:"<App/>",components:{App:h}})},gu2T:function(t,e){},xlGV:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.1e41e48b0d4e884b9177.js.map