function formatDate(value){
		
		if(value == null ){
        	return;
    	}
		
		let val = value.toString();	
		var date = new Date(val.substring(4, 15));
		var day =  (date.getDate() > 9 ? '' : '0') + date.getDate();
		var month = ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1) 
		var year =  date.getFullYear();
		let datum = day+"-"+ month +"-"+year;
		return datum;	
}

Vue.component("orders",{
	data : function(){

		return{
			orders:[],
			
			
			namesearch:'',
			pricefrom:'',
			priceto: '',
			typesearch:'',
				
			datefrom:undefined,
			dateto:undefined,
			
			ordersearch:'',
			namecnt:true,
			pricecnt:true,
			datecnt: true,
			
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
				 	<option value="FastFood">FastFood</option>
                      </select>
                    
                      <!-- TODO :Filter using Range input --> 
			
					  <div  class="d-flex justify-content-center mx-5">
					
						<vuejs-datepicker  v-model="datefrom" format="dd-MM-yyyy" placeholder="Pocetni datum" class= "me-2"></vuejs-datepicker>
						
						<vuejs-datepicker v-model="dateto"  format="dd-MM-yyyy" placeholder="Krajnji datum" class= "ms-6"></vuejs-datepicker>

				
                    </div>
						
					<div id="range">
		
                      <input v-model="pricefrom" id="in2" type="number" placeholder="Cijena od" />
				  	  <input v-model="priceto" min=100000 id="in2" type="number" placeholder="Cijena do" />
						
					
                    </div>
					
					 <select v-model="ordersearch" id="in1" >
                           <option value=""> Sve porudžbine </option>
                          <option value="OBRADA">U Obradi</option>
                          <option value="NEDOSTAVLJENA">Nedostavljene</option>
                         
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
									<button v-on:click="pricecnt? sortByPriceAscending() : sortByPriceDescending()" data-toggle="button"  class="btn  btn-primary" ><i class=" fas fa-sort"></i></button>
								</th>
								<th class="th-sm">Datum
									<button v-on:click="datecnt? sortByDateAscending() : sortByDateDescending()" data-toggle="button"  class="btn  btn-primary" ><i class=" fas fa-sort"></i></button>
								</th>
								<th class="th-sm">Status</th>
								</th>
								<th class="th-sm"></th>
							</tr>
						</thead>
						
						<tbody v-for="(o,index) in filterOrders"">
							
							<tr>
							
								<th scope="row"> {{o.resName}} </th>
								<th> {{o.restaurantType}} </th>
								<td> {{o.order.price}} DIN </td>
								<td><span> {{o.order.oderDate}} </span></td>
							
								<td><a  class="btn btn-success"> {{o.order.status | filterStatus}} </a></td>
								<td><button v-on:click="cancelOrder(o.order.id)" :disabled="o.order.status != 'OBRADA'" class="btn btn-danger"> OTKAZI </button></td>
							
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
		axios
		 	.get('rest/orders/userOrders')
		 	.then(response => {this.orders = response.data})

			 if(this.orders != null){
				console.log(this.orders);
			 }

	},
	methods:{
		 sortByNameAscending:function(){
			function compare(a, b) {
                if (a.resName < b.resName)
                    return -1;
                if (a.resName > b.resName)
                    return 1;
                return 0;
            }

            this.orders.sort(compare);
            this.namecnt = false;
			
		},
		sortByNameDescending:function(){
			
			function compare(a, b) {
                if (a.resName > b.resName)
                    return -1;
                if (a.resName < b.resName)
                    return 1;
                return 0;
            }

            this.orders.sort(compare);
            this.namecnt = true;
		},
		sortByPriceAscending:function(){
			 function compare(a, b) {
                if (a.order.price < b.order.price)
                    return -1;
                if (a.order.price > b.order.price)
                    return 1;
                return 0;
            }

            this.orders.sort(compare);
            this.pricecnt = false;
			
		},
		sortByPriceDescending:function(){
			 function compare(a, b) {
                if (a.order.price > b.order.price)
                    return -1;
                if (a.order.price < b.order.price)
                    return 1;
                return 0;
            }

            this.orders.sort(compare);
            this.pricecnt = true;
			
		},
		sortByDateAscending:function(){
			  function compare(a, b) {
                if (a.order.oderDate < b.order.oderDate)
                    return -1;
                if (a.order.oderDate > b.order.oderDate)
                    return 1;
                return 0;
            }

            this.orders.sort(compare);
            this.datecnt = false;
			
		},
		sortByDateDescending:function(){
			
			 function compare(a, b) {
                if (a.order.oderDate > b.order.oderDate)
                    return -1;
                if (a.order.oderDate < b.order.oderDate)
                    return 1;
                return 0;
            }

            this.orders.sort(compare);
            this.datecnt = true;
		},
		
		  isSmaller: function (a, b) {
            if (a >= b)
                return false;
            if (a <= b)
                return true;
			
        },
        isBigger: function (a,b) {
            if (a <= b)
                return false;
            if (a >= b)
                return true;
 			
        },
		cancelOrder:function(ID){
			
			if(ID == null){
				return;
			}
			axios
				.put('rest/orders/cancel', ID)
				.then(response => this.orders = response.data);					
		}
		,
		getStatus:function(value){
			if (value == 'U_PRIPREMI') return 'NEDOSTAVLJENA';
			if (value == 'CEKA_DOSTAVU') return 'NEDOSTAVLJENA';
			if (value == 'U_TRANSPORTU') return 'NEDOSTAVLJENA';
			
			return value;
		}
	},
	
	computed:{

		filterOrders:function(){
		
			 var d1 = formatDate(this.datefrom) ;
             var d2 = formatDate(this.dateto);
             
             
    		console.log("Filter from: "+d1 +" Filter to: "+ d2);
			
			if(this.orders == null ){
				return;
				
				}
				return this.orders.filter((order)=>{
					var o = null;
					
					
					if(order.restaurantType == null){
						console.log(order.order.id);
						return;
					}
					let mainstatus = this.getStatus(order.order.status);
					
					if(order.restaurantType.match(this.typesearch) && order.resName.trim().toUpperCase().match(this.namesearch.trim().toUpperCase())
						
						&& mainstatus.match(this.ordersearch)){
							
							if(this.priceform !== ''){
								if(!this.isBigger(order.order.price,this.pricefrom)){
									return;
								}
							}
							
							if(this.priceto !== ''){
								if(!this.isSmaller(order.order.price,this.priceto)){
									return;
								}
							}
							if(this.datefrom !== undefined){
								if(!this.isBigger(order.order.oderDate,d1)){
									return;
								}
							}
							if(this.dateto !== undefined){
	                            if(!this.isSmaller(order.order.oderDate,d2)){
	                                    return;
	                            }
                        }
						
						o = order;
					}
					return o;
					});
		},		
		
	},
    filters: {
	/*  OBRADA,
		  U_PRIPREMI,
		  CEKA_DOSTAVU,
		  U_TRANSPORTU,
		  DOSTAVLJENA,
		  OTKAZANA*/
	
	
    	 filterStatus:function(value){
			if (value == 'U_PRIPREMI') return 'NEDOSTAVLJENA';
			if (value == 'CEKA_DOSTAVU') return 'NEDOSTAVLJENA';
			if (value == 'U_TRANSPORTU') return 'NEDOSTAVLJENA';
			
			if (value == 'OBRADA') return value;
			if (value == 'DOSTAVLJENA') return value;
			if (value == 'OTKAZANA') return value;
			
			//OBRADA DOSTAVLJENA I OTKAZANA
		}}	
});