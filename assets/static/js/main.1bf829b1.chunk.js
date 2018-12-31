(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{30:function(e,t,a){e.exports=a(44)},35:function(e,t,a){},44:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(25),s=a.n(o),i=(a(35),a(5)),c=a(6),l=a(9),m=a(7),u=a(8),p=a(47),d=a(46),h=a(11),f=a(14),b=a(27),v={},g=a(15),w=function(e){return void 0===e||null===e||"object"===typeof e&&0===Object.keys(e).length||"string"===typeof e&&0===e.trim().length},E={isAuthenticated:!1,forgotPasswordEmailSent:!1,resetPasswordComplete:!1,user:{}},O=Object(f.c)({errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:v,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return t.payload;default:return e}},auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:E,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CURRENT_USER":return Object(g.a)({},e,{isAuthenticated:!w(t.payload),user:t.payload});case"FORGOT_PASSWORD_EMAIL_NOT_SENT":return Object(g.a)({},e,{forgotPasswordEmailSent:!1});case"FORGOT_PASSWORD_EMAIL_SENT":return Object(g.a)({},e,{forgotPasswordEmailSent:!0});case"RESET_PASSWORD_COMPLETE":return console.log("RESET_PASSWORD_COMPLETE ",t.payload),Object(g.a)({},e,{resetPasswordComplete:!0});default:return e}}}),y=Object(f.e)(O,{},Object(f.d)(Object(f.a)(b.a),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())),S=function(e){return e||"undefined"},j=a(17),k=a.n(j),N=function(e){return{type:"SET_CURRENT_USER",payload:e}},_=function(e){return function(t){localStorage.removeItem("jwtToken"),S(!1),t(N({})),e.push("/login")}};var C=a(45),R=a(48),T=function(e){function t(e){var a;return Object(i.a)(this,t),(a=Object(l.a)(this,Object(m.a)(t).call(this,e))).state={showDropdown:!1},a}return Object(u.a)(t,e),Object(c.a)(t,[{key:"showDropdown",value:function(e){e.preventDefault(),this.setState(function(e){return{showDropdown:!e.showDropdown}})}},{key:"onLogout",value:function(e){e.preventDefault(),this.props.logoutUser(this.props.history)}},{key:"render",value:function(){var e=this,t=this.props.auth,a=t.isAuthenticated,n=t.user,o=r.a.createElement("ul",{className:"navbar-nav ml-auto"},r.a.createElement("a",{href:"/",className:"nav-link",onClick:this.onLogout.bind(this)},r.a.createElement("img",{src:n.avatar,alt:n.name,title:n.name,className:"rounded-circle",style:{width:"25px",marginRight:"5px"}}),"Logout")),s=r.a.createElement("ul",{className:"navbar-nav ml-auto"},r.a.createElement("li",{className:"nav-item"},r.a.createElement(C.a,{className:"nav-link",to:"/register"},"Sign Up")),r.a.createElement("li",{className:"nav-item"},r.a.createElement(C.a,{className:"nav-link",to:"/login"},"Sign In")));return r.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-light"},r.a.createElement(C.a,{className:"navbar-brand",to:"/"},"Redux Node Auth"),r.a.createElement("button",{className:"navbar-toggler",type:"button","data-toggle":"collapse","data-target":"#navbarSupportedContent","aria-controls":"navbarSupportedContent","aria-expanded":"false","aria-label":"Toggle navigation",onClick:function(t){e.showDropdown(t)}},r.a.createElement("span",{className:"navbar-toggler-icon"})),r.a.createElement("div",{className:"collapse navbar-collapse ".concat(this.state.showDropdown?"show":""),id:"navbarSupportedContent"},a?o:s,r.a.createElement("form",{className:"form-inline my-2 my-lg-0"},r.a.createElement("input",{className:"form-control mr-sm-2",type:"search",placeholder:"Search","aria-label":"Search"}),r.a.createElement("button",{className:"btn btn-outline-success my-2 my-sm-0",type:"submit"},"Search"))))}}]),t}(n.Component),P=Object(h.b)(function(e){return{auth:e.auth}},{logoutUser:_})(Object(R.a)(T)),I=a(12),D=a(2),x=a(10),A=a.n(x),U=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(m.a)(t).call(this))).state={name:"",email:"",password:"",password_confirm:"",errors:{}},e.handleInputChange=e.handleInputChange.bind(Object(D.a)(Object(D.a)(e))),e.handleSubmit=e.handleSubmit.bind(Object(D.a)(Object(D.a)(e))),e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"handleInputChange",value:function(e){this.setState(Object(I.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){e.preventDefault();var t={name:this.state.name,email:this.state.email,password:this.state.password,password_confirm:this.state.password_confirm};this.props.registerUser(t,this.props.history)}},{key:"componentWillReceiveProps",value:function(e){e.auth.isAuthenticated&&this.props.history.push("/"),e.errors&&this.setState({errors:e.errors})}},{key:"componentDidMount",value:function(){this.props.auth.isAuthenticated&&this.props.history.push("/")}},{key:"render",value:function(){var e=this.state.errors;return r.a.createElement("div",{className:"container",style:{marginTop:"50px",width:"700px"}},r.a.createElement("h2",{style:{marginBottom:"40px"}},"Registration"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"text",placeholder:"Name",className:A()("form-control form-control-lg",{"is-invalid":e.name}),name:"name",onChange:this.handleInputChange,value:this.state.name}),e.name&&r.a.createElement("div",{className:"invalid-feedback"},e.name)),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"email",placeholder:"Email",className:A()("form-control form-control-lg",{"is-invalid":e.email}),name:"email",onChange:this.handleInputChange,value:this.state.email}),e.email&&r.a.createElement("div",{className:"invalid-feedback"},e.email)),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",placeholder:"Password",className:A()("form-control form-control-lg",{"is-invalid":e.password}),name:"password",onChange:this.handleInputChange,value:this.state.password}),e.password&&r.a.createElement("div",{className:"invalid-feedback"},e.password)),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",placeholder:"Confirm Password",className:A()("form-control form-control-lg",{"is-invalid":e.password_confirm}),name:"password_confirm",onChange:this.handleInputChange,value:this.state.password_confirm}),e.password_confirm&&r.a.createElement("div",{className:"invalid-feedback"},e.password_confirm)),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Register User"))))}}]),t}(n.Component),L=Object(h.b)(function(e){return{auth:e.auth,errors:e.errors}},{registerUser:function(e,t){return function(a){var n=new FormData;for(var r in e)n.append(r,e[r]);fetch("/api/v1/rest-auth/registration/",{method:"POST",body:n}).then(function(e){return t.push("/registration")}).catch(function(e){a({type:"GET_ERRORS",payload:e.response.data})})}}})(Object(R.a)(U)),W=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(m.a)(t).call(this))).state={username:"",password:"",errors:{}},e.handleInputChange=e.handleInputChange.bind(Object(D.a)(Object(D.a)(e))),e.handleSubmit=e.handleSubmit.bind(Object(D.a)(Object(D.a)(e))),e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.props.auth.isAuthenticated&&this.props.history.push("/")}},{key:"componentWillReceiveProps",value:function(e){e.auth.isAuthenticated&&this.props.history.push("/"),e.errors&&this.setState({errors:e.errors})}},{key:"handleInputChange",value:function(e){this.setState(Object(I.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){e.preventDefault();var t={username:this.state.username,password:this.state.password};this.props.loginUser(t)}},{key:"render",value:function(){var e=this.state.errors;return r.a.createElement("div",{className:"container",style:{marginTop:"50px",width:"700px"}},r.a.createElement("h2",{style:{marginBottom:"40px"}},"Login"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"username",placeholder:"Username",className:A()("form-control form-control-lg",{"is-invalid":e.username}),name:"username",onChange:this.handleInputChange,value:this.state.username}),e.username&&r.a.createElement("div",{className:"invalid-feedback"},e.username)),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",placeholder:"Password",className:A()("form-control form-control-lg",{"is-invalid":e.password}),name:"password",onChange:this.handleInputChange,value:this.state.password}),e.password&&r.a.createElement("div",{className:"invalid-feedback"},e.password)),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Login User"))),r.a.createElement(C.a,{className:"nav-link",to:"/forgotpassword"},"Forgot password?"))}}]),t}(n.Component),M=Object(h.b)(function(e){return{auth:e.auth,errors:e.errors}},{loginUser:function(e){return function(t){var a=new FormData;for(var n in e)a.append(n,e[n]);return fetch("/api/v1/rest-auth/login/",{method:"POST",body:a}).then(function(e){return e.json()}).then(function(e){return localStorage.setItem("jwtToken",e.key),S(e.key),t(N(e.key))}).catch(function(e){console.log("error ",e.message),t({type:"GET_ERRORS",payload:e.response.data})})}}})(W),F=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,"Home Component")}}]),t}(n.Component),G=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(m.a)(t).call(this))).state={email:"",errors:{}},e.handleInputChange=e.handleInputChange.bind(Object(D.a)(Object(D.a)(e))),e.handleSubmit=e.handleSubmit.bind(Object(D.a)(Object(D.a)(e))),e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.auth.isAuthenticated&&this.props.history.push("/"),e.errors&&this.setState({errors:e.errors})}},{key:"componentDidMount",value:function(){this.props.auth.isAuthenticated&&this.props.history.push("/"),this.props.forgotPasswordEmailNotSent()}},{key:"handleInputChange",value:function(e){this.setState(Object(I.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){e.preventDefault();var t={email:this.state.email};this.props.forgotPassword(t)}},{key:"render",value:function(){var e=this.state.errors;return r.a.createElement("div",{className:"container",style:{marginTop:"50px",width:"700px"}},r.a.createElement("h2",{style:{marginBottom:"40px"}},"Forgot password?"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"email",placeholder:"Email address",className:A()("form-control form-control-lg",{"is-invalid":e.email}),name:"email",onChange:this.handleInputChange,value:this.state.email}),e.email&&r.a.createElement("div",{className:"invalid-feedback"},e.email)),r.a.createElement("div",{className:"form-group"},r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Send me a password reset email"))),this.props.auth.forgotPasswordEmailSent&&r.a.createElement("div",{className:"feedback"},"An email has been sent to ",this.state.email))}}]),t}(n.Component),B=Object(h.b)(function(e){return{auth:e.auth,errors:e.errors}},{forgotPassword:function(e){return function(t){console.log("forgotPassword action creator. Email ",e);var a=new FormData;for(var n in e)a.append(n,e[n]);return fetch("/api/v1/rest-auth/password/reset/",{method:"POST",body:a}).then(function(e){return e.json()}).then(function(){return t({type:"FORGOT_PASSWORD_EMAIL_SENT"})}).catch(function(e){console.log("error ",e.message),t({type:"GET_ERRORS",payload:e.response.data})})}},forgotPasswordEmailNotSent:function(e){return{type:"FORGOT_PASSWORD_EMAIL_NOT_SENT"}}})(G),X=function(e){function t(){var e;return Object(i.a)(this,t),(e=Object(l.a)(this,Object(m.a)(t).call(this))).state={password:"",password_confirm:"",errors:{}},e.handleInputChange=e.handleInputChange.bind(Object(D.a)(Object(D.a)(e))),e.handleSubmit=e.handleSubmit.bind(Object(D.a)(Object(D.a)(e))),e}return Object(u.a)(t,e),Object(c.a)(t,[{key:"componentWillReceiveProps",value:function(e){e.auth.isAuthenticated&&this.props.history.push("/"),e.errors&&this.setState({errors:e.errors})}},{key:"componentDidMount",value:function(){this.props.auth.isAuthenticated&&this.props.history.push("/"),console.log("url params ",this.props.match.params)}},{key:"handleInputChange",value:function(e){this.setState(Object(I.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){e.preventDefault();var t={uid:this.props.match.params.uid,csrfmiddlewaretoken:this.props.match.params.token,password:this.state.password,password_confirm:this.state.password_confirm};this.props.resetPassword(t)}},{key:"getCookie",value:function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var a=document.cookie.split(";"),n=0;n<a.length;n++){var r=k.a.trim(a[n]);if(r.substring(0,e.length+1)===e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}return t}},{key:"render",value:function(){var e=this.state.errors,t=this.getCookie("csrftoken");return r.a.createElement("div",{className:"container",style:{marginTop:"50px",width:"700px"}},r.a.createElement("h2",{style:{marginBottom:"40px"}},"Enter a new password"),r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",placeholder:"Password",className:A()("form-control form-control-lg",{"is-invalid":e.password}),name:"password",onChange:this.handleInputChange,value:this.state.password}),e.password&&r.a.createElement("div",{className:"invalid-feedback"},e.password)),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"password",placeholder:"Confirm Password",className:A()("form-control form-control-lg",{"is-invalid":e.password_confirm}),name:"password_confirm",onChange:this.handleInputChange,value:this.state.password_confirm}),e.password_confirm&&r.a.createElement("div",{className:"invalid-feedback"},e.password_confirm)),r.a.createElement("div",{className:"form-group"},r.a.createElement("input",{type:"hidden",name:"csrfmiddlewaretoken",value:t}),r.a.createElement("button",{type:"submit",className:"btn btn-primary"},"Set new password"))),this.props.auth.forgotPasswordEmailSent&&r.a.createElement("div",{className:"feedback"},"An email has been sent to ",this.state.email))}}]),t}(n.Component),J=Object(h.b)(function(e){return{auth:e.auth,errors:e.errors}},{resetPassword:function(e){return function(t){console.log("resetPassword action creator. data ",e);var a="",n=function(e){var t=null;if(document.cookie&&""!==document.cookie)for(var a=document.cookie.split(";"),n=0;n<a.length;n++){var r=k.a.trim(a[n]);if(r.substring(0,e.length+1)===e+"="){t=decodeURIComponent(r.substring(e.length+1));break}}return t}("csrftoken");return a+="csrfmiddlewaretoken=".concat(n,"&"),a+="new_password1=".concat(e.password,"&"),a+="new_password2=".concat(e.password_confirm),console.log("token ",e.csrfmiddlewaretoken),console.log("body ",a),console.log("data.uid ",e.uid),fetch("/api/v1/reset1/".concat(e.uid,"/set-password/"),{credentials:"include",method:"POST",mode:"same-origin",headers:{Accept:"text/html,application/xhtml+xml,application/xml","Content-Type":"application/x-www-form-urlencoded","X-CSRFToken":n},body:a}).then(function(e){return e.json()}).then(function(e){return t(function(e){return{type:"RESET_PASSWORD_COMPLETE",token:e}}(e))}).catch(function(e){console.log("error ",e.message),t({type:"GET_ERRORS",payload:e.response.data})})}}})(X);a(42);if(localStorage.jwtToken){S(localStorage.jwtToken),y.dispatch(N(localStorage.jwtToken));var V=Date.now()/1e3;localStorage.jwtToken.exp<V&&(y.dispatch(_()),window.location.href="/login")}var H=function(e){function t(){return Object(i.a)(this,t),Object(l.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return r.a.createElement(h.a,{store:y},r.a.createElement(p.a,null,r.a.createElement("div",null,r.a.createElement(P,null),r.a.createElement(d.a,{exact:!0,path:"/",component:F}),r.a.createElement("div",{className:"container"},r.a.createElement(d.a,{exact:!0,path:"/register",component:L}),r.a.createElement(d.a,{exact:!0,path:"/login",component:M}),r.a.createElement(d.a,{exact:!0,path:"/forgotpassword",component:B}),r.a.createElement(d.a,{path:"/reset/:uid?/:token?",component:J})))))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(H,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[30,2,1]]]);
//# sourceMappingURL=main.1bf829b1.chunk.js.map