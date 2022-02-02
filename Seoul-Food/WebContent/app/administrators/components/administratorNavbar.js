Vue.component("admin-navbar",{


    template: `
    <div >
	<nav class="navbar navbar-expand-lg navbar-light bg-light" >
        <div class="container-fluid ">
            <ul  class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li  class="list-group-item list-group-item-primary ">
                    <router-link to="/" exact  class="navbar-brand mb-0 h1" > Početna </router-link>                    
                </li>                
                <li class="list-group-item list-group-item-primary" mt-2 mt-lg-0>
                    <router-link to="/adminProfil" exact class="navbar-brand mb-0 h1">Moj profil</router-link>
                </li> 
                <li class="list-group-item list-group-item-primary" mt-2 mt-lg-0>
                    <router-link to="/createRestaurant" exact class="navbar-brand mb-0 h1">Dodaj restoran</router-link>
                </li> 
                <li class="list-group-item list-group-item-primary" mt-2 mt-lg-0>
                    <router-link to="/allUsers" exact class="navbar-brand mb-0 h1">Svi korisnici</router-link>
                </li> 
                <li class="list-group-item list-group-item-primary" mt-2 mt-lg-0>
                    <router-link to="/createUser" exact class="navbar-brand mb-0 h1">Dodaj menadžera ili dostavljača</router-link>
                </li>    
                <li class="list-group-item list-group-item-primary" mt-2 mt-lg-0>
                    <router-link to="/comments" exact class="navbar-brand mb-0 h1">Komentari</router-link>
                </li>   
            	<li><button @click="logout" > Log out </button></li>
            </ul>
        </div>
    </nav>

</div>		 
    
    `,
     methods: {
        logout: function(event){
            event.preventDefault
            axios
            .get('rest/users/logout')
            .then(response => {
                location.href = response.data;
            })
            .catch(err => {
                console.log(err);
                alert('Error during log out');
            })
        }
    },
});