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

	    <select v-model="roleSearch"  style="width:200px;height:30px;" class="custom-select" id="selectRole"  name="selectRole">
	                      		
	 		<option  value="ADMIN">Admin</option>
	  		<option  value="MANAGER">Menadžer</option>
			<option  value="DELIVERYMAN">Dostavljač</option>
	  		<option  value="BUYER">Kupac</option>
		</select>
		<button @click="clearRoleSearch()" for="selRole" style="width:30px;height:30px;margin-right: 6rem">X</button>
		<label for="selectType">Tip kupca:</label>

		<select v-model="classSearch"  style="width:200px;height:30px;" class="custom-select"  name="selectType">
								
			<option  value="1">Zlatni</option>
			<option  value="2">Srebrni</option>
			<option  value="3">Bronzani</option>
		</select>
		<button @click="clearClassSearch()" for="selectType" style="width:30px;height:30px;">X</button>

		</br>
		</br>
		<div  style="display: inline-block;">
		<button @click="sortByNameAscending()"  style="width:200px;height:30px;">Rastuce:ime</button>
		</br>
		<button @click="sortByNameDescending()"  style="width:200px;height:30px;">Opadajuce:ime</button>
		</div>
		<div style="display: inline-block;">
		<button @click="sortBySurnameAscending()"  style="width:200px;height:30px;">Rastuce:prezime</button>
		</br>
		<button @click="sortBySurnameDescending()"  style="width:200px;height:30px;">Opadajuce:prezime</button>
		</div>
		<div style="display: inline-block;">
		<button @click="sortByUsernameAscending()"  style="width:250px;height:30px;">Rastuce:korisnicko ime</button>
		</br>
		<button @click="sortByUsernameDescending()"  style="width:250px;height:30px;">Opadajuce:korisnicko ime</button>
		</div>
		<div style="display: inline-block;">
		<button @click="sortByPointsAscending()"  style="width:250px;height:30px;">Rastuce:bodovi</button>
		</br>
		<button @click="sortBypointsDescending()"  style="width:250px;height:30px;">Opadajuce:bodovi</button>
		</div>

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
									<th>Broj bodova</th>
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
							<td> {{ user.points | pointsFormat }} </td>
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
		sortByNameAscending: function () {
			function compare(a, b) {
				if (a.name < b.name)
				  return -1;
				if (a.name > b.name)
				  return 1;
				return 0;
			  }
		  
			this.users.sort(compare);
		},
		sortByNameDescending: function () {
			function compare(a, b) {
				if (a.name > b.name)
				  return -1;
				if (a.name < b.name)
				  return 1;
				return 0;
			  }
		  
			this.users.sort(compare);
		},
		sortBySurnameAscending: function () {
			function compare(a, b) {
				if (a.surname < b.surname)
				  return -1;
				if (a.surname > b.surname)
				  return 1;
				return 0;
			  }
		  
			this.users.sort(compare);
		},
		sortBySurnameDescending: function () {
			function compare(a, b) {
				if (a.surname > b.surname)
				  return -1;
				if (a.surname < b.surname)
				  return 1;
				return 0;
			  }
		  
			this.users.sort(compare);
		},
		sortByUsernameAscending: function () {
			function compare(a, b) {
				if (a.username < b.username)
				  return -1;
				if (a.username > b.username)
				  return 1;
				return 0;
			  }
		  
			this.users.sort(compare);
		},
		sortByUsernameDescending: function () {
			function compare(a, b) {
				if (a.username > b.username)
				  return -1;
				if (a.username < b.username)
				  return 1;
				return 0;
			  }
		  
			this.users.sort(compare);
		},
		sortByPointsAscending: function () {
			this.users.sort((a,b) => a.points > b.points ? 1 : -1);
		},
		sortByPointsDescending: function () {
			this.users.sort((a,b) => a.points < b.points ? 1 : -1);
		},
		clearRoleSearch : function(){
			this.roleSearch = undefined;
			
		},
		clearClassSearch : function(){
			this.classSearch = undefined;
		}

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
		},
		pointsFormat: function (value) {
			if (value == "0"){ return '';}
			else{
				return value;
			}
			
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