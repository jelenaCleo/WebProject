
Vue.component("myprofile",{

    data: function(){
      return{
        user : {},
        editedUser:{
            username: '',
            name: '',
            surname: '',
            gender: '',
            role: '',
            password: '',
            birthday: new Date()
        },
      
        message: '',
		female: false,
		male: false
      }
    },
	components:{
		
		vuejsDatepicker,
	},


    template:`
    <div id="profile" class="container bootstrap snippets bootdey">
        <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>Izmjena Profila</h1>
        <hr>
    <div class="row">
        <!-- edit form column -->
        <div class="col-md-13 personal-info">

                <h3>Lične info</h3>

            <form class="form-horizontal" role="form">
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Korisnčko ime:</label>
                            <div class="col-lg-8">
                            <input v-model="editedUser.username" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Šifra:</label>
                            <div class="col-lg-8">
                            <input  v-model="editedUser.password" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Ime:</label>
                            <div class="col-lg-8">
                            <input  v-model="editedUser.name" class="form-control" type="text" value="">
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-lg-3 control-label">Prezime:</label>
                            <div class="col-lg-8">
                            <input v-model="editedUser.surname" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="form-check">
                            <label class="col-lg-3 control-label">Pol:</label>
                            <hr class="col-lg-3">
                            <div class="col-lg-3">
                            <input checked="female"  v-model="editedUser.gender"  value="F"  class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label  " for="flexRadioDefault1">
                                Ž
                            </label>
                            </div>
                        </div>
                        <div class="form-check">
                            <div class="col-lg-3">
                            <input checked="male"  v-model="editedUser.gender"  value="M" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" >
                            <label class="form-check-label" for="flexRadioDefault2">
                                M
                            </label>
                            </div>
                        </div>
                    
                <div class="form-group">
                    <label class="col-lg-3 control-label">Datum rođenja :</label>
                    <div class="col-lg-8">
	                      <vuejs-datepicker format="dd.MM.yyyy" v-model="editedUser.birthday"  placeholder="Datum rođenja"></vuejs-datepicker>
					</div>
                </div>
			 <section class="container mt-4">
		        <br><br>
		        <button class="btn btn-success" @click="saveChanges()" ><i class="fa fa-check" aria-hidden="true"></i> Save changes
		        </button>
			</section>
              
            </form>
        </div>
    </div>
<hr>
</div>

    `,
    mounted() {
      axios.get('rest/users/myProfile').then(response => {this.user = response.data;
      console.log(this.user.birthday);
      this.editedUser.username = this.user.username;
      this.editedUser.name = this.user.name;
      this.editedUser.surname = this.user.surname;
      this.editedUser.gender = this.user.gender;
	

		if(this.user.gender.toUpperCase() == "F"){
			this.female = true;
            this.male = false;
		}else{
			this.male = true;
            this.female = false;
		}
		  console.log("geder change ---------" + this.user.gender.toUpperCase()  + "----" + this.female);
      this.editedUser.role = this.user.role;
      console.log(this.editedUser.birthday + "before");
      this.editedUser.birthday = this.user.birthday;
     
      this.editedUser.password = this.user.password;
      
      console.log(this.editedUser.birthday + "after");
        });
    },
	  
    methods:{
	saveChanges: function() {
		
		console.log(this.editedUser.birthday + "editedUser birthday");
        console.log(this.user.birthday + "user birthday");
		
						axios
							.post('rest/users/editUser', this.editedUser)
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
    


});