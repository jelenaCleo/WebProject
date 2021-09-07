 function fixDate(user) {
		
			user.birthday = new Date(parseInt(user.birthday)).toLocaleDateString();
			
			return user;
		}


Vue.component("admin-profil", {
	data() {
		return {
			user: {},
			editedUser: {
				username: '',
				name: '',
				surname: '',
				gender: '',
				role: '',
				password: '',
				birthday: new Date()
			},
			changedUser: {
				username: '',
				password: '',
				newPassword: '',
			},
			isHidden: true,
			message: '',
			mess1: '',
            mess2: '',
            mess3: '',
            mess4: '',
			serverMess: '',
		}
	},
	components: {
      	vuejsDatepicker
    },

	template: `
<div>
    <h1> Zdravo {{user.userName}}! </h1>
    <section class="container mt-4">
        <table class="table table-striped"  style="width:60%;">
            <thead>
                <tr>
                    <th style="width:150px;">Korisnicko ime</th>
                    <th style="width:150px;">Ime</th>
                    <th style="width:150px;">Prezime</th>
                    <th style="width:150px;">Pol(f/m)</th>
                    <th style="width:150px;">Uloga</th>
                    <th style="width:150px;">Datum rodjenja</th>
                </tr>
            </thead>
            <tbody>
                <td> <input style="width:150px;" v-on:change="restoreMess4()" class="form-control" type="text" v-model="editedUser.username" placeholder="Korisnicko ime"> </td>
                <td> <input style="width:150px;" v-on:change="restoreMess4()" class="form-control" type="text" v-model="editedUser.name" placeholder="Ime"> </td>
                <td> <input style="width:150px;" v-on:change="restoreMess4()" class="form-control" type="text" v-model="editedUser.surname" placeholder="Prezime"> </td>
                <td> <input style="width:150px;" v-on:change="restoreMess4()" class="form-control" type="text" v-model="editedUser.gender" placeholder="Pol"> </td>
                <td> <input style="width:150px;" v-on:change="restoreMess4()" class="form-control" type="text" v-model="editedUser.role" placeholder="Uloga" readonly> </td>
                <td> <vuejs-datepicker format="dd.MM.yyyy" v-model="editedUser.birthday" 
				placeholder="Datum rođenja">
			</vuejs-datepicker></td>
                </tr>
            </tbody>
        </table>
		</br>
		<label class="errorMess" >{{ mess4 }}</label>
		<label class="errorMess" >{{ serverMess }}</label>

    </section>
    <section class="container mt-4">
        <br><br>
        <button @click="saveChanges()"  class="btn btn-success fw-600 mt-3" ><i class="fa fa-check" aria-hidden="true"></i> Save changes
        </button>
        <button @click="showPasswordBox()"  class="btn btn-primary fw-600 mt-3"><i aria-hidden="true"></i> Promeni sifru
        </button>

        <div id="passwordBox" class="toshow" style="visibility:hidden">
            <div style="width:400px;">
                <br></br>
                <div style="width:200px; float:left;">
                    <label for="place" style="height:30px;margin-bottom:30px;">Trenutna lozinka: </label>
                    <br></br>
                    <label for="place" style="height:30px;margin-bottom:30px;">Nova lozinka: </label>
                    <br></br>
                    <label for="place" style="height:30px;margin-bottom:30px;">Potvrdite novu lozinku: </label>

                </div>
                <div style="width:200px; float:right;">
                    <input type="password" v-on:change="restoreMess1()" v-model="changedUser.password" class="form-control" placeholder="password">
					<label class="errorMess" >{{ mess1 }}</label>
                    <br></br>
                    <input type="password" v-on:change="restoreMess2()" v-model="changedUser.newPassword"  class="form-control" placeholder="new password">
					<label class="errorMess" >{{ mess2 }}</label>
                    <br></br>
                    <input id="passwordConfirm" v-on:change="restoreMess3()" type="password"  class="form-control" placeholder="new password">
					<label class="errorMess" >{{ mess3 }}</label>
                </div>
				</br>
            </div>
           

            <button @click="saveNewPassword()" style="margin-left:350px;"  class="btn btn-success fw-600 mt-3"><i class="fa fa-check" aria-hidden="true"></i> Sacuvaj novu lozinku </button>
        </div>
    </section>
	<p>{{this.message}}</p>

</div>
    
    `
	
	,
	methods: {

		showPasswordBox: function() {
			if (this.isHidden) {
				document.getElementById("passwordBox").style.visibility = 'visible';
				this.isHidden = false;
				console.log("visible");
			} else {
				document.getElementById("passwordBox").style.visibility = 'hidden';
				this.isHidden = true;
				console.log("hidden");
				this.message = "";
			}
		},
		saveNewPassword: function() {
			if ( this.requiredFieldsPassword() && this.user.password == this.changedUser.password) {
				this.changedUser.username = this.user.username;
				if (this.changedUser.newPassword == document.getElementById("passwordConfirm").value) {
					axios
						.post('rest/users/changePassword', this.changedUser)
						.then(response => {
							toastr["success"]("Success changes!!", "Success!");
							this.message = "sifra promenjena";
							this.serverMess = '';
						})
						.catch(err => {
							this.serverMess = 'Nemoguce sacuvati lozinku!';
							toastr["error"]("Failed during changes :(", "Fail");
						})
				}
			}
		},
		saveChanges: function() {
			if (this.requiredFields()) {
					console.log(this.editedUser.birthday + "editedUser birthday");
					console.log(this.user.birthday + "user birthday");
					axios
						.post('rest/users/editUser', this.editedUser)
						.then(response => {
							toastr["success"]("Success changes!!", "Success!");
							this.message = "user promenjen";
							this.serverMess = '';
						})
						.catch(err => {
							console.log(err);
							toastr["error"]("Failed during changes :(", "Fail");
							this.serverMess = 'Nemoguce sacuvati izmene: ' + 'korisnicko ime zauzeto';
						});
				
			}
		},
		requiredFields : function(){
            var a = true;
            if(this.editedUser.username === ''){
				a = false;
				this.mess4 = 'Morate popuniti sva polja!';
				console.log(this.mess4);
			}
			if(this.editedUser.name === ''){
				a = false;
				this.mess4 = 'Morate popuniti sva polja!';
				console.log(this.mess4);
			}
			if(this.editedUser.surname === ''){
				a = false;
				this.mess4 = 'Morate popuniti sva polja!';
				console.log(this.mess4);
			}
			if(this.editedUser.gender === ''){
				a = false;
				this.mess4 = 'Morate popuniti sva polja!';
				console.log(this.mess4);
			}
            return a;
        },
		requiredFieldsPassword : function(){
            var a = true;
			console.log('requiredFieldsPassword');
            if(this.changedUser.password === ''){
				a = false;
				this.mess1 = 'Morate popuniti ovo polje!';
				console.log(this.mess1);
			}
			if(this.changedUser.newPassword === ''){
				a = false;
				this.mess2 = 'Morate popuniti ovo polje!';
				console.log(this.mess2);
			}
			if(document.getElementById("passwordConfirm").value === ''){
				a = false;
				this.mess3 = 'Morate popuniti ovo polje!';
				console.log(this.mess3);
			}
            return a;
        },
		restoreMess1: function(){
            this.mess1 = ''; 
            console.log('mess1:' + this.mess1);
        },
        restoreMess2: function(){
            this.mess2 = ''; 
        },
        restoreMess4: function(){
            this.mess4 = ''; 
            console.log('mess1:' + this.mess1);
        },
        restoreMess3: function(){
            this.mess3 = ''; 
        },
	},

	mounted() {
		axios.get('rest/users/myProfile').then(response => {this.user = response.data;
		console.log(this.user.birthday);
		this.editedUser.username = this.user.username;
		this.editedUser.name = this.user.name;
		this.editedUser.surname = this.user.surname;
		this.editedUser.gender = this.user.gender;
		this.editedUser.role = this.user.role;
		
		console.log(this.editedUser.birthday + "before");
		//this.editedUser.birthday = new Date(parseInt(this.user.birthday)).toLocaleDateString();
		this.editedUser.birthday = this.user.birthday;
		this.editedUser.password = this.user.password;
		//this.user= fixDate(this.user);
		console.log(this.editedUser.birthday + "after");
	});

	},
	filters: {
		dateFormat: function(value, format) {
			var parsed = moment(value);
			return parsed.format(format);
		}
	}
});