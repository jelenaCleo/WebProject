Vue.component("rest-orders",{
    data() {
		return {
			orders: [],
            isVisible: false,

		}
	},

    template: `
    	<div>
            <div class="box-shadow mt-3 px-4 py-4">
                <div class="border-bottoms">
                    <p class="fw-bold fs-15">Porudžbine</p>
                </div>
                <!-- novo -->
                <div  v-for="o in orders" >
        
                    <div class="mt-3 d-flex border-bottom align-items-center justify-content-between">
                         <a  v-on:click="orderDetails" > 
                            <div class="d-flex align-items-center">
                            
                                <div class="ms-3">
                                
                                    <p class="product-name"> Porudzbina: {{o.id}}</p>
                                    <p class="product-price">{{o.price}} din</p>
                                    <label>Kupac: {{o.name}} {{o.surname}}</label>
                                </div>
                            
                            </div>
                        </a>    
                            <div class="d-flex align-items-center">
                            <p class="product-price" style="margin-right:50px">Status : {{o.status}}    </p> 
                            <p class="product-price">  Datum : {{o.oderDate}} </p>  
                            </div>
                        <button type="button" v-if="o.status == 'OBRADA' " @click="changeStatusPrepared(o)"  class="btn btn-success btn-sm">->U pripremi</button>
                        <button type="button" v-if="o.status == 'U_PRIPREMI' " @click="changeStatusWaiting(o)"  class="btn btn-success btn-sm">->Čeka dostavu</button>
                        <button type="button" v-if="o.status == 'CEKA_DOSTAVU' " class="btn btn-success btn-sm" disabled>->Čeka dostavu</button>
                    </div>

                    <div class="mt-3 d-flex border-bottom align-items-center justify-content-between">
                        <div  id="orderDetailsDiv" style="display:none;">
                            <p>OVDJE DETALJI</p>
                           
                        </div>
                    </div>
                        
                </div>
                
            </div>

            	 
        </div>
    `
    ,
    mounted() {
		axios.get('rest/orders/restaurantOrders') 
			.then(response =>{
				this.orders = response.data;
            }).catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            });
	},
    methods: {
    	
    	changeStatusWaiting: function(order){
            axios.put('rest/orders/statusWaiting/' + order.restID + '/' + order.id) 
			.then(response =>{
				this.orders = response.data;
            }).catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            });
        },
        changeStatusPrepared: function(order){
            axios.put('rest/orders/statusPrepared/' + order.restID + '/' + order.id) 
			.then(response =>{
				this.orders = response.data;
            }).catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            });
        },
        orderDetails: function(){
            if(this.isVisible){
                document.getElementById("orderDetailsDiv").style.display = "none";
                this.isVisible = false;
                console.log('true  to false');
            }else{
                document.getElementById("orderDetailsDiv").style.display = "block";
                this.isVisible = true;
                console.log('false  to true');
            }
        }

    },
});