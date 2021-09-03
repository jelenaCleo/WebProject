Vue.component("restpage",{
	
	data:function(){
		return{
			user : null,
			restaurant : null,
		}
	},
	
	template:
	`
	<div>
	<h1>test proba </h1>
	<a v-on:click="f"></a>
	</div>
	
	`,
	mounted(){
		//axios.get()
		//.then()
		
		var path = location.href;
		var restID = path.split('/restpage/')[1];
		/**What is %20 in the url?
		URL-encoding from %00 to %8f
		ASCII -	URL-encode
		space -	  %20 
		*/
		console.log("DUG JE PUT: " + path +"\n" + restID);
		var id = restID.replace('%20', ' ');
		//this.restaurant = response.data
		console.log("id koji trazm:"+ id);
		axios.get('rest/restaurants/' + id) 
			.then(response =>(
				this.restaurant = response.data
			));
			
	},
	methods:{
		f:function(){
			console.log("Restoran page: " + this.restaurant.name);
		}
		
	}
	
	
	
});