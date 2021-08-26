const AdminAllRestaurants = { template: '<admin-all-restaurants></admin-all-restaurants>' }
const AdminAllUsers = { template: '<admin-all-users></admin-all-users>' }
const AdminProfil = { template: '<admin-profil></admin-profil>' }
const CreateUser = {template: '<create-user></create-user>'}
const CreateRestaurant = {template: '<create-restaurant></create-restaurant>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: AdminAllRestaurants},
	    { path: '/allUsers', component: AdminAllUsers},
	    { path: '/adminProfil', component: AdminProfil },
		{ path: '/createRestaurant', component: CreateRestaurant},
		{ path: '/createUser', component: CreateUser},
	
	  ]
});


var adminApp = new Vue({
	router,
    el: '#adminPage'
});