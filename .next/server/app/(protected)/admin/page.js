(()=>{var e={};e.id=636,e.ids=[636],e.modules={53524:e=>{"use strict";e.exports=require("@prisma/client")},47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},94007:e=>{"use strict";e.exports=require("@prisma/client")},6113:e=>{"use strict";e.exports=require("crypto")},72254:e=>{"use strict";e.exports=require("node:buffer")},6005:e=>{"use strict";e.exports=require("node:crypto")},47261:e=>{"use strict";e.exports=require("node:util")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},92212:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>o.a,__next_app__:()=>p,originalPathname:()=>u,pages:()=>l,routeModule:()=>m,tree:()=>c}),r(16357),r(58365),r(35866),r(37489);var s=r(23191),a=r(88716),n=r(37922),o=r.n(n),i=r(95231),d={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>i[e]);r.d(t,d);let c=["",{children:["(protected)",{children:["admin",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,16357)),"/home/zoutigo/projets/nextjs/ecole-st-augustin-v2/app/(protected)/admin/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,58365)),"/home/zoutigo/projets/nextjs/ecole-st-augustin-v2/app/(protected)/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(r.bind(r,37489)),"/home/zoutigo/projets/nextjs/ecole-st-augustin-v2/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,35866,23)),"next/dist/client/components/not-found-error"],metadata:{icon:[async e=>(await Promise.resolve().then(r.bind(r,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],l=["/home/zoutigo/projets/nextjs/ecole-st-augustin-v2/app/(protected)/admin/page.tsx"],u="/(protected)/admin/page",p={require:r,loadChunk:()=>Promise.resolve()},m=new s.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/(protected)/admin/page",pathname:"/admin",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},92453:(e,t,r)=>{let s={"09e6c3048b07672268c14c57aee8fe7fcba7f749":()=>Promise.resolve().then(r.bind(r,93132)).then(e=>e.admin),"9ae0309bccf688ee7b722ea35fa19a028d0c9134":()=>Promise.resolve().then(r.bind(r,93132)).then(e=>e.$$ACTION_0),"1a8cef6534f3989adeb422102ad8771c4b287d2d":()=>Promise.resolve().then(r.bind(r,99983)).then(e=>e.logout),"6711d82fa291d17f8dcdfc74d34eeacacb8446cc":()=>Promise.resolve().then(r.bind(r,99983)).then(e=>e.$$ACTION_0)};async function a(e,...t){return(await s[e]()).apply(null,t)}e.exports={"09e6c3048b07672268c14c57aee8fe7fcba7f749":a.bind(null,"09e6c3048b07672268c14c57aee8fe7fcba7f749"),"9ae0309bccf688ee7b722ea35fa19a028d0c9134":a.bind(null,"9ae0309bccf688ee7b722ea35fa19a028d0c9134"),"1a8cef6534f3989adeb422102ad8771c4b287d2d":a.bind(null,"1a8cef6534f3989adeb422102ad8771c4b287d2d"),"6711d82fa291d17f8dcdfc74d34eeacacb8446cc":a.bind(null,"6711d82fa291d17f8dcdfc74d34eeacacb8446cc")}},69906:(e,t,r)=>{Promise.resolve().then(r.bind(r,72677))},72677:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>m});var s=r(10326);r(15424);var a=(0,r(46242).$)("09e6c3048b07672268c14c57aee8fe7fcba7f749");r(17577);var n=r(81219),o=r(98618);let i=()=>{let e=(0,o.kP)();return e.data?.user?.grade},d=({children:e,allowedGrade:t})=>i()!==t?s.jsx(n.X,{message:"You do not have permission to view this content !"}):s.jsx(s.Fragment,{children:e});var c=r(90772),l=r(33071),u=r(94007),p=r(85999);let m=()=>(0,s.jsxs)(l.Zb,{className:"w-[600px]",children:[s.jsx(l.Ol,{children:s.jsx("p",{className:"text-2xl font-semibold text-center",children:"\uD83D\uDD11 Admin"})}),(0,s.jsxs)(l.aY,{className:"space-y-4",children:[s.jsx(d,{allowedGrade:u.UserGrade.ADMIN,children:"Hello"}),(0,s.jsxs)("div",{className:"flex flex-row items-center justify-between rounded-lg p-3 shadow-md",children:[s.jsx("p",{className:"text-sm font-medium",children:"Admin only API route"}),s.jsx(c.z,{onClick:()=>{fetch("/api/admin").then(e=>{e.ok?p.Am.success("Allowed Api Route"):p.Am.error("Forbideen ")})},children:" Click to test !"})]}),(0,s.jsxs)("div",{className:"flex flex-row items-center justify-between rounded-lg p-3 shadow-md",children:[s.jsx("p",{className:"text-sm font-medium",children:"Admin only server actions"}),s.jsx(c.z,{onClick:()=>{a().then(e=>{e.error?p.Am.error(e.error):p.Am.success(e.success)})},children:" Click to test !"})]})]})]})},81219:(e,t,r)=>{"use strict";r.d(t,{X:()=>n});var s=r(10326);/**
 * @license lucide-react v0.407.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let a=(0,r(62881).Z)("TriangleAlert",[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]]),n=({message:e})=>e?(0,s.jsxs)("div",{className:"bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive",children:[s.jsx(a,{className:"w-4 h-4"}),(0,s.jsxs)("p",{children:[e," "]})]}):null},33071:(e,t,r)=>{"use strict";r.d(t,{Ol:()=>i,Zb:()=>o,aY:()=>d,eW:()=>c});var s=r(10326),a=r(17577),n=r(77863);let o=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,n.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",e),...t}));o.displayName="Card";let i=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,n.cn)("flex flex-col space-y-1.5 p-6",e),...t}));i.displayName="CardHeader",a.forwardRef(({className:e,...t},r)=>s.jsx("h3",{ref:r,className:(0,n.cn)("text-2xl font-semibold leading-none tracking-tight",e),...t})).displayName="CardTitle",a.forwardRef(({className:e,...t},r)=>s.jsx("p",{ref:r,className:(0,n.cn)("text-sm text-muted-foreground",e),...t})).displayName="CardDescription";let d=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,n.cn)("p-6 pt-0",e),...t}));d.displayName="CardContent";let c=a.forwardRef(({className:e,...t},r)=>s.jsx("div",{ref:r,className:(0,n.cn)("flex items-center p-6 pt-0",e),...t}));c.displayName="CardFooter"},93132:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$ACTION_0:()=>d,admin:()=>i});var s=r(27745);r(26461);var a=r(44809),n=r(53524),o=r(85723);let i=(0,s.registerServerReference)("9ae0309bccf688ee7b722ea35fa19a028d0c9134",d);async function d(){return await (0,a.currentGrade)()===n.UserGrade.ADMIN?{success:"You are allowed"}:{error:"Forbidden"}}(0,o.ensureServerEntryExports)([i]),(0,s.registerServerReference)("09e6c3048b07672268c14c57aee8fe7fcba7f749",i)},16357:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>o,__esModule:()=>n,default:()=>i});var s=r(68570);let a=(0,s.createProxy)(String.raw`/home/zoutigo/projets/nextjs/ecole-st-augustin-v2/app/(protected)/admin/page.tsx`),{__esModule:n,$$typeof:o}=a;a.default;let i=(0,s.createProxy)(String.raw`/home/zoutigo/projets/nextjs/ecole-st-augustin-v2/app/(protected)/admin/page.tsx#default`)},44809:(e,t,r)=>{"use strict";r.d(t,{currentGrade:()=>n,currentUser:()=>a});var s=r(33713);let a=async()=>{let e=await (0,s.auth)();return e?.user},n=async()=>{let e=await (0,s.auth)();return e?.user?.grade}}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[948,927,246,621,971,987,469,240,848,784,208],()=>r(92212));module.exports=s})();