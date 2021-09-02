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
            
            </ul>
        </div>
    </nav>

</div>		 
    
    
    `


});