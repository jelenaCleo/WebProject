Vue.component("dm-order-view",{
	
	data:function(){
		return{
			orderDTO: {},
            orders: []
		}
	},
	
	template:
	`
	<div  >
    
        <!-- section 2 -->
        <section class="container help mt-5">
           
			<h3 class="fw-bold fs-20" >Porudzbina  {{orderDTO.order.ID}}</h3>
            <div class="box-shadow mt-3 px-4 py-4">
                <div class="border-bottoms">
                    <p class="fw-bold fs-15">Artikli</p>
                </div>
                

                <!-- novo -->
                <div  v-for="a in this.orderDTO.order.articles" >
               
                    <div class="mt-3 d-flex border-bottom align-items-center justify-content-between">
						<div class="d-flex align-items-center">
							<img v-bind:src="a.article.image"  class="item-picture" alt="menu item picture">
							<div class="ms-3">
								<p class="product-name">{{a.article.name}}</p>
								<p class="product-price">Cena po komadu: {{a.article.price}} din</p>
								<p class="product-price">Kolicina: {{a.count}} </p>
							</div>
							
							<div>
								<p style="margin-right:30px;" class="product-name">Tip:{{a.article.type | formatType }}</p>
								<p class="product-price"> {{a.article.quantity}} {{a.article.measure}}</p>
								
							</div>
							<div>
							<p class="product-price">Opis: {{a.article.description}} </p>
							</div>
						</div>
                    </div>
                </div>

                <!-- novo -->
         
        
   			</div>
   			 </section>
	  
		<section class="container help mt-5">
           
			
            <div class="box-shadow mt-3 px-4 py-4">
				<div class="border-bottom working">
					<label style="padding: 5px;margin-bottom: 5px;" class=" fs-15"  >Kupac: {{orderDTO.order.name}} {{orderDTO.order.surname}} </label>
				</div>
				<div class="border-bottom working">
					<label style="padding: 5px;margin-bottom: 5px;" class=" fs-15"  >Cena: {{orderDTO.order.price}} </label>
				</div>
				<div class="border-bottom working">
					<label style="padding: 5px;margin-bottom: 5px;" class=" fs-15"  > Datum porudzbine: {{orderDTO.order.oderDate}} </label>
				</div>
				<div class="border-bottom working">
					<label style="padding: 5px;margin-bottom: 5px;" class=" fs-15"  > Status: {{orderDTO.order.status}} </label>
				</div>


                <div class="border-bottom working">
					<label style="padding: 5px;margin-bottom: 5px;" class=" fs-15"  >Restoran: {{orderDTO.rest.name}}  </label>
				</div>
				<div class="border-bottom working">
					<label style="padding: 5px;margin-bottom: 5px;" class=" fs-15"  >Tip restorana: {{orderDTO.rest.restaurantType}} </label>
				</div>
				<div class="border-bottom working">
					<label style="padding: 5px;margin-bottom: 5px;" class=" fs-15"  > Adresa: {{orderDTO.rest.location.address.street}} {{orderDTO.rest.location.address.city}}  {{orderDTO.rest.location.address.zipCode}}  </label>
				</div>
        
   			</div>
        </section>
    </div>
	
	`,
	mounted(){
		var path = location.href;
		var restID = path.split('/order/')[1];
		/**What is %20 in the url?
		URL-encoding from %00 to %8f
		ASCII -	URL-encode
		space -	  %20 
		*/
		console.log("DUG JE PUT: " + path +"\n" + restID);
		var id = restID.replace('%20', ' ');
		console.log("id koji trazm:"+ id);
		
		
		axios.get('rest/orders/oneOrder/' + id) 
			.then(response =>{
				this.orderDTO = response.data;
                
            }).catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            });

            
			
	},
	methods:{
	changeStatusWaiting: function(){
            axios.put('rest/orders/statusWaiting/' + this.order.restID + '/' + this.order.id) 
			.then(response =>{
				this.orders = response.data;
				this.updateOrder();
            }).catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            });
        },
        changeStatusPrepared: function(){
            axios.put('rest/orders/statusPrepared/' + this.order.restID + '/' + this.order.id) 
			.then(response =>{
				this.orders = response.data;
				this.updateOrder();
            }).catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            });
        },
		updateOrder: function(){
			for(o in this.orders ){
				if(this.order.id == o.id){
					this.order = o;
					console.log('new order');
					console.log(this.order);
				}
			}
		}
		
	},
	filters : {
		formatType  : function(value){
			if(value == 0){
				return "Hrana";
			}
			if(value == 1){
				return "Piće";
			}
		}
	}
	
	
	
});