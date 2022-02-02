const AdminAllRestaurants = { template: '<admin-all-restaurants></admin-all-restaurants>' }
const AdminAllUsers = { template: '<admin-all-users></admin-all-users>' }
const AdminProfil = { template: '<admin-profil></admin-profil>' }
const CreateUser = {template: '<create-user></create-user>'}
const CreateRestaurant = {template: '<create-restaurant></create-restaurant>'}
const RestaurantPage = {template: '<admin-rest-page></admin-rest-page>'}
const CommentsPage = {template: '<admin-comments></admin-comments>'}

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: AdminAllRestaurants},
	    { path: '/allUsers', component: AdminAllUsers},
	    { path: '/adminProfil', component: AdminProfil },
		{ path: '/createRestaurant', component: CreateRestaurant},
		{ path: '/createUser', component: CreateUser},
		{path: '/admin-rest-page/:id', component: RestaurantPage},
		{ path: '/comments', component: CommentsPage},
	
	  ]
});


var adminApp = new Vue({
	router,
    el: '#adminPage'
});