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
		}
	},

	template: `
    <div >
	  <section class="container mt-4">
        <p class="fw-bold fs-20">Prikaz svih registrovanih korisnika</p>
        <label for="name">Unesite ime korisnika:</label>
        <form class="example mt-2">
            <input type="text" id="name" class="input-custom1" placeholder="Pretraga.." name="search">
            <button type="submit"><i class="fa fa-search"></i></button>
        </form>

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
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="user in users">
	                        <td> {{user.userName}}</td>
	                        <td> {{user.name}} </td>
	                        <td> {{ user.surname }} </td>
	                        <td> {{ user.gender }} </td>
	                        <td> {{ user.role }} </td>
	                        <td> {{ user.buyerClass }} </td>
	                        <td align ="center" >
                            <button v-if="user.blocked == '1' && user.role != 'ADMIN' " type="button" @click="unblockUser(user)" ><i class="fa fa-check" aria-hidden="true"></i> Unblock </button>
                            <button v-if="user.blocked == '0' && user.role != 'ADMIN' " type="button" @click="blockUser(user)"  ><i class="fa fa-ban" aria-hidden="true"></i> Block </button>
                        </td>
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

		blockUser: function(userParam) {

			axios
				.post('rest/users/blockUser', userParam )
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
		unblockUser: function(userParam) {
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

	},
	mounted() {
		axios.get('rest/users/allUsers').then(response => (this.users = response.data));

	},

});