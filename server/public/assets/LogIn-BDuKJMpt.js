import{r as v,b as w,j as e,ap as y,aq as f,L as c,E as d,ar as C,e as L,B as m,W as k,X as x,Y as n,V as g}from"./index-CbfT30fd.js";import{t as s}from"./lottie-Cspzgxa9.js";import{i as F}from"./yara-CqPg568o.js";const E=()=>{const[t,h]=v.useState({emailOrMobile:"",password:""}),p=w(),i=r=>{const{name:o,value:l}=r.target;h(a=>({...a,[o]:l}))},u=async r=>{var o,l;r.preventDefault();try{const a=await L.post("/api/login",t,{withCredentials:!0}),{userType:j,irctc:N}=a.data;localStorage.setItem("userType",j),localStorage.setItem("irctc",N),m.success("Login successful!"),p("/")}catch(a){m.error(((l=(o=a.response)==null?void 0:o.data)==null?void 0:l.message)||"Login failed. Please check your credentials.")}},b=()=>{window.location.href="/api/auth/google"};return e.jsxs(s,{onSubmit:u,children:[e.jsxs(s.Group,{className:"mb-3",children:[e.jsxs(s.Label,{children:[e.jsx(y,{className:"me-2"}),"Email or Mobile"]}),e.jsx(s.Control,{type:"text",name:"emailOrMobile",value:t.emailOrMobile,onChange:i,required:!0,placeholder:"Enter email or mobile"})]}),e.jsxs(s.Group,{className:"mb-3",children:[e.jsxs(s.Label,{children:[e.jsx(f,{className:"me-2"}),"Password"]}),e.jsx(s.Control,{type:"password",name:"password",value:t.password,onChange:i,required:!0,placeholder:"Enter password"})]}),e.jsx("div",{className:"text-end mb-3",children:e.jsx(c,{to:"/forgot-password",className:"text-decoration-none",children:"Forgot password?"})}),e.jsx(d,{variant:"primary",type:"submit",className:"w-100 mb-3",children:"Log in"}),e.jsxs(d,{variant:"outline-primary",type:"button",className:"w-100 mb-3",onClick:b,children:[e.jsx(C,{className:"me-2"}),"Continue with Google"]}),e.jsxs("p",{className:"text-center mb-0",children:["Don't have an account?"," ",e.jsx(c,{to:"/register",className:"text-decoration-none",children:"Register now"})]})]})},D=()=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"ball-effect",children:[e.jsx("div",{className:"ball b1"}),e.jsx("div",{className:"ball b2"}),e.jsx("div",{className:"ball b3"}),e.jsx("div",{className:"ball b4"}),e.jsx("div",{className:"ball b5"})]}),e.jsx(k,{fluid:!0,className:"py-5",children:e.jsx(x,{className:"justify-content-center align-items-center",children:e.jsx(n,{lg:8,xxl:7,className:"px-lg-5",children:e.jsx(g,{className:"overflow-hidden border-0 shadow-lg",children:e.jsxs(x,{className:"g-0",children:[e.jsx(n,{lg:6,className:"d-none d-lg-block login-image-container",children:e.jsxs("div",{className:"login-image",style:{position:"relative",height:"100%"},children:[e.jsx("div",{className:"overlay",style:{position:"absolute",top:0,left:0,right:0,bottom:0,zIndex:1}}),e.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,backgroundImage:`url(${F})`,backgroundSize:"cover",backgroundPosition:"center",zIndex:0}})]})}),e.jsx(n,{lg:6,children:e.jsx(g.Body,{className:"p-4 p-lg-5",children:e.jsx(E,{})})})]})})})})})]});export{D as default};