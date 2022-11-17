(this["webpackJsonpit-incubator-todolist-ts"]=this["webpackJsonpit-incubator-todolist-ts"]||[]).push([[0],{134:function(t,e,a){t.exports=a(174)},141:function(t,e,a){},174:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),o=a(32),c=a.n(o);a(141),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(84);var r,l,s,d=a(247),u=a(248),f=a(249),m=a(243),b=a(246),O=a(238),E=a(250),T=a(240),g=a(79),p=a.n(g),h=a(21),j=a(16),k=a(17),v=a(118),S=a.n(v).a.create(Object(k.a)({baseURL:"https://social-network.samuraijs.com/api/1.1/"},{withCredentials:!0,headers:{"API-KEY":"109cdbd6-571a-45e5-80a2-833676b0684d"}})),I=function(){return S.get("todo-lists")},L=function(t){return S.post("todo-lists",{title:t})},y=function(t){return S.delete("todo-lists/".concat(t))},C=function(t,e){return S.put("todo-lists/".concat(t),{title:e})},A=function(t){return S.get("todo-lists/".concat(t,"/tasks"))},w=function(t,e){return S.post("todo-lists/".concat(t,"/tasks"),{title:e})},D=function(t,e){return S.delete("todo-lists/".concat(t,"/tasks/").concat(e))},N=function(t,e,a){return S.put("todo-lists/".concat(t,"/tasks/").concat(e),a)},P=function(t){return S.post("auth/login",t)},R=function(){return S.get("auth/me")},x=function(){return S.delete("/auth/login")};!function(t){t[t.Ok=0]="Ok",t[t.Error=1]="Error",t[t.Captcha=2]="Captcha"}(r||(r={})),function(t){t[t.New=0]="New",t[t.InProgress=1]="InProgress",t[t.Completed=2]="Completed",t[t.Draft=3]="Draft"}(l||(l={})),function(t){t[t.Low=0]="Low",t[t.Middle=1]="Middle",t[t.Hi=2]="Hi",t[t.Urgently=3]="Urgently",t[t.Later=4]="Later"}(s||(s={}));var F=function(t,e){t.messages.length?e(M(t.messages[0])):e(M("Some error occurred")),e(_("failed"))},U=function(t,e){e(M(t.message?t.message:"Some error occurred")),e(_("failed"))},G={isLoggedIn:!1},H=function(t){return{type:"login/SET-IS-LOGGED-IN",isLoggedIn:t}},K={status:"idle",error:null,isInitialized:!1},M=function(t){return{type:"APP/SET-ERROR",error:t}},_=function(t){return{type:"APP/SET-STATUS",status:t}},z=[],V=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:z,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET-TODOLIST":return e.todolist.map((function(t){return Object(k.a)(Object(k.a)({},t),{},{filter:"all",entityStatus:"idle"})}));case"REMOVE-TODOLIST":return t.filter((function(t){return t.id!==e.todolistId}));case"ADD-TODOLIST":var a=Object(k.a)(Object(k.a)({},e.todolist),{},{filter:"all",entityStatus:"idle"});return[a].concat(Object(j.a)(t));case"CHANGE-TODOLIST-TITLE":return t.map((function(t){return t.id===e.todolistId?Object(k.a)(Object(k.a)({},t),{},{title:e.newTodolistTitle}):t}));case"CHANGE-TODOLIST-FILTER":return t.map((function(t){return t.id===e.todolistId?Object(k.a)(Object(k.a)({},t),{},{filter:e.filter}):t}));case"CHANGE-TODOLIST-ENTITY-STATUS":return t.map((function(t){return t.id===e.todolistId?Object(k.a)(Object(k.a)({},t),{},{entityStatus:e.entityStatus}):t}));default:return t}},B=function(t){return{type:"REMOVE-TODOLIST",todolistId:t}},q=function(t){return{type:"ADD-TODOLIST",todolist:t}},Y=function(t,e){return{type:"CHANGE-TODOLIST-TITLE",todolistId:t,newTodolistTitle:e}},Z=function(t,e){return{type:"CHANGE-TODOLIST-FILTER",todolistId:t,filter:e}},J=function(t,e){return{type:"CHANGE-TODOLIST-ENTITY-STATUS",entityStatus:e,todolistId:t}},W=a(3),X={},$=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:X,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"SET-TASKS":return Object(k.a)(Object(k.a)({},t),{},Object(W.a)({},e.todolistId,e.tasks.map((function(t){return Object(k.a)(Object(k.a)({},t),{},{entityStatus:"idle"})}))));case"SET-TODOLIST":var a=Object(k.a)({},t);return e.todolist.forEach((function(t){a[t.id]=[]})),a;case"REMOVE-TASKS":return Object(k.a)(Object(k.a)({},t),{},Object(W.a)({},e.todolistId,t[e.todolistId].filter((function(t){return t.id!==e.taskId}))));case"ADD-TASKS":var n=Object(k.a)(Object(k.a)({},e.task),{},{entityStatus:"idle"});return Object(k.a)(Object(k.a)({},t),{},Object(W.a)({},e.todolistId,[n].concat(Object(j.a)(t[e.todolistId]))));case"UPDATE-TASK":return Object(k.a)(Object(k.a)({},t),{},Object(W.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(k.a)(Object(k.a)({},t),e.dataUpdateRequest):t}))));case"ADD-TODOLIST":return Object(k.a)(Object(k.a)({},t),{},Object(W.a)({},e.todolist.id,[]));case"REMOVE-TODOLIST":var i=Object(k.a)({},t);return delete i[e.todolistId],i;default:return t;case"CHANGE-TASK-ENTITY-STATUS":return Object(k.a)(Object(k.a)({},t),{},Object(W.a)({},e.todolistId,t[e.todolistId].map((function(t){return t.id===e.taskId?Object(k.a)(Object(k.a)({},t),{},{entityStatus:e.entityStatus}):t}))))}},Q=function(t,e){return{type:"REMOVE-TASKS",todolistId:t,taskId:e}},tt=function(t,e){return{type:"ADD-TASKS",todolistId:t,task:e}},et=function(t,e,a){return{type:"UPDATE-TASK",todolistId:t,taskId:e,dataUpdateRequest:a}},at=function(t,e,a){return{type:"CHANGE-TASK-ENTITY-STATUS",todolistId:t,taskId:e,entityStatus:a}},nt=function(t,e,a){return function(n,i){n(_("loading")),n(at(t,e,"loading"));var o=i().tasks[t].find((function(t){return t.id===e}));if(o){var c=Object(k.a)({title:o.title,status:o.status,description:o.description,priority:o.priority,startDate:o.startDate,deadline:o.deadline},a);N(t,e,c).then((function(i){if(0===i.data.resultCode){var o=et(t,e,a);n(o),n(_("succeeded"))}else F(i.data,n)})).catch((function(t){U(t,n)})).finally((function(){n(at(t,e,"idle"))}))}}},it=a(239),ot=a(242),ct=a(9),rt=a(232),lt=a(229),st=i.a.memo((function(t){console.log("AddItemForms is called");var e=Object(n.useState)(""),a=Object(ct.a)(e,2),o=a[0],c=a[1],r=Object(n.useState)(null),l=Object(ct.a)(r,2),s=l[0],d=l[1],u=function(){if(""!==o.trim())t.callBack(o.trim()),c("");else{d("Title is required");c("".trim())}};return i.a.createElement("div",null,i.a.createElement(rt.a,{disabled:t.disabled,error:!!s,value:o,onChange:function(t){c(t.currentTarget.value)},onKeyPress:function(t){null!==s&&d(null),"Enter"===t.key&&u()},id:"outlined-basic",label:"Type value",variant:"outlined",helperText:s,size:"small"}),i.a.createElement(O.a,{style:{maxHeight:"70px"},onClick:u,variant:"contained",endIcon:i.a.createElement(lt.a,null),disabled:t.disabled},"Add"))})),dt=a(123),ut=i.a.memo((function(t){console.log("EditableSpan is added");var e=Object(n.useState)(!1),a=Object(ct.a)(e,2),o=a[0],c=a[1],r=Object(n.useState)(""),l=Object(ct.a)(r,2),s=l[0],d=l[1];return o?i.a.createElement(rt.a,{disabled:t.disabled,onBlur:function(){c(!1),t.onChange(s)},onChange:function(t){d(t.currentTarget.value)},type:"text",value:s,autoFocus:!0,id:"outlined-basic",variant:"standard"}):i.a.createElement("span",{onDoubleClick:function(){c(!0),d(t.title)}},t.title)})),ft=a(230),mt=a(234),bt=i.a.memo((function(t){var e=Object(n.useCallback)((function(){t.removeTasks(t.todoListId,t.task.id)}),[t.removeTasks,t.todoListId,t.task.id]),a=Object(n.useCallback)((function(e){var a=e.currentTarget.checked;t.changeChecked(t.todoListId,t.task.id,a?l.Completed:l.New)}),[t.todoListId,t.task.id]),o=Object(n.useCallback)((function(e){t.changeTaskTitle(t.todoListId,t.task.id,e)}),[t.changeTaskTitle,t.todoListId,t.task.id]);return i.a.createElement("li",{className:t.task.status===l.Completed?"is-done":""},i.a.createElement(mt.a,{disabled:"loading"===t.entityStatus||"loading"===t.task.entityStatus,color:"success",checked:t.task.status===l.Completed,onChange:a,inputProps:{"aria-label":"controlled"}}),i.a.createElement(ut,{title:t.task.title,onChange:function(t){return o(t)},disabled:"loading"===t.entityStatus||"loading"===t.task.entityStatus}),i.a.createElement(m.a,{onClick:e,"aria-label":"delete",disabled:"loading"===t.entityStatus||"loading"===t.task.entityStatus},i.a.createElement(ft.a,null)))})),Ot=["demo"],Et=i.a.memo((function(t){var e=t.demo,a=void 0!==e&&e,o=Object(dt.a)(t,Ot),c=Object(h.b)();Object(n.useEffect)((function(){var t;a||c((t=o.todoList.id,function(e){e(_("loading")),A(t).then((function(a){e(function(t,e){return{type:"SET-TASKS",todolistId:t,tasks:e}}(t,a.data.items)),e(_("succeeded"))})).catch((function(t){U(t,e)}))}))}),[]);var r=o.tasks;"completed"===o.todoList.filter&&(r=o.tasks.filter((function(t){return t.status===l.Completed}))),"active"===o.todoList.filter&&(r=o.tasks.filter((function(t){return t.status===l.New})));var s=r.map((function(t){return i.a.createElement(bt,{entityStatus:o.todoList.entityStatus,key:t.id,task:t,removeTasks:o.removeTasks,todoListId:o.todoList.id,changeChecked:o.changeChecked,changeTaskTitle:o.changeTaskTitle})})),d=Object(n.useCallback)((function(){o.changeFilter(o.todoList.id,"all")}),[o.changeFilter,o.todoList.id]),u=Object(n.useCallback)((function(){o.changeFilter(o.todoList.id,"completed")}),[o.changeFilter,o.todoList.id]),f=Object(n.useCallback)((function(){o.changeFilter(o.todoList.id,"active")}),[o.changeFilter,o.todoList.id]),b=Object(n.useCallback)((function(t){o.addTask(o.todoList.id,t)}),[o.addTask,o.todoList.id]),E=Object(n.useCallback)((function(t){o.changeTitleTodoList(o.todoList.id,t)}),[o.changeTitleTodoList,o.todoList.id]);return i.a.createElement("div",null,i.a.createElement("h3",null,i.a.createElement(ut,{title:o.todoList.title,onChange:E,disabled:"loading"===o.todoList.entityStatus}),i.a.createElement(m.a,{onClick:function(){o.removeTodoList(o.todoList.id)},"aria-label":"delete",disabled:"loading"===o.todoList.entityStatus},i.a.createElement(ft.a,null))),i.a.createElement("div",null,i.a.createElement(st,{callBack:b,disabled:"loading"===o.todoList.entityStatus})),i.a.createElement("ul",null,s),i.a.createElement("div",null,i.a.createElement(O.a,{variant:"all"===o.todoList.filter?"contained":"text",onClick:d},"All"),i.a.createElement(O.a,{variant:"completed"===o.todoList.filter?"contained":"text",color:"success",onClick:u},"Completed"),i.a.createElement(O.a,{variant:"active"===o.todoList.filter?"contained":"text",color:"secondary",onClick:f},"Active")))})),Tt=a(13),gt=function(t){var e=t.demo,a=void 0!==e&&e,o=Object(h.b)(),c=Object(h.c)((function(t){return t.todolist})),r=Object(h.c)((function(t){return t.tasks})),l=Object(h.c)((function(t){return t.auth.isLoggedIn}));Object(n.useEffect)((function(){!a&&l&&o((function(t){t(_("loading")),I().then((function(e){t({type:"SET-TODOLIST",todolist:e.data}),t(_("succeeded"))})).catch((function(e){U(e,t)}))}))}),[]);var s=Object(n.useCallback)((function(t){o(function(t){return function(e){e(_("loading")),e(J(t,"loading")),y(t).then((function(a){if(0===a.data.resultCode){var n=B(t);e(n),e(_("succeeded"))}else F(a.data,e)})).catch((function(t){U(t,e)}))}}(t))}),[o]),d=Object(n.useCallback)((function(t,e){o(function(t,e){return function(a){a(_("loading")),a(at(t,e,"loading")),D(t,e).then((function(n){if(0===n.data.resultCode){var i=Q(t,e);a(i),a(_("succeeded"))}else F(n.data,a)})).catch((function(t){U(t,a)}))}}(t,e))}),[o]),u=Object(n.useCallback)((function(t,e){o(function(t,e){return function(a){a(_("loading")),w(t,e).then((function(e){if(0===e.data.resultCode){var n=tt(t,e.data.data.item);a(n),a(_("succeeded"))}else F(e.data,a)})).catch((function(t){U(t,a)}))}}(t,e))}),[o]),f=Object(n.useCallback)((function(t,e,a){o(nt(t,e,{title:a}))}),[o]),m=Object(n.useCallback)((function(t,e,a){o(nt(t,e,{status:a}))}),[o]),b=Object(n.useCallback)((function(t,e){var a=Z(t,e);o(a)}),[o]),O=Object(n.useCallback)((function(t,e){o(function(t,e){return function(a){a(_("loading")),a(J(t,"loading")),C(t,e).then((function(n){if(0===n.data.resultCode){var i=Y(t,e);a(i),a(_("succeeded"))}else F(n.data,a)})).catch((function(t){U(t,a)})).finally((function(){a(J(t,"idle"))}))}}(t,e))}),[o]),E=Object(n.useCallback)((function(t){o(function(t){return function(e){e(_("loading")),L(t).then((function(t){if(0===t.data.resultCode){var a=q(t.data.data.item);e(a),e(_("succeeded"))}else F(t.data,e)})).catch((function(t){U(t,e)}))}}(t))}),[o]);return l?i.a.createElement(i.a.Fragment,null,i.a.createElement(it.a,{container:!0,style:{padding:"10px"}},i.a.createElement(st,{callBack:E})),i.a.createElement(it.a,{container:!0,spacing:3},c.map((function(t){return i.a.createElement(it.a,{key:t.id,item:!0},i.a.createElement(ot.a,{key:t.id,style:{padding:"10px"}},i.a.createElement(Et,{todoList:t,key:t.id,tasks:r[t.id],removeTasks:d,changeFilter:b,addTask:u,changeChecked:m,removeTodoList:s,changeTaskTitle:f,changeTitleTodoList:O,demo:a})))})))):i.a.createElement(Tt.a,{to:"/login"})},pt=a(236),ht=a(235),jt=i.a.forwardRef((function(t,e){return i.a.createElement(ht.a,Object.assign({elevation:6,ref:e,variant:"filled"},t))}));function kt(){var t=Object(h.c)((function(t){return t.app.error})),e=Object(h.b)(),a=function(t,a){"clickaway"!==a&&e(M(null))};return i.a.createElement(pt.a,{open:null!==t,autoHideDuration:6e3,onClose:a},i.a.createElement(jt,{onClose:a,severity:"error",sx:{width:"100%"}},t))}var vt=a(241),St=a(245),It=a(244),Lt=a(226),yt=a(122),Ct=function(){var t=Object(h.b)(),e=Object(h.c)((function(t){return t.auth.isLoggedIn})),a=Object(yt.a)({initialValues:{email:"",password:"",rememberMe:!1},validate:function(t){var e={};return t.email?/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(t.email)||(e.email="Invalid email address"):e.email="Required",t.password?t.password.length<3&&(e.password="Should be more symbols"):e.password="Required",e},onSubmit:function(e){var n;a.resetForm(),t((n=e,function(t){t(_("loading")),P(n).then((function(e){e.data.resultCode===r.Ok?(t(H(!0)),t(_("succeeded"))):F(e.data,t)})).catch((function(e){U(e,t)}))}))}});return e?i.a.createElement(Tt.a,{to:"/"}):i.a.createElement(it.a,{container:!0,justifyContent:"center"},i.a.createElement(it.a,{item:!0,justifyContent:"center"},i.a.createElement(vt.a,null,i.a.createElement("form",{onSubmit:a.handleSubmit},i.a.createElement(Lt.a,null,i.a.createElement("p",null,"To log in get registered",i.a.createElement("a",{href:"https://social-network.samuraijs.com/",target:"_blank"}," ","here")),i.a.createElement("p",null,"or use common test account credentials:"),i.a.createElement("p",null,"Email: free@samuraijs.com"),i.a.createElement("p",null,"Password: free")),i.a.createElement(It.a,null,i.a.createElement(rt.a,Object.assign({label:"Email",margin:"normal"},a.getFieldProps("email"))),a.touched.email&&a.errors.email?i.a.createElement("div",{style:{color:"red"}},a.errors.email):null,i.a.createElement(rt.a,Object.assign({type:"password",label:"Password",margin:"normal"},a.getFieldProps("password"))),a.touched.password&&a.errors.password?i.a.createElement("div",{style:{color:"red"}},a.errors.password):null,i.a.createElement(St.a,{label:"Remember me",control:i.a.createElement(mt.a,a.getFieldProps("rememberMe")),checked:a.values.rememberMe}),i.a.createElement(O.a,{type:"submit",variant:"contained",color:"primary"},"Login"))))))};var At=function(t){var e=t.demo,a=void 0!==e&&e,o=Object(h.c)((function(t){return t.app.status})),c=Object(h.c)((function(t){return t.app.isInitialized})),r=Object(h.c)((function(t){return t.auth.isLoggedIn})),l=Object(h.b)();Object(n.useEffect)((function(){l((function(t){R().then((function(e){0===e.data.resultCode&&t(H(!0))})).finally((function(){t({type:"APP/SET-INITIALIZED",isInitialized:!0})}))}))}),[]);var s=Object(n.useCallback)((function(){l((function(t){t(_("loading")),x().then((function(e){0===e.data.resultCode?(t(H(!1)),t(_("succeeded"))):F(e.data,t)})).catch((function(e){U(e,t)}))}))}),[l]);return c?i.a.createElement("div",{className:"App"},i.a.createElement(kt,null),i.a.createElement(u.a,{position:"static"},i.a.createElement(f.a,null,i.a.createElement(m.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2}},i.a.createElement(p.a,null)),i.a.createElement(b.a,{variant:"h6",component:"div",sx:{flexGrow:1}},"News"),r&&i.a.createElement(O.a,{color:"inherit",onClick:s},"Log out")),"loading"===o&&i.a.createElement(E.a,{color:"success"})),i.a.createElement(T.a,{fixed:!0},i.a.createElement(Tt.d,null,i.a.createElement(Tt.b,{path:"/",element:i.a.createElement(gt,{demo:a})}),i.a.createElement(Tt.b,{path:"/login",element:i.a.createElement(Ct,null)}),i.a.createElement(Tt.b,{path:"/404",element:i.a.createElement("h1",null,"404: PAGE NOT FOUND")}),i.a.createElement(Tt.b,{path:"*",element:i.a.createElement(Tt.a,{to:"/404"})})))):i.a.createElement("div",{style:{position:"fixed",top:"30%",width:"100%",textAlign:"center"}},i.a.createElement(d.a,null))},wt=a(69),Dt=a(121),Nt=(window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||wt.c,Object(wt.b)({todolist:V,tasks:$,app:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:K,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"APP/SET-STATUS":return Object(k.a)(Object(k.a)({},t),{},{status:e.status});case"APP/SET-ERROR":return Object(k.a)(Object(k.a)({},t),{},{error:e.error});case"APP/SET-INITIALIZED":return Object(k.a)(Object(k.a)({},t),{},{isInitialized:e.isInitialized});default:return t}},auth:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:G,e=arguments.length>1?arguments[1]:void 0;switch(e.type){case"login/SET-IS-LOGGED-IN":return Object(k.a)(Object(k.a)({},t),{},{isLoggedIn:e.isLoggedIn});default:return t}}})),Pt=Object(wt.d)(Nt,Object(wt.a)(Dt.a));window.store=Pt;a(43);var Rt=a(60);c.a.render(i.a.createElement(h.a,{store:Pt},i.a.createElement(Rt.a,null,i.a.createElement(At,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},84:function(t,e,a){}},[[134,1,2]]]);
//# sourceMappingURL=main.737addb4.chunk.js.map