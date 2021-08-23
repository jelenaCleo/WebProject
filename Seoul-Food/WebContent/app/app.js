const Jelena = {template: '<jelena></jelena>'}
const x1 = {template: '<x1></x1>'}



const router = new VueRouter({

    mode: 'hash',
    routes:[
        {path: '/', component : Jelena},
        {path: '/x', component:x1}
       
    ]

});



var app = new Vue({
    router,
    el:'#app',
    data:{
        test: 'test-1-2',
    }
    
    



});