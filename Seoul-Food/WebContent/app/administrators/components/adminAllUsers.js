Vue.component("admin-all-users", {
	data() {
		return {
			users: [],
			searchField: {
				userName: '',
				name: '',
				surname: '',
				role: ''
			},
			nameSearch: '',
			surnameSearch: '',
			usernameSearch: '',
			roleSearch: '',
			classSearch: ''
		}
	},

	template: `
    <div >
	  <section class="container mt-4">
        <p class="fw-bold fs-20">Prikaz svih registrovanih korisnika</p>
        <label for="nameSearch" style="width:200px;margin-right: 6rem;text-align: left;" >Unesite ime korisnika:</label>
		<label for="nameSearch" style="width:200px;margin-right: 6rem;" >Unesite ime korisnika:</label>
		<label for="nameSearch" style="width:200px;margin-right: 11rem;" >Unesite ime korisnika:</label>
        <form  class="example mt-2" style="margin-left: 2rem;">
            <input type="text"  v-model="nameSearch" class="input-custom1" placeholder="Pretrži po imenu.." name="search">
            <input type="text" v-model="surnameSearch" class="input-custom1" style="margin-left: 1rem;" placeholder="Pretrži po prezimenu.." name="search">
			<input type="text" v-model="usernameSearch" class="input-custom1" style="margin-left: 1rem;" placeholder="Pretrži po korisničkom imenu.." name="search">
			<button type="submit" style="width:100px;margin-left: 1rem;" ><i class="fa fa-search"></i></button>
			
        </form>
		</br>

		<label for="selRole">Uloga:</label>

	    <select v-model="roleSearch"  style="width:200px;height:30px;" class="custom-select"  name="selectRole">
	                      		
	 		<option  value="ADMIN">Admin</option>
	  		<option  value="MANAGER">Menadžer</option>
			<option  value="DELIVERYMAN">Dostavljač</option>
	  		<option  value="BUYER">Kupac</option>
		</select>
		<button for="selRole" style="width:30px;height:30px;margin-right: 6rem">X</button>
		<label for="selectType">Tip kupca:</label>

		<select v-model="classSearch"  style="width:200px;height:30px;" class="custom-select"  name="selectType">
								
			<option  value="1">Zlatni</option>
			<option  value="2">Srebrni</option>
			<option  value="3">Bronzani</option>
		</select>
		<button for="selectType" style="width:30px;height:30px;">X</button>


        <div class="ftco-section mt-4">
            <div class="row">
                <div class="col-md-12">
                    <div class="table-wrap">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Korisnicko ime</th>
                                    <th>Ime</th>
                                    <th>Prezime</th>
                                    <th>Pol</th>
                                    <th>Uloga</th>
                                    <th>Tip kupca</th>
                                    <th>Status</th>
									<th>Obrisan</th>
									<th>Sumnjiv</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in filteredUsers">
	                        <td> {{user.username}}</td>
	                        <td> {{user.name}} </td>
	                        <td> {{ user.surname }} </td>
	                        <td> {{ user.gender | genderFormat }} </td>
	                        <td> {{ user.role  | roleFormat }} </td>
	                        <td> {{ user.buyerClass | buyerTypeFormat }} </td>
	                        <td align ="center" >
                            <button v-if="user.blocked == '1' && user.role != 'ADMIN' " type="button" @click="unblockUser(user)" ><i class="fa fa-check" aria-hidden="true"></i> Odblokiraj </button>
                            <button v-if="user.blocked == '0' && user.role != 'ADMIN' " type="button" @click="blockUser(user)"  ><i class="fa fa-ban" aria-hidden="true"></i> Blokiraj </button>
                        	</td>
							<td align ="center" >
                            <button v-if="user.logicalDeleted == '1' && user.role != 'ADMIN' " type="button" @click="undeleteUser(user)" ><i class="fa fa-check" aria-hidden="true"></i> Restore </button>
                            <button v-if="user.logicalDeleted == '0' && user.role != 'ADMIN' " type="button" @click="deleteUser(user)"  ><i class="fa fa-ban" aria-hidden="true"></i> Obriši </button>
                        	</td>
                        	<td>da/ne</td>
                    </tr>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </section>
	</div>
	
    `
	,
	methods: {

		blockUser: function (userParam) {

			axios
				.post('rest/users/blockUser', userParam)
				.then(response => {
					this.users = [];
					this.users = response.data;
				})
				.catch(err => {
					console.log("\n\n ------- ERROR LOGIN-------\n");
					console.log(err);
					toastr["error"]("Password, username are incorrect, or your account is blocked!", "Fail");


					toastr["success"]("You make successful blocking user !!", "Successful  blocking!");
					return this.users;
				});

		},
		unblockUser: function (userParam) {
			console.log(userParam);
			console.log(userParam.username);
			axios
				.post('rest/users/unblockUser', userParam)
				.then(response => {
					this.users = [];
					this.users = response.data;
				})
				.catch(err => {
					console.log("\n\n ------- ERROR LOGIN-------\n");
					console.log(err);
					toastr["error"]("Password, username are incorrect, or your account is blocked!", "Fail");


					toastr["success"]("You make successful blocking user !!", "Successful  blocking!");
					return this.users;
				});
		},
		deleteUser: function (userParam) {

			axios
				.post('rest/users/deleteUser', userParam)
				.then(response => {
					this.users = [];
					this.users = response.data;
				})
				.catch(err => {
					console.log("\n\n ------- ERROR LOGIN-------\n");
					console.log(err);
					toastr["error"]("Password, username are incorrect, or your account is blocked!", "Fail");


					toastr["success"]("You make successful blocking user !!", "Successful  blocking!");
					return this.users;
				});

		},
		undeleteUser: function (userParam) {
			console.log(userParam);
			console.log(userParam.username);
			axios
				.post('rest/users/undeleteUser', userParam)
				.then(response => {
					this.users = [];
					this.users = response.data;
				})
				.catch(err => {
					console.log("\n\n ------- ERROR LOGIN-------\n");
					console.log(err);
					toastr["error"]("Password, username are incorrect, or your account is blocked!", "Fail");


					toastr["success"]("You make successful blocking user !!", "Successful  blocking!");
					return this.users;
				});
		},

	},
	mounted() {
		axios.get('rest/users/allUsers').then(response => {
			this.users = response.data;
			this.users.forEach(u => {
				u.buyerClass = u.buyerClass.toString();
			});
		});

	},
	filters: {
		genderFormat: function (value) {
			if (value == "f") {
				return 'ž';
			} else {
				return 'm';
			}
		},
		roleFormat: function (value) {
			if (value == "ADMIN") return 'Admin';
			if (value == "BUYER") return 'Kupac';
			if (value == "DELIVERYMAN") return 'Dostavljač';
			if (value == "MANAGER") return 'Menadžer';
		},
		buyerTypeFormat: function (value) {
			if (value == "0") return '';
			if (value == "1") return 'Zlatni';
			if (value == "2") return 'Srebrni';
			if (value == "3") return 'Bronzani';
		}
	}
	,
	computed: {

		filteredUsers: function () {
			console.log("usao u computed");

			if (this.users == null) {
				return;
			}

			return this.users.filter((user) => {

				if (user.name.match(this.nameSearch) && user.surname.match(this.surnameSearch) && user.username.match(this.usernameSearch)
					&& user.role.match(this.roleSearch) && user.buyerClass.match(this.classSearch)) {
					return user;
				}
			});
		}

	}
});