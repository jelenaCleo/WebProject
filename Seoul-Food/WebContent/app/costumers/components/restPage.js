Vue.component('star-rating', VueStarRating.default);

Vue.component("restpage",{
	
	data:function(){
		return{
			isLoaded : false,
			user : null,
			comments:null,
			restaurant : null,
			name: '',
			canLeaveComment: false,
			disableButton: true,
			comment: '',
		
			selection:[],
			selectionOK:false,
			isLoaded2: false,
			isLoaded3 : false,
            article: null,
            rating: 0
		}
	},
	
	template:
	`
<div v-if="isLoaded">
    <link rel="stylesheet" href="css/users/restPage.css">

    <section>
        <div class="main-banner help d-flex align-items-center  text-center"  :style="{ backgroundImage: 'url(' + restaurant.location.imgUrl + ')' }">
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

            <div v-for="(a,index) in restaurant.restaurantArticles"
                class="firstcol  mt-3 d-flex border-bottom align-items-center justify-content-between">
                <div class="d-flex align-items-center">
                    <img v-bind:src="a.image" class="item-picture" alt="menu item picture">
                    <div class="d-flex align-items-start flex-column ">
                        <p class="product-name ms-3">{{a.name}} ,{{a.quantity}}{{a.measure}}</p>
                        <p class="product-name ms-3">{{a.price}}DIN</p>
                        <p class="product-price ms-1"> {{a.description}}</p>
                    </div>
                </div>
                <div class=" fixed qty mt-2">
                    <span v-on:click="dec(index)" class="minus bg-dark">-</span>
                    <input v-model.number="selection[index].count" type="number" class="count" name="qty">
                    <span v-on:click="inc(index)" class="plus bg-dark">+</span>


                </div>
                <button :disabled="isDisabled(index)" v-on:click="log(index)" type="button"
                    class="btn btn-success btn-block btn-sm">Dodaj u korpu</button>
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
                        <img v-bind:src="restaurant.location.imgUrl" class="address-picture" alt="address picture">
                        <div />
                        <div class="ms-3">
                            <p class="fw-bold fs-15">{{restaurant.location.address.street}}</p>
                            <p class="working-day text-muted">{{restaurant.location.address.city}},
                                {{restaurant.location.address.zipCode}}</p>

                        </div>
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
                    <p v-else class="text-danger fw-bold" show>
                        Zatvoren
                    </p>
                </span>
            </div>
            <div class="d-flex">
                <p class="fw-bold">Ocena restorana:</p>
                <span class="ms-1">{{restaurant.rating}}<i class="fas fa-star text-warning"></i></span>
            </div>
        </div>
        <!-- TODO -->
        <p class="fw-bold fs-15 mt-4">Pregled komentara</p>

        <div v-if="isLoaded3" v-for="(c,index) in comments" class="overflow-auto row border-top border-bottom py-3">
            <div class="col-6 d-flex align-items-center">

                <p class="reviewer-name">{{c.user.name}} {{c.user.surname}}</p>
            </div>
            <div class="col-6">
                <p class="fs-10">Poruka:</p>
                <p class="review-text">
                   {{c.content}}</p>
            </div>
            <div>
            <star-rating v-model="c.grade" :star-size="25" :read-only="true" ></star-rating>
            </div>
        </div>
<div  v-if="isLoaded">
        <p class="fw-bold fs-15 mt-4">Ostavite komentar</p>
        <form>
            <div class="row">
                <div class="col-3" id="white">
                    <label for="reviewer" class="mb-2" @mouseleave="checkInput()" ><star-rating :star-size="40" v-model="rating" ></star-rating></label>     
                </div>
                <div class="col-8">
                    <label for="review-message" class="mb-2">Unesite poruku:</label>
                    <textarea :disabled="!canLeaveComment" v-on:input="checkInput()" v-model="comment" type="text" id="review-message" class="input-custom"></textarea>
                </div>
            </div>
            <button :disabled="!canLeaveComment || disableButton" v-on:click="leaveReview()" type="button" class="btn btn-success mt-3">Pošaljite review</button>
        </form>
</div>

        <br>
        <div v-if="!canLeaveComment" class="alert alert-warning" role="alert">
            Ne možete ostaviti komentar ako niste kupovali u restoranu .
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
		axios.get('rest/restaurants/' + id) 
			.then(response =>{
				this.restaurant = response.data;
				this.isLoaded = true;
			
			for (let i = 0; i < this.restaurant.restaurantArticles.length; i++) {
				 console.log(this.restaurant.restaurantArticles[i].name);	
				this.selection.push({
						key: this.restaurant.restaurantArticles[i].name,
						count: 0
					});		
				}
				this.isLoaded2 = true;
			});
			
            axios.get('rest/comments/'+id).
            	then(response => {
					console.log(response.data.restComments);	
					if(response.data != null){
						 this.comments = response.data.restComments;	
						 this.canLeaveComment = response.data.canLeaveComment;
						  console.log(this.canLeaveComment);
						 this.isLoaded3 = true;
					}
					
					}); 	
			
	},
	methods:{
		log:function(index){
			let name = this.selection[index].key;
			let count = this.selection[index].count;
			
			for (let i = 0; i <  this.restaurant.restaurantArticles.length ; i++) {
			
					if(this.restaurant.restaurantArticles[i].name == name){                      
						axios
                        .post('rest/cart/', 
                        {
                            "article" : this.restaurant.restaurantArticles[i],
                            "count" : count,
                        })
                        .then(response => {
                            toastr["success"]("Success changes!!", "Success!");
                            this.message = "user promenjen";
                        })
                        .catch(err => {
                            console.log(err);
                            toastr["error"]("Failed during changes :(", "Fail");                       
                        })
					}
				}			
				this.selection[index].count = 0;				
		
    	},
			
		inc:function(index){
				this.selection[index].count +=1;    
		},
		dec:function(index){
			if(this.selection[index].count == 0){
				return;
			}
			this.selection[index].count -=1;		
		}
		,
		isDisabled:function(index){
			
			if(!this.isLoaded2 || this.restaurant==null || !this.restaurant.working ){
				return true;
			}
			if(this.selection[index].count == 0){
				return true;
			}
			return false;
		},
		leaveReview: function(){
			console.log("radi radi" + this.content);
			console.log("radi radi" + this.rating);
			if (this.content == '' || this.rating == 0) {
			    return;
			}
			axios
			    .post('rest/comments/' + this.restaurant.id,
			     {
			            "content": this.comment,
			            "grade": this.rating,
			     })
			    .then(response => {
			        toastr["success"]("Success changes!!", "Success!");
			        this.message = "user promenjen";
			        this.comment = '';
			        this.rating = 0;     
			    })
			    .catch(err => {
			        console.log(err);
			        toastr["error"]("Failed during changes :(", "Fail");
			    })
		},
		checkInput:function(){
			if(this.rating != 0 && this.comment.trim() != ''){
				this.disableButton= false;
			}
			else
			{
				this.disableButton= true;
			}	
		}
	}
	
});