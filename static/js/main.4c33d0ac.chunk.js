(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{104:function(e,t,a){e.exports={grid:"EventTable_grid__28v1h",left:"EventTable_left__20GBs",right:"EventTable_right__2fBSa"}},247:function(e,t,a){e.exports={about:"About_about__2Pz2N"}},248:function(e,t,a){e.exports=a(500)},253:function(e,t,a){},499:function(e,t,a){},500:function(e,t,a){"use strict";a.r(t);var n,r=a(0),i=a.n(r),s=a(19),o=a.n(s),c=a(25),l=a(26),u=a(28),p=a(27),m=a(29),h=a(31),f=a(100),d=a.n(f),g=a(55),y=a(56),v=(a(253),a(97)),b=a.n(v),E=a(99),F=a.n(E),w=a(98),j=a.n(w),O=a(67),S=a.n(O),k=a(16),D=a.n(k),x=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return i.a.createElement(b.a,{color:"primary",position:"static",style:{flexGrow:1}},i.a.createElement(S.a,null,i.a.createElement(D.a,{variant:"h6"},"Roblox FFlag Watcher")),i.a.createElement(j.a,{value:this.props.pages.findIndex(function(t){return"/"===t.path?"/"===e.props.location.pathname:e.props.location.pathname.includes(t.activePath||t.path)})},this.props.pages.map(function(t){return i.a.createElement(F.a,{label:t.title,onClick:function(){return e.props.history.push(t.activePath||t.path)},key:t.path})})))}}]),t}(r.Component),C=Object(y.d)(x),T=a(68),R=a.n(T),B=a(37),A=a.n(B),P=a(46),L=a.n(P),W=a(69),M=a.n(W),N=a(70),_=a.n(N),I=a(53),z=a.n(I),V=a(48),H=a.n(V),G=a(242),J=a.n(G),U=a(101),X=a.n(U),$=a(102),q=a.n($),K=a(18),Q=a.n(K),Y=a(34),Z=a(32),ee=a(238),te=a.n(ee),ae=function(e){return"/"+e},ne=["ClientAppSettings","WindowsClientAppSettings","MacClientAppSettings","StudioAppSettings","WindowsBootstrapperSettings","WindowsStudioBootstrapperSettings","MacBootstrapperSettings","MacStudioBootstrapperSettings","AndroidAppSettings","iOSAppSettings","XboxAppSettings","RCCService"];!function(e){e.Created="Created",e.Removed="Removed",e.Changed="Changed"}(n||(n={}));var re=function(e){return Object.entries(e).forEach(function(t){var a=Object(Z.a)(t,2),n=a[0];void 0===a[1]&&delete e[n]}),e};function ie(e,t){return se.apply(this,arguments)}function se(){return(se=Object(Y.a)(Q.a.mark(function e(t,a){return Q.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(ae("flags/".concat(t).concat(a?"?fresh=true":"")));case 2:return e.abrupt("return",e.sent.json());case 3:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}function oe(e,t){return ce.apply(this,arguments)}function ce(){return(ce=Object(Y.a)(Q.a.mark(function e(t,a){var n;return Q.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=te.a.stringify(re({series:t,flag:a})),e.next=3,fetch(ae("events?".concat(n)));case 3:return e.abrupt("return",e.sent.json());case 4:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}var le={FFlag:"Flag",DFFlag:"Dynamic Flag",SFFlag:"Synced Flag",FInt:"Int",FString:"String",FLog:"Log",DFInt:"Dynamic Int",DFString:"Dynamic String",DFLog:"Dynamic Log"};function ue(e){var t=Object.entries(le).find(function(t){var a=Object(Z.a)(t,1)[0];return e.startsWith(a)});if(t){var a=Object(Z.a)(t,2),n=a[0];return{type:a[1],name:e.slice(n.length)}}return{name:e}}var pe=a(71),me=a.n(pe);function he(e,t){return i.a.createElement(me.a,{component:function(a){return i.a.createElement(g.b,Object.assign({to:"/history/".concat(t,"/").concat(e)},a))},color:"inherit",underline:"none",style:{fontSize:14,borderBottom:"1px dotted silver"}},ue(e).name)}var fe=a(54),de=a.n(fe),ge=a(142),ye=a.n(ge),ve=a(146),be=a.n(ve),Ee=a(72),Fe=a.n(Ee),we=a(49),je=a.n(we),Oe=a(143),Se=a.n(Oe),ke=a(239),De=a.n(ke),xe=a(150),Ce=a.n(xe),Te=a(148),Re=a.n(Te),Be=a(240),Ae=a.n(Be),Pe=a(149),Le=a.n(Pe),We=a(241),Me=a.n(We),Ne=a(103),_e=a.n(Ne),Ie=[["Dynamic Int",je.a,i.a.createElement(Re.a,null)],["Dynamic String",je.a,i.a.createElement(Le.a,null)],["Dynamic Log",je.a,i.a.createElement(Ce.a,null)],["Int",Fe.a,i.a.createElement(Re.a,null)],["Log",Fe.a,i.a.createElement(Ce.a,null)],["String",Fe.a,i.a.createElement(Le.a,null)],["Synced",ye.a,i.a.createElement(De.a,null)],["Dynamic",be.a,i.a.createElement(Ae.a,null)],["Flag",Se.a,i.a.createElement(Me.a,null)]],ze=function(e){return(Ie.find(function(t){var a=Object(Z.a)(t,1)[0];return e.includes(a)})||[])[1]},Ve=function(e){return(Ie.find(function(t){var a=Object(Z.a)(t,1)[0];return e.includes(a)})||[])[2]},He=_e()(function(e){return Object(h.createMuiTheme)(e)});function Ge(e){return e&&e.length>0?i.a.createElement(h.MuiThemeProvider,{theme:He({typography:{useNextVariants:!0},palette:{primary:ze(e)||{main:"#ccc"}}})},i.a.createElement(de.a,{label:e,color:"primary",icon:Ve(e)})):""}var Je=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e,t=this;return i.a.createElement(X.a,{title:"Fast Flags",data:this.props.flags.map(function(e){return[ue(e.flag).type||"",e.flag,e.flag,e.currentValue||"",e.lastUpdated?new Date(e.lastUpdated).toISOString():""]}),columns:(e=this.props,[{name:"Type",options:{customBodyRender:Ge,download:!1}},{name:"Flag",options:{filter:!1,download:!1,customBodyRender:function(t){return he(t,e.series)}}},{name:"Full Name",options:{filter:!1,display:!1,searchable:!0}},{name:"Value",options:{customBodyRender:function(e){return i.a.createElement(D.a,{noWrap:!0,style:{fontFamily:"monospace",fontSize:14,whiteSpace:"pre-wrap",wordBreak:"break-all"}},e)},filterOptions:["True","False"]}},{name:"Last Changed",options:{filter:!1,sortDirection:"desc",searchable:!1,customBodyRender:function(e){return e.length>0?i.a.createElement(H.a,{title:new Date(e).toLocaleString()},i.a.createElement(q.a,{fromNow:!0},e)):i.a.createElement(H.a,{title:"Created before tracking began"},i.a.createElement(D.a,{style:{color:"silver"}},"unknown"))}}}]),options:{selectableRows:!1,rowsPerPage:30,rowsPerPageOptions:[10,30,50,100,300,500,1e3,1/0],print:!1,filterType:"multiselect",customToolbar:function(){return i.a.createElement(r.Fragment,null,i.a.createElement(A.a,{onClick:t.props.refresh},i.a.createElement(J.a,null)),i.a.createElement(R.a,{style:{marginLeft:10}},i.a.createElement(M.a,{htmlFor:"series"},"Platform/Application"),i.a.createElement(z.a,{value:t.props.series,onChange:function(e){return t.props.setSeries(e.target.value)},input:i.a.createElement(L.a,{name:"series",id:"series"})},ne.map(function(e){return i.a.createElement(_.a,{value:e},e)}))))}}})}}]),t}(r.Component),Ue=a(47),Xe=function(e){function t(e){var a;Object(c.a)(this,t),a=Object(u.a)(this,Object(p.a)(t).call(this,e));var n=window.location.hash.substr(1);return a.state={series:ne.includes(n)?n:ne[0]},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=Object(Y.a)(Q.a.mark(function e(){return Q.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.getData());case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getData",value:function(){var e=Object(Y.a)(Q.a.mark(function e(t){var a=this;return Q.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.state.series!==ne[0]&&(window.location.hash="#".concat(this.state.series)),this.setState({flags:void 0},Object(Y.a)(Q.a.mark(function e(){return Q.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=a,e.next=3,ie(a.state.series,t);case 3:e.t1=e.sent,e.t2={flags:e.t1},e.t0.setState.call(e.t0,e.t2);case 6:case"end":return e.stop()}},e,this)})));case 2:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return i.a.createElement(i.a.Fragment,null,this.state.flags?this.props.children({flags:this.state.flags,series:this.state.series,refresh:function(){return e.getData(!0)},setSeries:function(t){return e.setState({series:t},e.getData)}}):i.a.createElement(Ue.LinearProgress,{style:{marginTop:2}}))}}]),t}(r.Component);var $e=a(246),qe=a.n($e),Ke=a(144),Qe=a.n(Ke),Ye=a(145),Ze=a.n(Ye),et=a(243),tt=a.n(et),at=a(244),nt=a.n(at),rt=a(245),it=a.n(rt),st=[["Created",Qe.a,i.a.createElement(tt.a,null)],["Changed",Ze.a,i.a.createElement(nt.a,null)],["Removed",je.a,i.a.createElement(it.a,null)]],ot=function(e){return(st.find(function(t){var a=Object(Z.a)(t,1)[0];return e.includes(a)})||[])[1]},ct=function(e){return(st.find(function(t){var a=Object(Z.a)(t,1)[0];return e.includes(a)})||[])[2]},lt=_e()(function(e){return Object(h.createMuiTheme)(e)});function ut(e){return e&&e.length>0?i.a.createElement(h.MuiThemeProvider,{theme:lt({typography:{useNextVariants:!0},palette:{primary:ot(e)||{main:"#ccc"}}})},i.a.createElement(de.a,{label:e,color:"primary",icon:ct(e)})):""}var pt=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).ref=void 0,a.ref=i.a.createRef(),a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this.props.term,t=document.createElement("script");t.src="https://utteranc.es/client.js",t.async=!0,t.setAttribute("repo","evaera/Roblox-FFlag-Watcher"),t.setAttribute("crossorigin","anonymous"),t.setAttribute("label","comment"),t.setAttribute("theme","github-dark"),t.setAttribute("issue-term",e),this.ref.current.appendChild(t)}},{key:"render",value:function(){return i.a.createElement("div",{ref:this.ref})}}]),t}(i.a.Component),mt=a(104),ht=a.n(mt),ft=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).state={},a}return Object(m.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=Object(Y.a)(Q.a.mark(function e(){return Q.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",this.getData());case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getData",value:function(){var e=Object(Y.a)(Q.a.mark(function e(){var t=this;return Q.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:this.setState({events:void 0},Object(Y.a)(Q.a.mark(function e(){return Q.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=t,e.next=3,oe(t.props.series,t.props.flag);case 3:e.t1=e.sent,e.t2={events:e.t1},e.t0.setState.call(e.t0,e.t2);case 6:case"end":return e.stop()}},e,this)})));case 1:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return i.a.createElement(i.a.Fragment,null,this.props.series&&i.a.createElement("div",{style:{padding:20}},i.a.createElement(g.b,{to:"/history"},i.a.createElement(A.a,null,i.a.createElement(qe.a,null))),i.a.createElement(D.a,{variant:"h5",inline:!0,style:{verticalAlign:"middle",marginLeft:10}},"".concat(this.props.flag||this.props.series," "),this.props.flag&&i.a.createElement("small",{style:{color:"#999"}},this.props.series))),i.a.createElement("div",{className:"".concat(this.props.flag&&ht.a.grid)},i.a.createElement("div",{className:ht.a.left},this.state.events?i.a.createElement(X.a,{title:"Event History",columns:(e=!!this.props.flag,[{name:"Event",options:{customBodyRender:ut}},{name:"Series",options:{display:!e}},{name:"Type",options:{customBodyRender:Ge,download:!1,display:!e}},{name:"Flag",options:{display:!e,customBodyRender:function(e,t){return he(e,t.rowData[1])},download:!1}},{name:"Full Name",options:{display:!1}},{name:"Value",options:{customBodyRender:function(e){return i.a.createElement(D.a,{noWrap:!0,style:{fontFamily:"monospace",fontSize:14,whiteSpace:"pre-wrap",wordBreak:"break-all"}},e)},filterOptions:["True","False"]}},{name:"Time",options:{customBodyRender:function(e){return i.a.createElement(H.a,{title:new Date(e).toLocaleString()},i.a.createElement(q.a,{fromNow:!0},e))}}}]),data:this.state.events.map(function(e){return[e.type,e.series,ue(e.flag).type,e.flag,e.flag,e.value||"",e.time]}),options:{selectableRows:!1,sort:!1,print:!1,rowsPerPage:100}}):i.a.createElement(Ue.LinearProgress,{style:{marginTop:2}})),this.props.flag&&i.a.createElement("div",{className:ht.a.right},i.a.createElement(pt,{term:"".concat(this.props.series,': "').concat(this.props.flag,'"')}))));var e}}]),t}(r.Component);var dt=a(50),gt=a.n(dt),yt=a(22),vt=a.n(yt),bt=a(43),Et=a.n(bt),Ft=a(247),wt=a.n(Ft);function jt(e){var t=e.title,a=e.paragraphs,n=e.variant;return i.a.createElement(i.a.Fragment,null,i.a.createElement(D.a,{variant:n||"h4",style:{paddingTop:"h5"===n?0:30}},t),a.map(function(e){return i.a.createElement(D.a,{paragraph:!0,style:{fontSize:16,paddingTop:10}},e)}))}var Ot=Object(h.createMuiTheme)({typography:{useNextVariants:!0},palette:{type:"dark",primary:{main:"#ab47bc"},secondary:{main:"#f48fb1"}}}),St=[{path:"/",component:function(){return i.a.createElement(Xe,null,function(e){return i.a.createElement(Je,e)})},title:"Browser"},{path:"/history/:series?/:flag?",activePath:"/history",component:function(e){var t=e.match;return i.a.createElement(ft,{series:t.params.series,flag:t.params.flag,key:"".concat(t.params.series,":").concat(t.params.flag)})},title:"History"},{path:"/about",component:function(){return i.a.createElement(gt.a,{container:!0,justify:"center",className:wt.a.about},i.a.createElement(gt.a,{item:!0,xs:12,lg:5,md:8},i.a.createElement(vt.a,{style:{padding:40}},i.a.createElement(D.a,{variant:"h3"},"Roblox FFlag Watcher"),i.a.createElement(D.a,{variant:"subheading"},"By ",i.a.createElement(me.a,{href:"https://eryn.io"},"evaera")),i.a.createElement(gt.a,{container:!0,justify:"center",alignContent:"center",spacing:16},i.a.createElement(gt.a,{item:!0,xs:6,style:{textAlign:"right"}},i.a.createElement(Et.a,{variant:"raised",color:"primary",href:"https://github.com/evaera/Roblox-FFlag-Watcher"},"GitHub Repository")),i.a.createElement(gt.a,{item:!0,xs:6,style:{textAlign:"left"}},i.a.createElement(Et.a,{variant:"raised",color:"secondary",href:"https://www.patreon.com/erynlynn"},"Support on Patreon"))),i.a.createElement(jt,{title:"What is a Fast Flag?",paragraphs:["The Roblox engine uses a system called Fast Flags as part of its deployment process. When code is shipped, not all of it is active by default. Rather, the changes are suppressed by flags that are dynamically enabled and disabled, even after the code is live on production."]}),i.a.createElement(jt,{title:"Types of Fast Flags",paragraphs:["There are several different kinds of Fast Flags. However, it's possible to separate them into two groups: Dynamic Fast Flags (DFFlags)and regular Fast Flags (FFlags).",i.a.createElement(jt,{title:"Fast Flags",variant:"h5",paragraphs:["Standard FFlags are fetched on client startup and do not change thereafter.",i.a.createElement("div",null,Ge("Flag")," ",Ge("Int")," ",Ge("String")," ",Ge("Log"))]}),i.a.createElement(jt,{title:"Dynamic Fast Flags",variant:"h5",paragraphs:["DFFlags are fetched every 5 minutes and can change any number of times while the game is running.",i.a.createElement("div",null,Ge("Dynamic Flag")," ",Ge("Dynamic Int")," ",Ge("Dynamic String")," ",Ge("Dynamic Log"))]}),i.a.createElement(jt,{title:"Synchronized Fast Flags",variant:"h5",paragraphs:["SFFlags are synced to the client from the server. They are fetched at server startup, and the client receives whatever value the server currently has.",i.a.createElement("div",null,Ge("Synced Flag"))]})]}))))},title:"About"}],kt=function(e){function t(){return Object(c.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement(g.a,null,i.a.createElement(h.MuiThemeProvider,{theme:Ot},i.a.createElement(d.a,null),i.a.createElement(C,{pages:St}),St.map(function(e){return i.a.createElement(y.a,{exact:"/"===e.path,path:e.path,component:e.component,key:e.path})})))}}]),t}(r.Component);a(499),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(kt,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[248,1,2]]]);
//# sourceMappingURL=main.4c33d0ac.chunk.js.map