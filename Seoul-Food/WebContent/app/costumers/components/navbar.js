Vue.component("navbar",{

    template:`
    
    <div >
	<nav class="navbar navbar-expand-lg navbar-light bg-light" >
        <div class="container-fluid ">
            <ul  class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="list-group-item list-group-item-primary" mt-2 mt-lg-0>
                    <router-link to="/" exact class="navbar-brand mb-0 h1"> Početna Strana </router-link>
                </li> 
                
                <li class="list-group-item list-group-item-primary" mt-2 mt-lg-0>
                    <router-link to="/myprofile" exact class="navbar-brand mb-0 h1"> Moj Profil </router-link>
                </li>    
                
                <li class="list-group-item list-group-item-primary" mt-2 mt-lg-0>
                    <router-link to="/cart" exact class="navbar-brand mb-0 h1"> Korpa </router-link>
                </li> 
				<li class="list-group-item list-group-item-primary" mt-2 mt-lg-0>
                    <router-link to="/orders" exact class="navbar-brand mb-0 h1"> Moje Porudžbine </router-link>
                </li > 
                <li style = "color: #084298; background-color: #cfe2ff;"><button @click="logout" class="navbar-brand mb-0 h1" style=" background-color: transparent; border: none;"> Log out </button></li>
            </ul>
        </div>
    </nav>

</div>		 
    
    
    `
    ,
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