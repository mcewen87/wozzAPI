(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{376:function(t,e,n){"use strict";n.r(e);n(34),n(3);var a=n(64),r=n.n(a),o=(n(113),n(0)),s=n.n(o),c=n(63),i=n(90),u=n(359),p=n.n(u),l=n(377),h=n.n(l);function d(t,e,n,a,r,o,s){try{var c=t[o](s),i=c.value}catch(u){return void n(u)}c.done?e(i):Promise.resolve(i).then(a,r)}function m(t){return function(){var e=this,n=arguments;return new Promise((function(a,r){var o=t.apply(e,n);function s(t){d(o,a,r,s,c,"next",t)}function c(t){d(o,a,r,s,c,"throw",t)}s(void 0)}))}}var f=function(t){var e,n;function a(){for(var e,n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];return(e=t.call.apply(t,[this].concat(a))||this).state={email:"",password:"",isError:!1},e.handleEmail=function(t){e.setState({email:t.target.value})},e.handlePassword=function(t){e.setState({password:t.target.value})},e.userSignIn=function(){var t=m(r.a.mark((function t(n,a){var o,s;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://stormy-basin-80765.herokuapp.com/getToken",{mode:"cors",cache:"no-cache",credentials:"include",headers:{"content-type":"application/json"},method:"GET"});case 2:return o=p.a.get("XSRF-TOKEN"),t.next=5,fetch("https://stormy-basin-80765.herokuapp.com/signIn",{body:JSON.stringify({email:n,password:a}),mode:"cors",cache:"no-cache",credentials:"include",headers:{"content-type":"application/json","csrf-token":o},method:"POST"}).catch((function(t){return e.setState({isError:!0})}));case 5:(s=t.sent).ok?(console.log(s.ok),s.json().then((function(t){console.log(t),e.props.changeAuth(t.authStatus),e.setState({email:"",password:"",isError:!1})}))):e.setState({isError:!0});case 7:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),e.userSignUp=function(){var t=m(r.a.mark((function t(n,a){var o,s;return r.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("https://stormy-basin-80765.herokuapp.com/getToken",{mode:"cors",cache:"no-cache",credentials:"include",headers:{"content-type":"application/json"},method:"GET"});case 2:return o=p.a.get("XSRF-TOKEN"),t.next=5,fetch("https://stormy-basin-80765.herokuapp.com/signUp",{body:JSON.stringify({email:n,password:a}),mode:"cors",cache:"no-cache",credentials:"include",headers:{"content-type":"application/json","csrf-token":o},method:"POST"}).catch((function(t){return e.setState({isError:!0})}));case 5:(s=t.sent).ok?(console.log(s.ok),s.json().then((function(t){console.log(t),e.props.changeAuth(t.authStatus),e.setState({email:"",password:"",isError:!1})}))):e.setState({isError:!0});case 7:case"end":return t.stop()}}),t)})));return function(e,n){return t.apply(this,arguments)}}(),e}return n=t,(e=a).prototype=Object.create(n.prototype),e.prototype.constructor=e,e.__proto__=n,a.prototype.render=function(){var t=this;return s.a.createElement("div",{className:h.a.authBox},s.a.createElement("div",{className:h.a.innerBox},this.state.isError&&s.a.createElement("p",{className:h.a.errorMessage},"Oops, something went wrong."),s.a.createElement("input",{className:"",placeholder:"Email",type:"text",value:this.state.email,onChange:this.handleEmail}),s.a.createElement("input",{className:"",placeholder:"Password",type:"password",value:this.state.password,onChange:this.handlePassword}),s.a.createElement("div",{className:h.a.buttons},s.a.createElement("button",{onClick:function(){t.userSignIn(t.state.email,t.state.password)}},"Sign In"),s.a.createElement("button",{onClick:function(){t.userSignUp(t.state.email,t.state.password)}},"Sing Up"),s.a.createElement("button",{onClick:function(){alert("Click Em")}},"Sing Out"),s.a.createElement("button",{onClick:function(){alert("auth")}},"Check Auth"))))},a}(o.Component);e.default=Object(c.b)((function(t){return{isAuthed:t.authStatus}}),{changeAuth:i.a})(f)}}]);
//# sourceMappingURL=component---src-pages-user-auth-js-5f84f8246d6f03d4b1b3.js.map