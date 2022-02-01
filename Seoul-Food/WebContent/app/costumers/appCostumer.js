
const RestaurantList = {template: '<reslist></reslist>'}
const MyProfile = {template : '<myprofile></myprofile>'}
const RestaurantPage = {template: '<restpage></restpage>'}
const ShoppingCart = {template: '<cart></cart>'} 
const OrdersPage = {template: '<orders></orders>'}
const StarRating = {template: '<star-rating></star-rating>'}



const router = new VueRouter({

    mode: 'hash',
    routes:[
        {path: '/', component: RestaurantList},
        {path: '/myprofile', component: MyProfile},
		{path: '/restpage/:id', component: RestaurantPage},
        {path: '/cart', component : ShoppingCart},
		{path: '/orders', component : OrdersPage},   
    ]
})

var appCostumer = new Vue({
    router,
    el:'#appCostumer',
    data:{
       
    }
 


});