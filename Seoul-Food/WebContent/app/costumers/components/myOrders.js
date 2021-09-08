Vue.component("orders",{
	data : function(){

		return{
			orders:{},
			
			namecnt:true,
			namesearch:null,
			datefrom:"",
			datefromstr:"",
			dateto:"",
			datetostr:"",
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
					<vuejs-datepicker  v-model="datefrom" format="dd-MM-yyyy"></vuejs-datepicker>
					<vuejs-datepicker v-model="dateto" format="dd-MM-yyyy"></vuejs-datepicker>
		
						<p>{{ datefrom | dateFormatFrom('DD.MM.YYYY')}}</p> 
					    <p>{{ dateto | dateFormatTo('DD.MM.YYYY')}}</p> 

						
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
	
	
	`,
	components: {
      	vuejsDatepicker
    },

	mounted(){
		// axios
		// 	.get('rest/orders/newOrders')
		// 	.then(response => {this.orders = response.data})

	},
	
	computed:{

		filterOrders:function(){

		

		}

	},
    filters: {
    	dateFormatFrom: function (value, format) {
				
			
		
			if(value == null ){
				return;
			}
			
			console.log(value);
			console.log(format);
			console.log(this.datefrom);
			
			let newVal = value;
			let val = newVal.toString();
			console.log(val);
			value = val.substring(4, 15);
			console.log("this dafag==>" + value);
			let month = value.substring(0,3);
			let day = value.substring(4,6);
			let year = value.substring(7,11);
			console.log("my shit => " + month );
			console.log("my shit => " + day );
			console.log("my shit => " + year );
			let mon=""
			if(month=="Jan"){
				mon = "01";
			}else if(month=="Feb"){
				mon = "02";
			}else if(month=="Mar"){
				mon = "03";
			}else if(month=="Apr"){
				mon = "04";
			}else if(month=="May"){
				mon = "05";
			}else if(month=="Jun"){
				mon = "06";
			}else if(month=="Jul"){
				mon = "07";
			}else if(month=="Aug"){
				mon = "08";
			}else if(month=="Sep"){
				mon = "09";
			}else if(month=="Oct"){
				mon = "10";
			}else if(month=="Nov"){
				mon = "11";
			}else if(month=="Dec"){
				mon = "12";
			}
			let datum = day+"-"+ mon +"-"+year;		
			this.datefromstr = datum;
			console.log("EVEGA JELENA datefromstr: " + this.datefromstr);
			
			// new Date(parseInt(s.datumRodjenja));
			
    	},
			dateFormatTo: function (value, format) {
				
			
		
			if(value == null ){
				return;
			}
			
			console.log(value);
			console.log(format);
			console.log(this.datefrom);
			
			let newVal = value;
			let val = newVal.toString();
			console.log(val);
			value = val.substring(4, 15);
			console.log("this dafag==>" + value);
			let month = value.substring(0,3);
			let day = value.substring(4,6);
			let year = value.substring(7,11);
			console.log("my shit => " + month );
			console.log("my shit => " + day );
			console.log("my shit => " + year );
			let mon=""
			if(month=="Jan"){
				mon = "01";
			}else if(month=="Feb"){
				mon = "02";
			}else if(month=="Mar"){
				mon = "03";
			}else if(month=="Apr"){
				mon = "04";
			}else if(month=="May"){
				mon = "05";
			}else if(month=="Jun"){
				mon = "06";
			}else if(month=="Jul"){
				mon = "07";
			}else if(month=="Aug"){
				mon = "08";
			}else if(month=="Sep"){
				mon = "09";
			}else if(month=="Oct"){
				mon = "10";
			}else if(month=="Nov"){
				mon = "11";
			}else if(month=="Dec"){
				mon = "12";
			}
			let datum = day+"-"+ mon +"-"+year;		
			this.datetostr = datum;
			console.log("EVEGA JELENA datetostr: " + this.datetostr);
			
			// new Date(parseInt(s.datumRodjenja));
			
    	},
		
		
	}

	
	
});