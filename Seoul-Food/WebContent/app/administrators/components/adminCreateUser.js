Vue.component("create-user", {
	data: function() {

		return {
			checked: '',
			selected: '',
			user: {
				username: '',
				password: '',
				name: '',
				surname: '',
				gender: 'm',
                role: '',
				birthday: new Date()

			}
		}
	},
	components:{
		vuejsDatepicker,
	},

	template: `
	    <section class="container mb-3 ">
	    <h3>Dodaj korisnika</h3>
        <div class="add-manager-form">
            <div class="d-flex align-items-stretch flex-column">

                <div class="d-flex flex-column">
                    <form v-on:submit="userRegister">
                        <input type="text" v-model="user.username" class=" input-custom"
                            placeholder="Korisničko ime" required>
                        <input type="password" v-model="user.password" class="mt-3 input-custom"
                            placeholder="Vaša lozinka" required>
                        <input type="text" v-model="user.name" class="mt-3  input-custom" placeholder="Ime"
                            required>
                        <input type="text" v-model="user.surname" class="mt-3  input-custom"
                            placeholder="Prezime" required>
                        <div style="margin:20px;">
                            
						<label class="text-left">Pol</label>
						<div class="custom-control custom-radio">
 							<input type="radio" v-model="checked" id="customRadio1" name="customRadio" value="z" class="custom-control-input">
  							<label class="custom-control-label" for="customRadio1">Ž</label>
						</div>
						<div class="custom-control custom-radio">
  							<input type="radio" v-model="checked" id="customRadio2" name="customRadio" value="m" class="custom-control-input">
  							<label class="custom-control-label" for="customRadio2">M</label>
						</div>
                            
                        </div>
                        <div class="combo-style1">
                        	<label for="selRole">Uloga:</label>
	                      	<select class="custom-select" v-model="selected" name="selRole" required>
	                      		
	 					 		<option  value="1">Menadžer</option>
	  							<option  value="2">Dostavljač</option>
							</select>
						</div>
						<div class="datepicker-style1" >
	                        <vuejs-datepicker format="dd.MM.yyyy" v-model="user.birthday"  
	                            placeholder="Datum rođenja" required>
	                        </vuejs-datepicker>
						</div>
                        <!-- BUTTON REGISTER -->
                        <div class="submitbtn-style1" >
	                        <button type="submit"  class="btn btn-warning fw-600 mt-3" >Registruj </button>
	                        <br><br>
	                    </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
  	 
    
    `,
    methods: {
    userRegister:function(event){
            event.preventDefault();
            console.log("aaaaaaa");
            console.log(this.checked);
			console.log(this.selected);
			if(this.checked == "z"){
				this.user.gender = "f";
			}else{
				this.user.gender = "m";
			}
			if(this.selected == "1"){
				this.user.role = "MANAGER";
			}else{
				this.user.role = "DELIVERYMAN";
			}
            console.log(this.user.gender);
            console.log(this.user.role);
            console.log(this.user.name);
            console.log(this.user.surname);
            console.log(this.user.username);
            console.log(this.user.birthday);
            
			axios
            .post('rest/users/registrationByAdmin',this.user)
            .then(response=> {
                console.log(response.data);
                toastr["success"]("Success!User registered!");
				console.log("Success!")
				this.user.gender ='';
				this.user.role = '';
				this.user.password = '';
				this.user.name = '';
				this.user.surname = '';
				this.user.username = '';
				this.user.birthday = null;
				this.checked = '';
				this.selected = '';

             })
             .catch(err  =>{ 
                console.log("\n\n ------- ERROR LOGIN-------\n");
                console.log(err);
               
            })
        }}
});