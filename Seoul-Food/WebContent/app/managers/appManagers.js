const RestaurantPage = {template: '<manager-rest-page></manager-rest-page>'}
const ManagerProfil = { template: '<manager-profil></manager-profil>' }
const ShowArticle = { template: '<show-article></show-article>' }
const AddItem = { template: '<add-item></add-item>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: RestaurantPage},
	    { path: '/managerProfil', component: ManagerProfil},
	    { path: '/addIthem/:id', component: AddItem},
		{ path: '/:id/article/:name', component: ShowArticle},
	  ]
});


var adminApp = new Vue({
	router,
    el: '#managerPage'
});