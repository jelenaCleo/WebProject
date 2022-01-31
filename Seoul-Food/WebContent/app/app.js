const LoginComponent = { template: '<login></login>' }
const xComponent = { template: '<x></x>' }
const RegisterComponent = {template: '<register></register>'}
const HomePageComponent = {template: '<homepage></homepage>'}


const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: HomePageComponent},
	    { path: '/x', component: xComponent },
		{ path: '/login', component: LoginComponent},
	
	
	  ]
});

var app = new Vue({
	router,
	el: '#application',
	
});

