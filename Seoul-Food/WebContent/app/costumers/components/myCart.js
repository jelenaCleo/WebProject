Vue.component("cart",{

		data:function(){
			return{

				cartItems: {},
				isLoaded: false,
                selection:[],
                user: null,
                totalPrice: 0.0,         
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
            <div v-for="(item, index) in cartItems"  class="cart-item py-3">
           <button id="important" v-on:click="deleteArticle(item)" type="button" class="btn-close" aria-label="Close"></button>
                <div class="row align-items-center">
                    <div class="col-4 d-flex align-items-center">
                        <div class="quantity-field">
                         
                                <input  min="1" max="10" v-model.number="item.count" v-on:input="checkInput(item.count, index)" type="number" class="count" name="qty" >
                           
                        </div>
						    <img v-bind:src="item.article.image" class="cart-logo" alt="article image">
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
           		
                <label class="mb-0 ms-1"  
                style = "margin-right: 30px;
			    font-style: italic;
			    font-family: revert;
			    color: darkblue;"
			    >{{user.buyerClass | filterClass }}</label>
                <p class="mb-0 fw-bold">Ukupno za uplatu: </p>
                <p class="mb-0 ms-1">{{total()}}</p>
                <p class="mb-0 ms-1">RSD</p>
                
            </div>
            <div class="text-end">
                <button v-on:click="createOrder" type="button" :disabled="totalPrice <= 0.0 " class="btn btn-primary fw-600 mt-3"><i class="fas fa-shopping-basket"></i>
                    Poruči</button>
	
            </div>
        </section>
        <footer class="mt-5">
            <hr>
            <div class="container">
                <p id="try" class="text-center text-muted">© 2021 Maja & Jelena . Projekat iz WEB programiranja</p>
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
							});
             axios
                .get('rest/users/myProfile')
                .then(response =>
                     {
                          this.user = response.data;
                      });
		
		},
        methods:{
            dec:function(item){

                if(item.count == 0){
                    return;
                }
               return item.count -=1;

            },
            inc:function(item){
                if(item.count > 50){
                    return;
                }
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
			
				if(this.user.buyerClass == 1 ){
					discount = t - t*5/100;
				}
				else if( this.user.buyerClass == 2){
					discount = t - t*3/100;
				}else{
					discount = t;
				}
				
				this.totalPrice = discount;
				return discount;
			},  
            deleteArticle:function(item){

              
                axios
                    .put('rest/cart/', item.article)
                    .then(response =>(this.cartItems = response.data)); 
                   

            },
			createOrder:function(){
             
                if(this.totalPrice == 0.0){            
                    return;
                }

                for (let i = 0; i < this.cartItems.length; i++) {				
                    this.selection.push({
						article: this.cartItems[i].article,
						count: this.cartItems[i].count
					});
                }         
				
                axios
                    .post('rest/orders/',
                     {
                       "selection": this.selection,
                        "username" : this.user.username,
                        "name" :  this.user.name,
                        "surname" : this.user.surname
                    
                    });
					

				  axios
                    .delete('rest/cart/')
                    .then(response =>(this.cartItems = response.data)); 
                   
			},
			checkInput:function(number,index){
				if (parseInt(number) > 10){
					this.cartItems[index].count = 10;
				}
				if (parseInt(number) < 1){
					this.cartItems[index].count = 1;
				}
			}
        },
		filters:{
				filterClass:function(value){
					if (value == 1) return 'Vi ste Zlatni kupac i imate 5% popusta';
					if (value == 2) return 'Vi ste Srebrni kupac i imate 3% popusta';
					if (value == 3) return '';
				}
		}
        

});