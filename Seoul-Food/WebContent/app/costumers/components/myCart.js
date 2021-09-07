Vue.component("cart",{

		data:function(){
			return{

				cartItems: {},
				isLoaded: false,
               

			}
		},

		template:
			`
	<div v-if="isLoaded">
			<link rel="stylesheet" href="css/users/myCart.css">
			<section>
            <div class="main-banner d-flex align-items-center  text-center">
                <div class="container">
                    <h2 class="text-white">Vaša korpa za kupovinu</h2>
                </div>
                <span id="black-overlay"></span>
            </div>
        </section>


        <section class="container">
         




     
            <div v-for="item in cartItems"  class="cart-item py-3">
                <div class="row align-items-center">
                    <div class="col-4 d-flex align-items-center">
                        <div class="quantity-field">
                            <button class="value-button decrease-button" v-on:click="decreaseValue(item)"
                                title="Azalt">-</button>
                            <input class="number" v-model="item.count" >
                            <button class="value-button increase-button" v-on:click="increaseValue(item)"
                                title="Arrtır">+
                            </button>
                        </div>

                        <img src="assets/imgs/default-placeholder.png" class="cart-logo"
                            alt="assets/imgs/cart-meal.jpg">
                    </div>
                    <div class="col-8">
                        <div class="d-flex justify-content-around align-items-center">
                            <div>
                                <p class="restourant-name ">{{item.article.name}}</p>
                                <span class="restourant-price">{{item.article.price}} RSD</span>
                            </div>
                            <div v-if="isLoaded" class="restourant-mark">

                                <span>{{singleTotal(item)}} RSD</span>
                            </div>
                        </div>
                    </div>
                    <div class="my-2">
                        <hr>
                    </div>


                </div>
            </div>

            <div class="total-price mt-5">
                <p class="mb-0 fw-bold">Ukupno za uplatu: </p>
                <p class="mb-0 ms-1">{{total()}}</p>
                <p class="mb-0 ms-1">RSD</p>
            </div>
            <div class="text-end">
                <button v-on:click="createOrder" type="button" class="btn btn-primary fw-600 mt-3"><i class="fas fa-shopping-basket"></i>
                    Poruči</button>
            </div>


        </section>




        <footer class="mt-5">
            <hr>
            <div class="container">
                <p class="text-center text-muted">© 2021 Maja & Jelena . Projekat iz WEB programiranja</p>
            </div>
        </footer>	
				


	</div>
			`

		,  
		mounted() {
			axios
            .get('rest/cart/')
            .then(response => { 
							this.cartItems = response.data
							this.isLoaded = true;
							
								if(this.cartItems != null){
								
								console.log ("chart items: " + this.cartItems)
								}
							})
		
		},
        methods:{
            decreaseValue:function(item){
               return item.count -=1;

            },
            increaseValue:function(item){
                 return item.count += 1;

            },
            
			singleTotal:function(item){

                return  parseFloat(item.article.price) * item.count
            },
			total:function(){
				let t= 0.0;
			 	for (let i = 0; i < this.cartItems.length; i++) {
					
				
				t += parseFloat(this.cartItems[i].article.price) * this.cartItems[i].count;
				}
				
				return t;
			},
			createOrder:function(){
				
				
				 const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
				 const id =  uint32.toString(8);
				 console.log(id);
				
			}
        },
		
        

});