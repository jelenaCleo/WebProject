Vue.component("restpage",{
	
	data:function(){
		return{
			isLoaded : false,
			user : null,
			restaurant : null,
			name: '',
			disable: true,
		}
	},
	
	template:
	`
	<div v-if="isLoaded"  >
    <section>
        <div class="main-banner help d-flex align-items-center  text-center">
            <div class="container help">
                <h2>Restoran - <span>{{restaurant.name}}</span></h2>
            </div>
            <span id="black-overlay"></span>
        </div>
    </section>

    <!-- section 2 -->
    <section class="container help mt-5">
        <p class="fw-bold fs-20">Šta mi imamo da ponudimo? Zašto ne pretražite?</p>

        <form class="example mt-2">
            <input type="text" id="name" class="input-custom1" placeholder="Pretraga.." name="search">
            <button type="submit"><i class="fa fa-search"></i></button>
        </form>

        <div class="box-shadow mt-3 px-4 py-4">
            <div class="border-bottoms">
                <p class="fw-bold fs-15">Ponude</p>
            </div>

            <div v-for="a in restaurant.restaurantArticles" class="mt-3 d-flex border-bottom align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <img src="assets/imgs/default-placeholder.png" class="item-picture" alt="menu item picture">
                   <div class="d-flex align-items-start flex-column ">
                        <p class="product-name ms-3">{{a.name}} ,{{a.quantity}}{{a.measure}}</p>
                        <p class="product-name ms-3">{{a.price}}DIN</p>
						<p class="product-price ms-1"> {{a.description}}</p>
                    </div>
                </div>
                <button v-on:click="log" type="button" class="btn btn-success btn-sm">Dodaj u korpu</button>
            </div>
           
        </div>
    </section>


    <section class="container mt-5">
        <p class="fw-bold fs-20">O restoranu</p>

        <div class="box-shadow mt-3 px-4 py-4">
            <div class="row align-items-center">
                <div class="col-6">
                    <p class="fw-bold fs-15">Radno vrijeme</p>

                    <div class="border-bottom working">
                        <p class="working-day">Ponedeljak</p>
                        <p class="working-time">{{restaurant.startHours}}-{{restaurant.endHours}}</p>
                    </div>
                    <div class="border-bottom working">
                        <p class="working-day">Utorak</p>
                        <p class="working-time">{{restaurant.startHours}}-{{restaurant.endHours}}</p>
                    </div>
                    <div class="border-bottom working">
                        <p class="working-day">Srijeda</p>
                        <p class="working-time">{{restaurant.startHours}}-{{restaurant.endHours}}</p>
                    </div>
                    <div class="border-bottom working">
                        <p class="working-day">Četvrtak</p>
                        <p class="working-time">{{restaurant.startHours}}-{{restaurant.endHours}}</p>
                    </div>
                    <div class="border-bottom working">
                        <p class="working-day">Petak</p>
                        <p class="working-time">{{restaurant.startHours}}-{{restaurant.endHours}}</p>
                    </div>
                    <div class="border-bottom working">
                        <p class="working-day">Subota</p>
                        <p class="working-time">{{restaurant.startHours}}-{{restaurant.endHours}}</p>
                    </div>
                    <div class="border-bottom working">
                        <p class="working-day">Nedjelja</p>
                        <p class="working-time">{{restaurant.startHours}}-{{restaurant.endHours}}</p>
                    </div>

                </div>
                <div class="col-6 d-flex align-items-center">
                    <div>
                        <img src="assets/imgs/adresa.jpg" class="address-picture" alt="address">
                    </div>
                    <div class="ms-3">
                        <p class="fw-bold fs-15">{{restaurant.location.address.street}}</p>
                        <p class="working-day text-muted">{{restaurant.location.address.city}}, {{restaurant.location.address.zipCode}}</p>
                    </div>
                </div>
            </div>
            <p class="fw-bold fs-15 mt-4">Informacije o restoranu</p>

            <div class="d-flex">
                <p class="fw-bold">Tip restorana:</p>
                <span class="ms-1">{{restaurant.restaurantType}}</span>
            </div>
            <div class="d-flex">
                <p class="fw-bold">Status restorana:</p>
                <span class="ms-1 text-success">
                <p v-if="restaurant.working == true" class="fw-bold" show>
                    Otvoren
                </p>
                <p  v-else class="text-danger fw-bold"  show>
                    Zatvoren
                </p>
                </span>
            </div>
            <div class="d-flex">
                <p class="fw-bold">Ocena restorana:</p>
                <span class="ms-1">{{restaurant.rating}}<i class="fas fa-star text-warning"></i></span>
            </div>

            <!-- TODO -->
            <p class="fw-bold fs-15 mt-4">Pregled komentara</p>

            <div  c class="overflow-auto row border-top border-bottom py-3">
                <div class="col-6 d-flex align-items-center">
                   
                    <p class="reviewer-name">Jovan Jovanović Zmaj</p>
                </div>
                <div class="col-6">
                    <p class="fs-10">Poruka:</p>
                    <p class="review-text">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, sint dicta!
                        Quo natus quae in
                        nisi delectus eius molestias nobis reiciendis ad eveniet consequuntur omnis, dicta rerum animi
                        eligendi veritatis!
                        Iste, officiis! Dolorum odio nesciunt nemo deserunt accusantium officia cum, molestiae
                        distinctio eius. Porro ex a ipsa suscipit! Impedit quisquam accusamus repellat, ut nisi qui
                        ipsum non tempora ab nobis?</p>
                </div>
            </div>
			 <p class="fw-bold fs-15 mt-4">Ostavite komentar</p>
            <form >
                <div class="row">
                    <div class="col-6">
                        <label for="reviewer" class="mb-2">Unesite Vaše ime:</label>
                        <input :disabled="disable" type="text" id="reviewer" class="input-custom">
                    </div>
                    <div class="col-6">
                        <label for="review-message" class="mb-2">Unesite poruku:</label>
                        <textarea :disabled="disable" type="text" id="review-message" class="input-custom"></textarea>
                    </div>
                </div>
				 <button :disabled="disable" type="submit" class="btn btn-success mt-3">Pošaljite review</button>
            </form>

         	<br>
			<div class="alert alert-warning" role="alert">
				  Ne možete ostaviti komentar ako niste kupovali u restoranu .
				</div>



        </div>
    </section>
  <footer class="mt-5">
        <hr>
        <div class="container">
            <p class="text-center text-muted">© 2021 Maja & Jelena. Projekat iz WEB programiranja</p>
        </div>
    </footer>

</div>
	
	`,
	mounted(){
		
		var path = location.href;
		var restID = path.split('/restpage/')[1];
		/**What is %20 in the url?
		URL-encoding from %00 to %8f
		ASCII -	URL-encode
		space -	  %20 
		*/
		console.log("DUG JE PUT: " + path +"\n" + restID);
		var id = restID.replace('%20', ' ');
		//this.restaurant = response.data
		console.log("id koji trazm:"+ id);
		axios.get('rest/restaurants/' + id) 
			.then(response =>{
				
				this.restaurant = response.data;
				this.isLoaded = true;
				
				//ako je ovaj user kupovao u restoranu sa ovim id ==>
				//disabled = false
			});
			
	},
	methods:{
		log:function(){
			
			console.log(this.restaurant.location.address.city);
		}
		
	}
	
	
	
});