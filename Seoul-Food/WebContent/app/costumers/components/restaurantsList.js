Vue.component("reslist", {
	

    data: function () {
		
        return {
            restaurants: null,
            namesearch: '',
            locationsearch:'',
            typesearch: '',
            ratingsearch:'',
            selectedRestaurant:null,
			namecnt: true,
			locationcnt: true,
			ratingcnt: true,
			
			

        }
	
    },
	
    template:
        `
        <div id= "restaurants">
        <section>
        
            <div class="main-banner d-flex align-items-center  text-white  text-center">
                <div class="container">
                    <h2>Lista restorana u Vašoj blizini</h2>
                </div>
                <span id="black-overlay"></span>
        
        
            </div>
        </section>
        <section>
            <input v-model="namesearch" id="search" type="text" placeholder="Unesite ime restorana" />
            

			<button v-on:click="namecnt? sortByNameAscending() : sortByNameDescending()" data-toggle="button"  class="btn  btn-primary" ><i class=" fas fa-sort"></i></button>
			<br><br>
            <div class="filter-head">
                <div class="text-center mt-3 fs-14 pb-4">
                    <h1 class="text-dark">Napredna pretraga</h1>
                </div>
        
                <form class="form-inline ">
        
                    <div class="form-group">
                    <!-- Filter by TextBox query -->
                      <input v-model="locationsearch" id="in1" type="text" placeholder="Lokacija" />
					    <button v-on:click="locationcnt? sortByLocationAscending() : sortByLocationDescending() " data-toggle="button"  class="btn  btn-primary" ><i class=" fas fa-sort"></i></button>
                      
                      <!-- Filter by Category -->
                      <select v-model="typesearch" id="in1" >
                          <option value=""> Svi restorani </option>
                          <option value="Italijanski">Italijanski</option>
                          <option value="Kineski">Kineski</option>
                          <option value="Indijski">Indijski</option>
						  <option value="Korejski">Korejski</option>
                      </select>
                    
                      <!-- TODO :Filter using Range input --> 
                      <input v-model="ratingsearch" id="in1" type="text" placeholder="Ocjena" />
				      <button v-on:click="ratingcnt ? sortByRatingsAscending() : sortByRatingsDescending()" data-toggle="button"  class="btn  btn-primary" ><i class=" fas fa-sort"></i></button>
                       
                    </div>
        
                </form>
            </div>
        </section>
        <section class="container">
        
            <h1 class="fw-bold fs-20">Otvoreni objekti</h1>
        
            <div  class=" restourant-search py-3">
                <!--ovdje pocne-->
                <div  v-for="r in filteredRestaurants" v-if="r.working == true">
               
          				<a  v-on:click="restaurantView(r.id)" > 
                        <div  class="row align-items-center ">
        
                            <div class="col-4">
                                <img src="assets/imgs/default-placeholder.png" class="restourant-logo" alt="Image not found" />
                            </div>
                            <div class="col-8">
                                <div class="d-flex justify-content-around align-items-center">
                                    <div>
                                        <p class="restourant-name ">{{r.name}}</p>
                                        <span class="restourant-price">{{r.restaurantType}}  •  {{r.location.address.street}}, {{r.location.address.zipCode}}</span>
                                    </div>
                                    <div class="restourant-mark">
                                        <i class="fas fa-star"></i>
                                        <span>{{r.rating}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="my-2">
                                <hr>
                            </div>
        			    </div>
                        <!--ovdje kraj-->
						</a>
                </div>
            </div>
        </section>
		<section class="container">
        
            <h1 class="fw-bold fs-20">Zatvoreni objekti</h1>
        
            <div  class=" restourant-search py-3">
                <!--ovdje pocne-->
                <div  v-for="r in filteredRestaurants" v-if="r.working == false">
               
                         <a  v-on:click="restaurantView(r.id)" > 
                        <div  class="row align-items-center ">

                            <div class="col-4">
                                <img src="assets/imgs/default-placeholder.png" class="restourant-logo" alt="Image not found" />
                            </div>
                            <div class="col-8">
                                <div class="d-flex justify-content-around align-items-center">
                                    <div>
                                        <p class="restourant-name ">{{r.name}}</p>
                                        <span class="restourant-price">{{r.restaurantType}}  •  {{r.location.address.street}}, {{r.location.address.zipCode}}</span>
                                    </div>
                                    <div class="restourant-mark">
                                        <i class="fas fa-star"></i>
                                        <span>{{r.rating}}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="my-2">
                                <hr>
                            </div>
        			    </div>
                        <!--ovdje kraj-->
                        </a>
                </div>
            </div>
        </section>
        
        
    </div>
        



  `,
    mounted() {
        axios
            .get('rest/restaurants/')
            .then(response => (this.restaurants = response.data))

    },
    methods:{
        restaurantView:function(id){
            
            location.href = "#/restpage/" + id;
                
        }
    }
    ,
	    computed:{
	       
	        filteredRestaurants:function(){
	
	           
				if(this.restaurants == null){
					return ;
				}
	
	            return this.restaurants.filter((r) =>{
	
					// DOPUNI ZA RATING I r.location.match(this.locationsearch) && S
	              
		            if( r.name.toUpperCase().match(this.namesearch.toUpperCase()) && r.restaurantType.match(this.typesearch) ){
		                return r;
		            }
		            });
	        	}
	    	},
		methods:{
				sortByNameAscending : function(){
					function compare(a,b){
						
						if(a.name < b.name){
							return -1;
						}
						if(a.name > b.name){
							return 1;
						}
						return 0;
					}
					this.restaurants.sort(compare);
					this.namecnt = false;
				},
				
				sortByNameDescending:function(){
					function compare(a,b){
						
						if(a.name > b.name){
							return -1;
						}
						if(a.name < b.name){
							return 1;
						}
						return 0;
					}
					this.restaurants.sort(compare);
					this.namecnt = true;
				},
				
				sortByLocationAscending : function(){
					function compare(a,b){
						
						if(a.location.address.city < b.location.address.city){
							return -1;
						}
						if(a.location.address.city > b.location.address.city){
							return 1;
						}
						return 0;
					}
					this.restaurants.sort(compare);
					this.locationcnt = false;
				},
				
				sortByLocationDescending : function(){
					
					function compare(a,b){
						
						if(a.location.address.city > b.location.address.city){
							return -1;
						}
						if(a.location.address.city < b.location.address.city){
							return 1;
						}
						return 0;
					}
					
					this.restaurants.sort(compare);
					this.locationcnt = true;
				},
				sortByRatingsAscending: function () {
					this.restaurants.sort((a,b) => a.rating > b.rating ? 1 : -1);
					this.ratingcnt = false;
				},
				sortByRatingsDescending: function () {
					this.restaurants.sort((a,b) => a.rating < b.rating ? 1 : -1);
					this.ratingcnt = true;
				},
				
				
				
		}
});