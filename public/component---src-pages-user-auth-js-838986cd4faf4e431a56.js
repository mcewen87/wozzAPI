(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{376:function(e,t,n){"use strict";n.r(t);n(34),n(3);var a=n(64),o=n.n(a),r=(n(113),n(0)),s=n.n(r),c=n(63),i=n(90),u=n(359),p=n.n(u),l=n(377),h=n.n(l);function d(e,t,n,a,o,r,s){try{var c=e[r](s),i=c.value}catch(u){return void n(u)}c.done?t(i):Promise.resolve(i).then(a,o)}function m(e){return function(){var t=this,n=arguments;return new Promise((function(a,o){var r=e.apply(t,n);function s(e){d(r,a,o,s,c,"next",e)}function c(e){d(r,a,o,s,c,"throw",e)}s(void 0)}))}}var f=function(e){var t,n;function a(){for(var t,n=arguments.length,a=new Array(n),r=0;r<n;r++)a[r]=arguments[r];return(t=e.call.apply(e,[this].concat(a))||this).state={email:"",password:"",isError:!1},t.handleEmail=function(e){t.setState({email:e.target.value})},t.handlePassword=function(e){t.setState({password:e.target.value})},t.userSignIn=function(){var e=m(o.a.mark((function e(n,a){var r,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://wozz.herokuapp.com/getToken",{mode:"cors",cache:"no-cache",credentials:"include",headers:{"content-type":"application/json"},method:"GET"});case 2:return r=p.a.get("XSRF-TOKEN"),e.next=5,fetch("https://wozz.herokuapp.com/signIn",{body:JSON.stringify({email:n,password:a}),mode:"cors",cache:"no-cache",credentials:"include",headers:{"content-type":"application/json","csrf-token":r},method:"POST"}).catch((function(e){return t.setState({isError:!0})}));case 5:(s=e.sent).ok?(console.log(s.ok),s.json().then((function(e){console.log(e),t.props.changeAuth(e.authStatus),t.setState({email:"",password:"",isError:!1})}))):t.setState({isError:!0});case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),t.userSignUp=function(){var e=m(o.a.mark((function e(n,a){var r,s;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://wozz.herokuapp.com/getToken",{mode:"cors",cache:"no-cache",credentials:"include",headers:{"content-type":"application/json"},method:"GET"});case 2:return r=p.a.get("XSRF-TOKEN"),e.next=5,fetch("https://wozz.herokuapp.com/signUp",{body:JSON.stringify({email:n,password:a}),mode:"cors",cache:"no-cache",credentials:"include",headers:{"content-type":"application/json","csrf-token":r},method:"POST"}).catch((function(e){return t.setState({isError:!0})}));case 5:(s=e.sent).ok?(console.log(s.ok),s.json().then((function(e){console.log(e),t.props.changeAuth(e.authStatus),t.setState({email:"",password:"",isError:!1})}))):t.setState({isError:!0});case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),t}return n=e,(t=a).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,a.prototype.render=function(){var e=this;return s.a.createElement("div",{className:h.a.authBox},s.a.createElement("div",{className:h.a.innerBox},this.state.isError&&s.a.createElement("p",{className:h.a.errorMessage},"Oops, something went wrong."),s.a.createElement("input",{className:"",placeholder:"Email",type:"text",value:this.state.email,onChange:this.handleEmail}),s.a.createElement("input",{className:"",placeholder:"Password",type:"password",value:this.state.password,onChange:this.handlePassword}),s.a.createElement("div",{className:h.a.buttons},s.a.createElement("button",{onClick:function(){e.userSignIn(e.state.email,e.state.password)}},"Sign In"),s.a.createElement("button",{onClick:function(){e.userSignUp(e.state.email,e.state.password)}},"Sing Up"),s.a.createElement("button",{onClick:function(){alert("Click Em")}},"Sing Out"),s.a.createElement("button",{onClick:function(){alert("auth")}},"Check Auth"))))},a}(r.Component);t.default=Object(c.b)((function(e){return{isAuthed:e.authStatus}}),{changeAuth:i.a})(f)}}]);
//# sourceMappingURL=component---src-pages-user-auth-js-838986cd4faf4e431a56.js.map