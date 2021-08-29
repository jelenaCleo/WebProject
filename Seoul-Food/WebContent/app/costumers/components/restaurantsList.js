Vue.component("reslist",{

 
  template:
  `
  <div id="appCostumer" align="center">

  <section>
      
      <div class="main-banner d-flex align-items-center  text-white  text-center">
        <div class="container">
            <h2>Lista restorana u Vašoj blizini</h2>
        </div>
        <span id="black-overlay"></span>


      </div>
  </section>
  <section >
    <input id="search" type="text" placeholder="Unesite ime restorana" />
    <br><br>
   <div class="filter-head" >
    <div class="text-center mt-3 fs-14 pb-4">
    <h1 class="text-dark">Napredna pretraga</h1>    
    </div>
   
    <form class="form-inline ">

        <div class="form-group">
       
            
                <select id="in1" data-trigger="">
                    <option placeholder="" value="">Lokacija</option>
                    <option>Bijeljina</option>
                    <option>Brčko</option>
                    <option>Novi Sad</option>
                </select>
           
                <select id="in1" data-trigger="">
                    <option placeholder="" value="">Tip restorana</option>
                    <option>Italijanski</option>
                    <option>Korejski</option>
                    <option>Indijski</option>
                </select>
                <select id="in1" data-trigger="">
                    <option placeholder="" value="">Ocjena</option>
                    <option>1*</option>
                    <option>2*</option>
                    <option>3*</option>
                    <option>4*</option>
                    <option>5*</option>
                </select>
                <br><br><br>
                <div class="row third">
                    <div class="input-field">
                        <div class="group-btn">
                            <button class="btn-delete" id="delete">RESET</button>
                            <button class="btn-search">SEARCH</button>
                        </div>
                     </div>
                </div>
        </div>

     </form>
    </div>
  </section>
  <section class="container">

    <p class="fw-bold fs-20">Otvoreni objekti</p>

  <div class="restourant-search py-3">
    <div class="row align-items-center ">
        <div class="col-4">
            <img src="assets/imgs/restourant-1.jpg" class="restourant-logo" alt="Image not found">
        </div>
        <div class="col-8">
            <div class="d-flex justify-content-around align-items-center">
                <div>
                    <p class="restourant-name ">House bar & kitchen</p>
                    <span class="restourant-price">Pica - 40' • Min. 6,00KM • Besplatna dostasva</span>
                </div>
                <div class="restourant-mark">
                    <i class="fas fa-star"></i>
                    <span>4.5</span>
                </div>
            </div>
        </div>
        <div class="my-2">
            <hr>
        </div>
    </div>
  </div>
</section>
<section class="container mt-5">
    <p class="fw-bold fs-20">Zatvoreni objekti</p>
    <div class="restourant-search py-3">
        <div class="row align-items-center ">
            <div class="col-4">
                <img src="assets/imgs/restourant-4.jpg" class="restourant-logo" alt="Image not found">
            </div>
            <div class="col-8">
                <div class="d-flex justify-content-around align-items-center">
                    <div>
                        <p class="restourant-name ">San Marco Bijeljina</p>
                        <span class="restourant-price">Pica - 40' • Min. 6,00KM • Besplatna dostasva</span>
                    </div>
                    <div class="restourant-mark">
                        <i class="fas fa-star"></i>
                        <span>4.1</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>









</div>




  `

});