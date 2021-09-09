const DmOrders = {template: '<dmOrders-page></dmOrders-page>'}
const dmProfil = { template: '<dm-profil></dm-profil>' }
const OrderView = { template: '<dm-order-view></dm-order-view>' }

const router = new VueRouter({
	  mode: 'hash',
	  routes: [
	    { path: '/', component: DmOrders},
	    { path: '/dmProfil', component: dmProfil},
		{ path: '/order/:id', component: OrderView},
	   
	  ]
});


var adminApp = new Vue({
	router,
    el: '#dmPage'
});