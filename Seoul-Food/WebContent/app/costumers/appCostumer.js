
const RestaurantList = {template: '<reslist></reslist>'}
const MyProfile = {template : '<myprofile></myprofile>'}



const router = new VueRouter({

    mode: 'hash',
    routes:[
        {path: '/', component: RestaurantList},
        {path: '/myprofile', component: MyProfile},
        
    ]


})

var appCostumer = new Vue({
    router,
    el:'#appCostumer',
    data:{
        test: '1-2-3 test'
    }



});