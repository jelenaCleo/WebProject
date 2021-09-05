const RestaurantPage = {template: '<manager-rest-page></manager-rest-page>'}
const ManagerProfil = { template: '<manager-profil></manager-profil>' }
const AddIthem = { template: '<add-ithem></add-ithem>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: RestaurantPage},
	    { path: '/managerProfil', component: ManagerProfil},
	    { path: '/addIthem/:id', component: AddIthem},
	  ]
});


var adminApp = new Vue({
	router,
    el: '#managerPage'
});