function fixManagers(managers) {
	console.log(managers);
    	
    for(m in managers){
        console.log(m.id);
        m.id = m.id.toString();
    }
    return managers;
}

Vue.component("create-restaurant",{
    data() {
		return {
			file : {},
			temp: [],
            managers: [],
            isHidden: true,
            checked: '',
            newRestaurant : {
                name : '',
                restaurantType : '',
                imgURL : '',
                street : '',
                city : '',
                zipCode : '',
                startHours : '',
                endHours : '',
                managerID : ''
            },
            user: {
				username: '',
				password: '',
				name: '',
				surname: '',
				gender: '',
                role: '',
				birthday: null

			},
            typeOptions: [
                "Korejski",
                "Kineski",
                "Italijanski",
                "FastFood",
                "Pekara",
                "Poslasticarnica",
            ],
            hours: [
                "00:00",
                "01:00",
                "02:00",
                "03:00",
                "04:00",
                "05:00",
                "06:00",
                "07:00",
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00",
                "23:00",
            ]

		}
	},    
	components:{
		vuejsDatepicker,
	},

    template: `
    <div >
    <section class="container mt-4">
        <p class="fw-bold fs-20">Kreirajte novi restoran</p>
        <form action="#">
            <div class="row">
                <div class="col-md-3">
                    <label for="restourantName">Unesite ime restorana: </label>
                    <input type="text" id="restourantName" v-model="newRestaurant.name" class=" mt-2 input-custom" placeholder="Ime restorana"
                        required>
                </div>
                <div class="col-md-3">
                    <label for="status">Da li restoran radi: </label>
                    <select data-trigger="" id="status"   class="input-custom mt-2">
                        <option  value=true>Da</option>
                        <option  value=false>Ne</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="type">Unesite tip restorana: </label>
                    <select data-trigger="" id="type"  v-model="newRestaurant.restaurantType" class="input-custom mt-2">
                    <option v-for="option in typeOptions" :value="option">{{ option }}</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="restourantPicture"  >Unesite logo restorana: </label>
                    <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()" class=" mt-2 input-custom" placeholder="Slika proizvoda"
                        required>
                </div>
                <div class="col-md-6 mt-3">
                <label for="place">Unesite(grad) zip kod grada restorana: </label>
                <input type="text" id="cityName" v-model="newRestaurant.city" class=" mt-2 input-custom" placeholder="Grad"
                        required>
            </div>
            <div class="col-md-6 mt-3">
                <label for="place">Unesite ulicu i  broj: </label>
                <input type="text" id="streetName" v-model="newRestaurant.street" class=" mt-2 input-custom" placeholder="Ulica i broj"
                    required>
            </div>
            <div class="col-md-6 mt-3">
                <label for="place">Unesite postanski broj: </label>
                <input type="text" id="zipCode" class=" mt-2 input-custom" v-model="newRestaurant.zipCode" placeholder="Postanski broj"
                    required>
            </div>
                <div class="col-md-6 mt-3">
                    <label for="managerCombo">Unesite menadžera restorana: </label>
                    <select data-trigger="" id="managerCombo" @change="onChangeManager()"  v-model="newRestaurant.managerID" class="input-custom mt-2">
                        <option v-for="(m,index) in managers" :key="index" :value="m.id.toString()">{{ m | managerNameAndSurname }}</option>
                    </select>
                </div>
                <div class="col-md-6 mt-3" style="width:300px;">
                    <label for="startTime">Unesite pocetak radnog vremena: </label>
                    <select data-trigger="" id="startTime" v-model="newRestaurant.startHours" class="input-custom mt-2">
                        <option v-for="h in hours" :value="h">{{ h }}</option>
                    </select>
                </div>
                <div class="col-md-6 mt-3" style="width:270px;">
                    <label for="endTime">Unesite kraj radnog vremena: </label>
                    <select data-trigger="" id="endTime" v-model="newRestaurant.endHours" class="input-custom mt-2">
                        <option v-for="h in hours" :value="h">{{ h }}</option>
                    </select>
                </div>
            </div>
            <div class="text-end">
                <button type="submit" @click="addRestoran"  class="btn btn-primary fw-600 mt-3">Dodaj restoran</button>
            </div>
        </form>
        <button id="showFormAddManager" type="button" @click="addNewManager()" >Dodaj novog menadzera! </button>
        </br>
    </br>
        <div id="newManagerBox" class="toshow" style="visibility:hidden">
        <h3>Dodaj menadzera</h3>
    <div class="add-manager-form">
        <div class="d-flex  align-items-stretch ">

            <div class="flex-column">
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
                    
                    <div class="datepicker-style1" >
                        <vuejs-datepicker format="dd.MM.yyyy" v-model="user.birthday"  
                            placeholder="Datum rođenja" required>
                        </vuejs-datepicker>
                    </div>
                    <!-- BUTTON REGISTER -->
                    <div class="submitbtn-style1" >
                        <button type="submit" id="btnAddManager"  class="btn btn-warning fw-600 mt-3" >Dodaj </button>
                        <br><br>
                    </div>
                </form>
            </div>
        </div>
    </div>
    </div>
    </section>

</div>					 
    
    `
    ,
    mounted() {
		axios.get('rest/users/freeManagers')
        .then(response => {
            
            this.managers = response.data;
            console.log('aaaaappp' + this.managers[1].id);
            //this.managers = fixManagers(this.managers);
            console.log('aaaaappp' + this.managers[1].id);
            for( m in this.managers) {
  			temp.push(m.id.toString())
			}
        }
            )
        .catch(err => {
            console.log(err);
        });
	},
    methods: {
        onChangeFileUpload($event){
            this.file = this.$refs.file.files[0];
            this.encodeImage(this.file);
            console.log(this.newRestaurant.imgURL);
        },
        encodeImage(input){
            if(input){
                const reader = new FileReader()
                reader.onload=(e) => {
                    this.newRestaurant.imgURL = e.target.result}
                    reader.readAsDataURL(input)
                }
        },
        addNewManager : function(){
            if (this.isHidden) {
				document.getElementById("newManagerBox").style.visibility = 'visible';
				this.isHidden = false;
				console.log("visible");
			} else {
				document.getElementById("newManagerBox").style.visibility = 'hidden';
				this.isHidden = true;
				console.log("hidden");
				this.message = "";
			}
        },
        userRegister:function(event){
            event.preventDefault();
			if(this.checked == "z"){
				this.user.gender = "f";
			}else{
				this.user.gender = "m";
			}
            this.user.role = "MANAGER";
			axios
            .post('rest/users/registration',this.user)
            .then(response=> {
                console.log(response.data);
                toastr["success"]("Success log in!");
				this.checked = '';
				this.selected = '';
                this.getManagers();
                
                this.newRestaurant.managerID = response.data;
                console.log('Id novog managera restorana je :'+ this.newRestaurant.managerID);
                document.getElementById("managerCombo").disabled=true;
                document.getElementById("btnAddManager").disabled=true;

             })
             .catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            })
        },
        getManagers : function(){
            axios.get('rest/users/freeManagers')
            .then(response => this.managers = response.data)
            .catch(err => {
            console.log(err);
        });
        },
        addRestoran : function(){

            console.log(' ID MENADZERA:  '+this.newRestaurant.managerID);
            axios
            .post('rest/restaurants/',this.newRestaurant)            
            .then(response=> {
                console.log(response.data);
				console.log("dodat restoran");
                

             })
             .catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            })
        },
        onChangeManager : function(value){
            console.log(this.newRestaurant.managerID);
            console.log(this.newRestaurant.endHours);
            
        }

        

    },
    filters: {
        managerNameAndSurname : function(value){
            return value.name + ' ' + value.surname;
        }
    }
});