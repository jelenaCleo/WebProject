Vue.component("admin-profil", {
	data() {
		return {
			user: {},
			changedUser: {},
			isHidden : true
		}
	},

	template: `
<div>
    <h1> Zdravo {{user.userName}}! </h1>
    <section class="container mt-4">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>Korisnicko ime</th>
                    <th>Ime</th>
                    <th>Prezime</th>
                    <th>Pol</th>
                    <th>Uloga</th>
                    <th>Datum rodjenja</th>
                </tr>
            </thead>
            <tbody>

                <td> <input type="text" v-model="user.username" placeholder="Name"> </td>
                <td> <input type="text" v-model="user.name" placeholder="Name"> </td>
                <td> <input type="text" v-model="user.surname" placeholder="Name"> </td>
                <td> <input type="text" v-model="user.gender" placeholder="Name"> </td>
                <td> <input type="text" v-model="user.role" placeholder="Name" readonly> </td>
                <td> <input type="text" v-model="user.birthday" placeholder="Name"> </td>
                <td align="center">
                    <button v-if="user.blocked == '1' && user.role != 'ADMIN' " type="button"
                        @click="unblockUser(user)"><i class="fa fa-check" aria-hidden="true"></i> Unblock </button>
                    <button v-if="user.blocked == '0' && user.role != 'ADMIN' " type="button"
                        @click="blockUser(user)"><i class="fa fa-ban" aria-hidden="true"></i> Block </button>
                </td>
                </tr>

            </tbody>
        </table>
        
        
    </section>
    <br><br>
    <button @click="saveChanges()" class="saveChanges"><i class="fa fa-check" aria-hidden="true"></i> Save changes
    </button>
    <br><br>
    <button @click="showPasswordBox()"><i class="fa fa-check" aria-hidden="true"></i> Promeni sifru
    </button>
    
	<div id="passwordBox" class="toshow" style="visibility:hidden"  >
        
        <p>uuuuuuu</p>
    </div>
	

	
</div>	 
    
    `
    ,
    methods: {

		showPasswordBox: function() {
		if(this.isHidden){
			document.getElementById("passwordBox").style.visibility = 'visible' ;
			this.isHidden = false;
			console.log("visible");
			}else{
			document.getElementById("passwordBox").style.visibility = 'hidden' ;
			this.isHidden = true;
			console.log("hidden");
			}
		}
	},
	mounted() {
		axios.get('rest/users/myProfile').then(response => (this.user = response.data));

	}
});