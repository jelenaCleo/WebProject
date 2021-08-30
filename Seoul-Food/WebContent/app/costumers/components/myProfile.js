function fixDate(user){

  user.birthday = new Date(parseInt(user.birthday)).toLocaleDateString();
  return user;
}



Vue.component("myprofile",{

    data: function(){
      return{
        user : {},
        editedUser:{
          username: '',
          name: '',
          surname: '',
          gender: '',
          password: '',
          birthday: null,
		  role: ''
        },
        mode: 'VIEW',
        
      }
    },


    template:`
    <div id="profile" class="container bootstrap snippets bootdey">
        <h1 class="text-primary"><span class="glyphicon glyphicon-user"></span>Izmjena Profila</h1>
        <hr>
    <div class="row">
        <!-- left column -->
            <div class="col-md-3">
                <div class="text-center">
                <img src="//placehold.it/100" class="avatar img-circle" alt="img">
                <h6>Dodajte drugu fotografiju...</h6>

                <input type="file" class="form-control">
                </div>
            </div>

        <!-- edit form column -->
        <div class="col-md-9 personal-info">

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
                            <input class="form-check-input " type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                            <label class="form-check-label  " for="flexRadioDefault1">
                                Ženski
                            </label>
                            </div>
                        </div>
                        <div class="form-check">
                            <div class="col-lg-3">
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                            <label class="form-check-label" for="flexRadioDefault2">
                                Muški
                            </label>
                            </div>
                        </div>
                    
                <div class="form-group">
                    <label class="col-lg-3 control-label">Datum rođenja :</label>
                    <div class="col-lg-8">
                      <input height="40" class= "col-lg-12  " type="text" onfocus="(this.type='date')" format="dd-mm-yyyy"   v-model="editedUser.birthday" />
                    </div>
                </div>
			 <section class="container mt-4">
		        <br><br>
		        <button @click="saveChanges()" ><i class="fa fa-check" aria-hidden="true"></i> Save changes
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
      this.editedUser.role = this.user.role;
      this.editedUser.birthday = new Date(parseInt(this.user.birthday)).toLocaleDateString();
      this.editedUser.password = this.user.password;
      this.user= fixDate(this.user);
      console.log(this.editedUser.birthday);
        });
    },
	  
    methods:{
	saveChanges: function() {
				if (true) {
						//var u = {username:this.editedUser.username,name:this.editedUser.name,surname:this.editedUser.surname,role:this.editedUser.role,password:this.editedUser.password,gender:this.editedUser.gender,birthday:this.editedUser.birthday.getTime()}
						console.log(this.editedUser.birthday + "editedUser birthday");
						console.log(this.user.birthday + "user birthday");
						axios
							.post('rest/users/editUser', this.editedUser)
							.then(response => {
								toastr["success"]("Success changes!!", "Success!");
								this.message = "user promenjen";
							})
							.catch(err => {
								toastr["error"]("Failed during changes :(", "Fail");
							})
					
				}
			}
	
    }


});