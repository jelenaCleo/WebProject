const RestaurantPage = {template: '<manager-rest-page></manager-rest-page>'}
const ManagerProfil = { template: '<manager-profil></manager-profil>' }
const ShowArticle = { template: '<show-article></show-article>' }
const AddItem = { template: '<add-item></add-item>' }
const Buyers = { template: '<rest-buyers></rest-buyers>' }
const Orders = { template: '<rest-orders></rest-orders>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: RestaurantPage},
	    { path: '/managerProfil', component: ManagerProfil},
	    { path: '/addIthem/:id', component: AddItem},
		{ path: '/:id/article/:name', component: ShowArticle},
		{ path: '/orders', component: Orders},
		{ path: '/buyers', component: Buyers},
	  ]
});


var adminApp = new Vue({
	router,
    el: '#managerPage'
});