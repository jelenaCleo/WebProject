function fixManagers(managers) {
	console.log(managers);
    	
    for(m in managers){
        console.log(m.id);
        m.id = m.id.toString();
    }
    return managers;
}

Vue.component("add-item",{
    data() {
		return {
			file : {},
            newArticle : {
                name : '',
                price : 0.0,
                type : '',
                restaurantID : '',
                quantity : '',
                measure : '',
                description : '',
                image : '',
            },
            typeOptions: [
            {
            	typeName:'Hrana',
            	typeID:0
            },
            {
            typeName:'Pice',
            	typeID:1
            }
                
            ],
            mess0: ' ',
            mess1: ' ',
            mess2: ' ',

		}
	},

    template: `
    <div >
    <section class="container mt-4">
        <p class="fw-bold fs-20">Kreirajte novi artikal</p>
        <form action="#/" v-on:submit="addArticle">
            <div class="row">
                <div class="col-md-3">
                    <label id="nameLabel" for="articleName">Unesite ime artikla: </label>
                    <input type="text" v-on:change="restoreNameErrMess()" id="articleName" v-model="newArticle.name" class=" mt-2 input-custom" placeholder="Naziv artikla"
                        required>
                        <label class="errorMess" >{{ mess0 }}</label>
                </div>
                <div class="col-md-3">
                    <label for="articlePrice">Cena: </label>
                    <input type="double" id="articlePrice" v-on:change="restorePriceErrMess()" v-model="newArticle.price" class=" mt-2 input-custom" placeholder="Cena"
                        required>
                        <label class="errorMess" >{{ mess1 }}</label>
                </div>
                <div class="col-md-3">
                    <label for="type">Tip artikla: </label>
                    <select data-trigger="" id="type"  v-model="newArticle.type" class="input-custom mt-2" required>
                    <option v-for="o in typeOptions" :value="o.typeID.toString()">{{ o.typeName }}</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="file"  >Slika artikla: </label>
                    <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()" class=" mt-2 input-custom" placeholder="Slika proizvoda"
                    required >
                </div>
                <div class="col-md-6 mt-3">
                <label for="articleQuantity">Kolicina:</label>
                <input type="text" id="articleQuantity" v-on:change="quantityChange();restoreQuanErrMess()" v-model="newArticle.quantity" class=" mt-2 input-custom" placeholder="Kolicina">
                <label class="errorMess">{{ mess2 }}</label>
            </div>
            <div class="col-md-6 mt-3">
                <label for="acrticleMeasure">Jedinica za kolicinu:</label>
                <input type="text" id="acrticleMeasure" v-model="newArticle.measure" class=" mt-2 input-custom" placeholder="Jedinica za kolicinu">
            </div>
            <div class="col-md-6 mt-3">
                <label>Opis</label>
                <input type="text" id="acrticleDescription" v-model="newArticle.description" class=" mt-2 input-custom" placeholder="Opis">
            </div>
                
            </div>
            <div class="text-end">
                <button type="submit"  class="btn btn-primary fw-600 mt-3">Dodaj artikal</button>
            </div>
        </form>
        
        
    </section>

</div>					 
    
    `
    ,
    mounted() {
		console.log("stranica za dodavanje artikla");
        var path = location.href;
		var restID = path.split('/addIthem/')[1];
		console.log("putanja: " + path +"\n" + restID);
		var id = restID.replace('%20', ' ');
        console.log('ID RESTORANA: '+id);
        this.newArticle.restaurantID = id;
	},
    methods: {
        onChangeFileUpload($event){
            this.file = this.$refs.file.files[0];
            this.encodeImage(this.file);
            console.log(this.newArticle.image);
        },
        encodeImage(input){
            if(input){
                const reader = new FileReader()
                reader.onload=(e) => {
                    this.newArticle.image = e.target.result}
                    reader.readAsDataURL(input)
                }
        },
        addArticle : function(event){
        
        
        	event.preventDefault();
			console.log("pritisnuto dugme za potvrdu dodavanja artikla");
            if(this.inputValidate()){
                axios
            .put('rest/restaurants/' + this.newArticle.restaurantID + '/newArticle',{
                "name":this.newArticle.name,
                "price":this.newArticle.price,
                "type":this.newArticle.type,
                "quantity":this.newArticle.quantity,
                "measure":this.newArticle.measure,
                "description":this.newArticle.description,
                "image": this.newArticle.image
                })            
            .then(response=> {
                var v = response.data;
                if(v === ''){
                    toastr["error"]("Korisničko ime već postoji!");
                    this.mess0 = 'Korisničko ime već postoji!' ;          
                   }else{
                    location.href = '/Seoul-Food/managerHome.html';
                }

             })
             .catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            })
            }
            
        },
        quantityChange: function(){
            if(this.newArticle.quantity!=''){
                document.getElementById("acrticleMeasure").required = true;
            }else{
                document.getElementById("acrticleMeasure").required = false;
            }
            
        },
        restoreNameErrMess: function(){
            this.mess0 = ' '; 
        },
        restorePriceErrMess: function(){
            this.mess1 = ' '; 
            console.log('mess1:' + this.mess1);
        },
        restoreQuanErrMess: function(){
            this.mess2 = ' '; 
        },
        inputValidate: function(){
            var a = true;
            if(!parseFloat(this.newArticle.price)){
                this.mess1='Ovo polje ne može sadržati znakove osim brojeva i . !';
                console.log('aaaaaaaaaa');
                a = false;
            }
            if(this.newArticle.quantity!='' && !parseFloat(this.newArticle.quantity)){
                this.mess2='Ovo polje ne može sadržati znakove osim brojeva i . !';
                console.log('aaaaaaaaaa');
                a = false;
            }
            return a;
        }

        

    },
});