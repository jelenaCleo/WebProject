Vue.component("login", {

    template: ` 

	<div class="container d-flex align-items-center justify-content-center">
	<div class="row mt-5 w-50">
		<div class="col-12 bg-white pt-4  rounded ">
			<p class="text-center fw-bold fs-20"> Ulogujte se . </p>
		
			
                <div class="container-fluid ">
                    
                    <div class="d-flex align-items-stretch flex-column">
                        
                        <div class="d-flex flex-column">
                            <input type="text" class=" input-custom" placeholder="E-adresa ili korisničko ime"
                                required>
                            <input type="password" class="mt-3 input-custom" placeholder="Lozinka" required>
                            <button type="button" class="btn btn-warning fw-600 mt-3">Prijavite se </button>

                            <div class="text-center mt-3 fs-14 pb-4">
                                <div>Nemate korisnički nalog? <router-link to="/register" exact >Registrujte se</router-link>
                                </div>


                            </div>
                        </div>
			        </div>
		        </div>
				
	        
	
		
		</div>
	</div>
</div>	


`

});