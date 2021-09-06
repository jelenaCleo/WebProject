Vue.component("admin-rest-page",{
	
	data:function(){
		return{
			user : null,
            manager:null,
			restaurant : null,
            mode: 'read', //moze biti i edit
            deletedMessage: '',
            typeOptions: [
                "Korejski",
                "Kineski",
                "Italijanski",
                "FastFood",
                "Pekara",
                "Poslasticarnica",
            ],
		}
	},
	
	template:
	`
	<div  >
        <section>
            <div class="main-banner help d-flex align-items-center  text-center">
                <div class="container help">
                    <h2>Restoran - <span>{{this.restaurant.name}}</span></h2>
                </div>
                <span id="black-overlay"></span>
            </div>
        </section>
    
        <!-- section 2 -->
        <section class="container help mt-5">
            <h3 class="fw-bold fs-20" style="color: brown;">{{deletedMessage}} </h3>
    
            <div class="box-shadow mt-3 px-4 py-4">
                <div class="border-bottoms">
                    <p class="fw-bold fs-15">Ponude</p>
                </div>
                

                <!-- novo -->
                <div  v-for="a in this.restaurant.restaurantArticles" >
               
                    <div class="mt-3 d-flex border-bottom align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <img v-bind:src="a.image"  class="item-picture" alt="menu item picture">
                        <div class="ms-3">
                            <p class="product-name">{{a.name}}</p>
                            <p class="product-price">{{a.price}} din</p>
                        </div>
                    </div>
                    <button type="button"  class="btn btn-success btn-sm">OBRISI</button>
                    </div>
                </div>

                <!-- novo -->
            </div>
        </section>
        <div class="col-md-5" style="margin-top: 30px;">
           <!-- <button type="button" @click="editRestaurant()" class="btn btn-primary btn-sm">IZMENI RESTORAN</button>
            <button type="button" @click="saveChanges()" id="saveChangesBtn" disabled=true class="btn btn-success btn-sm">SACUVAJ IZMENE</button> -->
            <button type="button" @click="deleteRestaurant()" class="btn btn-danger btn-sm">OBRISI RESRORAN</button>
            <button type="button" @click="restoreRestaurant()" class="btn btn-secondary btn-sm">VRATI RESTORAN</button>
        </div>
    
        <section class="container mt-5">
            <p class="fw-bold fs-20">O restoranu</p>
    
            <div class="box-shadow mt-3 px-4 py-4">
                <div class="row align-items-center">
                    <div class="col-6">
                        <p class="fw-bold fs-15" style="margin: 2rem;">Radno vrijeme svakim danom</p>
    
                        <div class="border-bottom working" >
                            <p class="working-day">OD:</p>
                            <!--<input disabled=true type="time" id="startTime" v-model="restaurant.startHours" > -->
                            <label style="padding: 5px;margin-bottom: 5px;" class=" fs-15"  >{{restaurant.startHours}} </label>
                        </div>
                        <div class="border-bottom working">
                            <p class="working-day">DO:</p>
                            <!--<input disabled=true type="time" id="endTime"  v-model="restaurant.endHours" > -->
                            <label style="padding: 5px;margin-bottom: 5px;" class=" fs-15"  >{{restaurant.endHours}} </label>
                        </div>
                        <div class="ms-3 " style="margin:30px ;">
                            <p class="fs-20">Lokacija</p>
                           <!-- <input disabled=true class="input-custom2" type="text" id="resStreet" v-model="this.restaurant.location.street" placeholder="Ulica" ></br></br>
                            <input disabled=true class="input-custom2" type="text" id="resCity" v-model="restaurant.location.city" placeholder="Grad" ></br></br>
                            <input disabled=true class="input-custom2" type="text" id="resZip" v-model="restaurant.location.zipCode"  placeholder="Postanski broj"></br></br>
                            -->
                            <div class="border-bottom working">
                            <p class="working-day">Ulica:</p>
                            <!--<input disabled=true type="time" id="endTime"  v-model="restaurant.endHours" > -->
                            <label style="padding: 5px;margin-bottom: 5px;" class=" fs-15"  >{{this.restaurant.location.address.street}} </label>
                        </div>
                        <div class="border-bottom working">
                            <p class="working-day">Grad:</p>
                            <!--<input disabled=true type="time" id="endTime"  v-model="restaurant.endHours" > -->
                            <label style="padding: 5px;margin-bottom: 5px;" class=" fs-15"  >{{this.restaurant.location.address.city}} </label>
                        </div>
                        <div class="border-bottom working">
                            <p class="working-day">Poštanski broj:</p>
                            <!--<input disabled=true type="time" id="endTime"  v-model="restaurant.endHours" > -->
                            <label style="padding: 5px;margin-bottom: 5px;" class=" fs-15"  >{{this.restaurant.location.address.zipCode}} </label>
                        </div>
                    </div>
    
                    </div>
                    <div class="col-6 d-flex align-items-center">
                        <div>
                            
                            <img v-bind:src="restaurant.imgURL" class="address-picture" alt="address">
                            </br></br></br>
                    
                            
                        </div>
                        
                    </div>
                </div>
                </br>
               <div class=" filter-head text-center ">
                <div  >
                    <label   style="padding: 5px;margin-bottom: 20px;margin-top: 10px;" class=" fs-15"  >Ime restorana: {{this.restaurant.name}}   {{restaurant.rating}} <i class="fas fa-star text-warning"></i></label>
                   <!-- <input  disabled=true type="text" id="restourantName" style="margin-bottom: 40px;" v-model="this.restaurant.name" class=" mt-2 input-custom" placeholder="Ime restorana"
                        required> -->
                </div>
                <div  >
                    
                    <label  style="padding: 5px;margin-bottom: 20px;"  v-if="restaurant.working == '1'"  class=" fs-15" >Status: Radi </label>
                    <label style="padding: 5px;margin-bottom: 20px;"  v-if="restaurant.working == '0'" class=" fs-15" >Status: Ne radi </label>
                    
                   <!-- <select disabled=true data-trigger="" id="resStatus"  style="margin-bottom: 40px;"  class="input-custom mt-2">
                        <option  value=true>Da</option>
                        <option  value=false>Ne</option>
                    </select> -->
                </div>
                <div >
                    <label  style="padding: 5px;margin-bottom: 20px;"  class=" fs-15" >Tip restorana: {{restaurant.restaurantType}} </label>
                   <!-- <select disabled=true data-trigger="" id="type" style="margin-bottom: 40px;"  v-model="restaurant.restaurantType" class="input-custom mt-2">
                    <option v-for="option in typeOptions" :value="option">{{ option }}</option>
                    </select> -->
                </div>
                <div>
                    <label   style="padding: 5px;margin-bottom: 20px;"  class=" fs-15" >Menadžer: {{manager.name}} {{manager.surname}} </label>
                </div>
                <!--
                <div class="d-flex">
                     <label  style="padding: 5px;margin-bottom: 20px;"  class="fs-15" >Ocena restorana: {{restaurant.rating}} <i class="fas fa-star text-warning"></i></label>
                </div>
                -->
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
		var path = location.href;
		var restID = path.split('/admin-rest-page/')[1];
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
                if(this.restaurant.logicallyDeleted == 1){
                    console.log('usao u if u mountedu');
                    this.deletedMessage = 'Restoran je obrisan';
                    
                }
                this.getManager();
            }).catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            });

            
			
	},
	methods:{
		f:function(){
			console.log("Restoran page: " + this.restaurant.name);
		},
        getManager: function(){
            console.log('funkcija getManagers');
            axios.get('rest/users/myManager/' + this.restaurant.managerID) 
			.then(response =>{
				this.manager = response.data;
                console.log(this.manager.name);
            }).catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            });
        },
        editRestaurant: function(){
            document.getElementById("startTime").disabled=false;
            document.getElementById("endTime").disabled=false;
            document.getElementById("resStreet").disabled=false;
            document.getElementById("resCitu").disabled=false;
            document.getElementById("resZip").disabled=false;
            document.getElementById("restourantName").disabled=false;
            document.getElementById("resStatus").disabled=false;
            document.getElementById("type").disabled=false;
            document.getElementById("saveChangesBtn").disabled=false;


        },
        saveChanges: function(){
            document.getElementById("startTime").disabled=true;
            document.getElementById("endTime").disabled=true;
            document.getElementById("resStreet").disabled=true;
            document.getElementById("resCitu").disabled=true;
            document.getElementById("resZip").disabled=true;
            document.getElementById("restourantName").disabled=true;
            document.getElementById("resStatus").disabled=true;
            document.getElementById("type").disabled=true; 
            document.getElementById("saveChangesBtn").disabled=true;
        },
        deleteRestaurant: function(){
            console.log(this.restaurant.id);
            
            axios.put('rest/restaurants/deleteRestaurant/' + this.restaurant.id) 
			.then(response =>
				{
                    this.restaurant = response.data;
                    this.deletedMessage = 'Restoran je obrisan ';
                }).catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            });
            
        },
        restoreRestaurant: function(){
            console.log(this.restaurant.id);
            
            axios.put('rest/restaurants/restoreRestaurant/' + this.restaurant.id) 
			.then(response =>
				{
                    this.restaurant = response.data;
                    this.deletedMessage = '';
                }).catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            });
        }
		
	}
	
	
	
});