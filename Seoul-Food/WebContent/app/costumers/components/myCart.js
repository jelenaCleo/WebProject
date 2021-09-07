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
            <p class="fw-bold fs-20 mt-3"><span id="cart-numb">3</span> proizvoda u Vašoj korpi</p>




     
            <div v-for="item in cartItems"  class="cart-item py-3">
                <div class="row align-items-center">
                    <div class="col-4 d-flex align-items-center">
                        <div class="quantity-field">
                            <button class="value-button decrease-button" onclick="decreaseValue(this)"
                                title="Azalt">-</button>
                            <div class="number">1</div>
                            <button class="value-button increase-button" onclick="increaseValue(this, 5)"
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
                                <span class="restourant-price">{{item.count}}</span>
                            </div>
                            <div class="restourant-mark">

                                <span>15.99KM</span>
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
                <p class="mb-0 ms-1">29,89</p>
                <p class="mb-0 ms-1">KM</p>
            </div>
            <div class="text-end">
                <button type="button" class="btn btn-primary fw-600 mt-3"><i class="fas fa-shopping-basket"></i>
                    Završite
                    kupovinu</button>
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
		
		}

});