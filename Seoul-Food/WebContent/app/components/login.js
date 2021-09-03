Vue.component("login", {

    data:function(){

        return {
            loginUser:{
                username:'',
                password:''
            },
            registerUser:{
                username: '',
				password: '',
				name: '',
				surname: '',
				gender: '',
                role: '',
				birthday: null

            }
        }
    },
    components:{
		vuejsDatepicker,
	},
    template: `
    
  
    
        <div class="container d-flex align-items-center justify-content-center">
            <div class="row mt-5 w-50">
                <div class="col-12 bg-white pt-4  rounded ">
                    <p class="text-center fw-bold fs-20">Prijavi se kod Maje</p>
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                type="button" role="tab" aria-controls="home" aria-selected="true">Ulogujte se</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                                type="button" role="tab" aria-controls="profile" aria-selected="false">Registrujte se</button>
                        </li>
                    </ul>
    
                    <div class="tab-content " id="myTabContent">
                        <div class="tab-pane fade show active " id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div class="d-flex align-items-stretch flex-column">
    
                                <div class="d-flex flex-column">
                                <form v-on:submit="userLogin"  >
                                    <input type="text" v-model="loginUser.username" class=" input-custom" placeholder="Korisničko ime" required>
                                    <input type="password" v-model="loginUser.password" class="mt-3 input-custom" placeholder="Vaša lozinka" required>

                                    <!-- BUTTON LOGIN -->
                                    <button type="submit"  class="btn btn-warning fw-600 mt-3" >Prijavite se </button>
                                   <br><br>
                                   
                                </form>
                                </div>
                            </div>
                        </div>
                        <div class="tab-pane fade " id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <div class="d-flex align-items-stretch flex-column">
    
                                <div class="d-flex flex-column">
                                <form v-on:submit="userRegister">
                                    <input type="text"      v-model="registerUser.username" class=" input-custom" placeholder="Korisničko ime" required>
                                    <input type="password"  v-model="registerUser.password" class="mt-3 input-custom" placeholder="Vaša lozinka" required>
                                    <input type="text"      v-model="registerUser.name"     class="mt-3  input-custom" placeholder="Ime" required>
                                    <input type="text"      v-model="registerUser.surname" class="mt-3  input-custom" placeholder="Prezime" required>
                                    
                                    <label  class="d-flex text-left">Pol</label>
                                    <div class="form-check d-flex" >
                                        <input  v-model="registerUser.gender"  value="f" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
                                        <label class="form-check-label" for="flexRadioDefault1">
                                        <p >Ž</p>
                                        </label>
                                    </div>
                                    <div class="form-check d-flex"  >
                                        <input  v-model="registerUser.gender"  value="m" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked>
                                        <label  class="form-check-label"  for="flexRadioDefault2">
                                        <p>M</p>
                                        </label>
                                    </div>

                                    <vuejs-datepicker format="dd.MM.yyyy" v-model="registerUser.birthday" class="mt-3 " placeholder="Datum rođenja" required>
                                    </vuejs-datepicker>
                                    
                                    <!-- BUTTON REGISTER -->
                                    <button type="submit" class="btn btn-warning fw-600 mt-3">Registrujte se </button>
                                    <br><br>
                                </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
  
    `,
    methods: {
        userLogin:function(event){
            event.preventDefault();

            console.log("username  " + this.loginUser.username + "  password  " + this.loginUser.password);

            axios
            .post('rest/users/login',this.loginUser)
            .then(response=> {
                this.message = response.data;
                console.log("\n\n Login Response data \n");
                console.log(response.data);
                toastr["success"]("Success log in!");
                

                //vratim
                //putanja u zavisnosti od role
                location.href = response.data;
                
                console.log("-------------------redirektoovano-----------------" + response.data);
             })
             .catch(err  =>{ 
                console.log("\n\n ------- ERROR LOGIN-------\n");
                console.log(err);
                toastr["error"]("Password, username are incorrect, or your account is blocked!", "Fail");
               
            })
            
        },
        userRegister:function(event){
            event.preventDefault();
            console.log("bbbbbbbb");
			
			this.registerUser.role = "BUYER";
			
            console.log(this.registerUser.gender);
            console.log(this.registerUser.role);
            console.log(this.registerUser.name);
            console.log(this.registerUser.surname);
            console.log(this.registerUser.username);
            console.log(this.registerUser.birthday);
            
			axios
            .post('rest/users/registration',this.registerUser)
            .then(response=> {
                console.log(response.data);
                toastr["success"]("Success log in!");
				this.registerUser.gender ='';
				this.registerUser.role = '';
				this.registerUser.password = '';
				this.registerUser.name = '';
				this.registerUser.surname = '';
				this.registerUser.username = '';
				this.registerUser.birthday = null;

             })
             .catch(err  =>{ 
                console.log("\n\n ------- ERROR LOGIN-------\n");
                console.log(err);
               
            })
        }

    }
    


    
    });