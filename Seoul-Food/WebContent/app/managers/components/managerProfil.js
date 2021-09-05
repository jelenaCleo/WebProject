 function fixDate(user) {
		
			user.birthday = new Date(parseInt(user.birthday)).toLocaleDateString();
			
			return user;
		}


Vue.component("manager-profil", {
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
			message: ''
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
                    <th style="width:150px;">Pol</th>
                    <th style="width:150px;">Uloga</th>
                    <th style="width:150px;">Datum rodjenja</th>
                </tr>
            </thead>
            <tbody>
                <td> <input style="width:150px;" type="text" v-model="editedUser.username" placeholder="Name"> </td>
                <td> <input style="width:150px;" type="text" v-model="editedUser.name" placeholder="Name"> </td>
                <td> <input style="width:150px;" type="text" v-model="editedUser.surname" placeholder="Name"> </td>
                <td> <input style="width:150px;" type="text" v-model="editedUser.gender" placeholder="Name"> </td>
                <td> <input style="width:150px;" type="text" v-model="editedUser.role" placeholder="Name" readonly> </td>
                <td> <vuejs-datepicker format="dd.MM.yyyy" v-model="editedUser.birthday" 
				placeholder="Datum rođenja">
			</vuejs-datepicker></td>
                </tr>
            </tbody>
        </table>


    </section>
    <section class="container mt-4">
        <br><br>
        <button @click="saveChanges()" ><i class="fa fa-check" aria-hidden="true"></i> Save changes
        </button>
        <button @click="showPasswordBox()"><i aria-hidden="true"></i> Promeni sifru
        </button>

        <div id="passwordBox" class="toshow" style="visibility:hidden">
            <div style="width:400px;">
                <br></br>
                <div style="width:200px; float:left;">
                    <label for="place" style="height:30px;">Trenutna lozinka: </label>
                    <br></br>
                    <label for="place" style="height:30px;">Nova lozinka: </label>
                    <br></br>
                    <label for="place" style="height:30px;">Potvrdite novu lozinku: </label>

                </div>
                <div style="width:200px; float:right;">
                    <input type="password" v-model="changedUser.password" placeholder="password">
                    <br></br>
                    <input type="password" v-model="changedUser.newPassword" placeholder="new password">
                    <br></br>
                    <input id="passwordConfirm" type="password"  placeholder="new password">
                </div>

            </div>

            <button @click="saveNewPassword()"><i aria-hidden="true"></i> Sacuvaj novu lozinku </button>
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
			if (this.user.password == this.changedUser.password) {
				this.changedUser.username = this.user.username;
				if (this.changedUser.newPassword == document.getElementById("passwordConfirm").value) {
					axios
						.post('rest/users/changePassword', this.changedUser)
						.then(response => {
							toastr["success"]("Success changes!!", "Success!");
							this.message = "sifra promenjena";
						})
						.catch(err => {
							toastr["error"]("Failed during changes :(", "Fail");
						})
				}
			}
		},
		saveChanges: function() {
			if (true) {
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
						});
				
			}
		}
	},

	mounted() {
		console.log("profil medadzera");
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