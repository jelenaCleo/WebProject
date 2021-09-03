Vue.component("restpage",{
	
	data:function(){
		return{
			user : null,
			restaurant : null,
		}
	},
	
	template:
	`
	<div  >
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
            <div class="mt-3 d-flex border-bottom align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <img src="assets/imgs/default-placeholder.png" class="item-picture" alt="menu item picture">
                    <div class="ms-3">
                        <p class="product-name">Cheeseburger + Pomfrit ili Pohovani luk + Coca-Cola 330ml</p>
                        <p class="product-price">6,00 KM</p>
                    </div>
                </div>
                <button type="button" class="btn btn-success btn-sm">Dodaj u korpu</button>
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
                        <p class="working-time">{{restaurant.startHours}}-{{restaurant.endHours}}/p>
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
                        <p class="fw-bold fs-15">{{restaurant.location.street}}/p>
                        <p class="working-day text-muted">{{restaurant.location.city}} {{restaurant.location.zipCode}}</p>
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
                <p v-if="restaurant.working == true" show>
                    Radi
                </p>
                <p v-else show>
                    Ne radi
                </p>
                </span>
            </div>
            <div class="d-flex">
                <p class="fw-bold">Ocena restorana:</p>
                <span class="ms-1">{{restaurant.rating}}<i class="fas fa-star text-warning"></i></span>
            </div>

            <!-- TODO -->
            <p class="fw-bold fs-15 mt-4">Pregled komentara</p>

            <div class="row border-top border-bottom py-3">
                <div class="col-6 d-flex align-items-center">
                   
                    <p class="reviewer-name">Jovan Jovanović Zmaj</p>
                </div>
                <div class="col-6">
                    <p class="fs-10">Poruka:</p>
                    <p class="review-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam, sint dicta!
                        Quo natus quae in
                        nisi delectus eius molestias nobis reiciendis ad eveniet consequuntur omnis, dicta rerum animi
                        eligendi veritatis!
                        Iste, officiis! Dolorum odio nesciunt nemo deserunt accusantium officia cum, molestiae
                        distinctio eius. Porro ex a ipsa suscipit! Impedit quisquam accusamus repellat, ut nisi qui
                        ipsum non tempora ab nobis?</p>
                </div>
            </div>

         



        </div>
    </section>
</div>
	
	`,
	mounted(){
		//axios.get()
		//.then()
		
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
			.then(response =>(
				this.restaurant = response.data
			));
			
	},
	methods:{
		f:function(){
			console.log("Restoran page: " + this.restaurant.name);
		}
		
	}
	
	
	
});