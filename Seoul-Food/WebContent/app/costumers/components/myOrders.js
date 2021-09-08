Vue.component("orders",{
	data : function(){

		return{
			namecnt:true,
			namesearch:null,
			datefrom:null,
			dateto:null,
			typesearch:"",
			ordersearch:"",
			pricefrom:"",
			priceto:"",
		}
	},
	template:`
	
	<div>
		<link rel="stylesheet" href="css/users/myOrders.css">
		  <section>
        
            <div class="main-banner d-flex align-items-center  text-white  text-center">
                <div class="container">
                    <h2>Pregled svih porudžbina</h2>
                </div>
                <span id="black-overlay"></span>
        
        
            </div>
        </section>
		
		
		
		
		
			<!-- Pretraga -->
			  <form class="form-inline ">
        
                    <div class="form-group">
                    <!-- Filter by TextBox query -->
                      <input v-model="namesearch" id="in1" type="text" placeholder="Ime restorana" />
					  
                      
                      <!-- Filter by Category -->
                      <select v-model="typesearch" id="in1" >
                           <option value=""> Svi restorani </option>
                          <option value="Italijanski">Italijanski</option>
                          <option value="Kineski">Kineski</option>
                          <option value="Indijski">Indijski</option>
						  <option value="Korejski">Korejski</option>
                      </select>
                    
                      <!-- TODO :Filter using Range input --> 
					<div id="range">
                      <input v-model="datefrom" id="in2" type="text" placeholder="Datum od" />
				      <input v-model="dateto" id="in2" type="text" placeholder="Datum do " />
                    </div>
					<div id="range">
                      <input v-model="pricefrom" id="in2" type="text" placeholder="Cijena od" />
				      <input v-model="priceto" id="in2" type="text" placeholder="Cijena do " />
                    </div>


					
					 <select v-model="ordersearch" id="in1" >
                           <option value=""> Sve porudžbine </option>
                          <option value="OBRADA">U Obradi</option>
                          <option value="U_PRIPREMI">U Pripremi</option>
                          <option value="U_TRANSPORTU">U Transportu</option>
						  <option value="DOSTAVLJENA">Dostavljene</option>
					  	<option value="OTKAZANA">Otkazane</option>
                      </select>


				</div>
        
                </form>
		
		<br>
		
		
				<div class="table-wrap">
					<table class=" table table-striped">
						<thead>
							<tr>
								<th class="th-sm">Restoran
									<button v-on:click="namecnt? sortByNameAscending() : sortByNameDescending()" data-toggle="button"  class="btn  btn-primary" ><i class=" fas fa-sort"></i></button>
								
								</th>
								<th class="th-sm">Tip Restorana
								
								</th>
								<th class="th-sm">Cena
									<button v-on:click="namecnt? sortByNameAscending() : sortByNameDescending()" data-toggle="button"  class="btn  btn-primary" ><i class=" fas fa-sort"></i></button>
								</th>
								<th class="th-sm">Datum
									<button v-on:click="namecnt? sortByNameAscending() : sortByNameDescending()" data-toggle="button"  class="btn  btn-primary" ><i class=" fas fa-sort"></i></button>
								</th>
								<th class="th-sm">Status</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<th scope="row">Italiano</th>
								<th >Italijanski</th>
								<td>2.450,00 DIN</td>
								<td><span>10-9-2021</span></td>
								<td><a href="#" class="btn btn-success">Dostavljena</a></td>
							</tr>
						</tbody>
	 
					</table>
				</div>

		<footer class="mt-5">
			<hr>
			<div class="container">
				<p class="text-center text-muted">© 2021 Maja & Jelena . Projekat iz WEB programiranja</p>
			</div>
		</footer>

	</div>
	
	
	`
	
	
});