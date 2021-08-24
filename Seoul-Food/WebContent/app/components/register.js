Vue.component("register",{

    template:`
    
    <div class="container d-flex align-items-center justify-content-center">
    <div class="row mt-5 w-50">
        <div class="col-12 bg-white pt-4  rounded ">
            <p class="text-center fw-bold fs-20"> Registrujte se . </p>


            <div class="container-fluid ">

                <div class="d-flex align-items-stretch flex-column">

                    <div class="d-flex flex-column">

                        <input type="text" class=" input-custom" placeholder="Korisničko ime" required>
                        <input type="password" class="mt-3 input-custom" placeholder="Vaša lozinka" required>
                        <input type="text" class="mt-3  input-custom" placeholder="Ime" required>
                        <input type="text" class="mt-3  input-custom" placeholder="Prezime" required>
                        <input type="text" class="mt-3  input-custom" placeholder="Pol" required>
                        <input type="text" class="mt-3  input-custom" placeholder="Datum rođenja" required>

                        <button type="button" class="btn btn-warning fw-600 mt-3">Registrujte se </button>
                        <div class="text-center mt-3 fs-14 pb-4">
                            <div><router-link to="/" exact>Ulogujte se</router-link>
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