const LoginComponent = { template: '<login></login>' }
const xComponent = { template: '<x></x>' }
const RegisterComponent = {template: '<register></register>'}


const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: LoginComponent},
	    { path: '/x', component: xComponent },
		{ path: '/register', component: RegisterComponent},
	
	
	  ]
});

var app = new Vue({
	router,
	el: '#application',
	
});

