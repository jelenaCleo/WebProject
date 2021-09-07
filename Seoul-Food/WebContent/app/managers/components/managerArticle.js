Vue.component("show-article",{
	
	data:function(){
		return{
            article: null,
            deletedMessage: '',
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
            restaurantID: '',
            mess1: ' ',
            mess2: ' ',
            mess3: ' ',
            mess4: ' ',

		}
	},
	
	template:
	`
	<div  >
        <section class="container mt-5">
    
            <div class="box-shadow mt-3 px-4 py-4">
                <div class="row align-items-center">
                    <div class="col-6">
                        <p class="fw-bold fs-15" style="margin: 2rem;">O artiklu</p>
    
                        <div class="border-bottom working" >
                            <p class="working-day">Naziv:</p>
                            <input disabled=true type="text" id="name" v-model="article.name" readonly >
                          
                        </div>
                        <div class="border-bottom working">
                            <p class="working-day">Cena:</p>
                            <input disabled=true type="text" id="price" v-on:change="restorePriceErrMess();restorePriceReqMess()"  v-model="article.price" > 
                            
                        </div>
                        <label class="errorMess" >{{ mess1 }}</label>
                        <label class="errorMess" >{{ mess4 }}</label>
						<div class="border-bottom working">
                            <label class="working-day" v-if="article.type == 0">Tip: Hrana</label>
                        </div>
                        <div class="border-bottom working">
                            <label class="working-day" v-if="article.type == 1">Tip: Pice</label>
                            <p class="working-day">Novi tip:</p>
                            <select data-trigger="" id="type"  v-model="article.type" class="input-custom mt-2" disabled=true>
                            <option v-for="o in typeOptions" :value="o.typeID.toString()">{{ o.typeName }}</option>
                            </select>
                        </div>


                        <div class="border-bottom working">
                            <p class="working-day">Kolicina:</p>
                            <input disabled=true type="text" id="quantity" v-on:change="restoreQuanErrMess()" v-model="article.quantity"> 
                           
                        </div>
                        <label class="errorMess" >{{ mess2 }}</label>
                        <div class="border-bottom working">
                            <p class="working-day">Jedinica:</p>
                            <input disabled=true type="text" id="measure" v-on:change="restoreMeReqMess()" v-model="article.measure"  > 
                        </div>
                        <label class="errorMess" >{{ mess3 }}</label>

                        <div class="border-bottom working">
                            <p class="working-day">Opis:</p>
                            <input disabled=true type="text" id="description"  v-model="article.description" > 
                        </div>
                        <div class="border-bottom working">
                            <p class="working-day">Nova slika:</p>
                            <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()" class=" mt-2 input-custom" placeholder="Slika proizvoda" disabled=true>
                        </div>

    
                    </div>
                     <div class="col-6 ">
                        <div>
                            <img v-bind:src="article.image" class="address-picture" alt="address">
                            </br></br></br>    
                        </div>
                        <button type="button" @click="toEditMode()" id="toEditBtn"  class="btn btn-primary btn-sm">IZMENI</button>
                        <button type="button" @click="saveChanges()" id="saveBtn"  class="btn btn-success btn-sm" disabled=true>SAČUVAJ IZMENE</button>
                        </div>
                        
                        
                    
                </div>
               
            </div> 
              
        </section>
    </div>
	
	`,
	mounted(){
        console.log('usao u mounted')
        var path = location.href;
		var artTemp = path.split('/article/')[1];
        var temp =  path.split('/article/')[0];
        var resTemp = temp.split('#/')[1];
		this.restaurantID = resTemp;
		
		axios.get('rest/restaurants/' + resTemp + '/article/' + artTemp) 
			.then(response =>{
				this.article = response.data;
            }).catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            });
			
	},
	methods:{
        saveChanges: function(){
            if( this.requiredFields() && this.inputValidate() ){
            axios.put('rest/restaurants/' + this.restaurantID  + '/editArticle',{
                "name":this.article.name,
                "price":this.article.price,
                "type":this.article.type,
                "quantity":this.article.quantity,
                "measure":this.article.measure,
                "description":this.article.description,
                "image": this.article.image
            }) 
			.then(response =>{
				var v = response.data;
                if(v === ''){
                    toastr["error"]("Izmena nije sacuvana!");        
                   }else{
                    location.href = '/Seoul-Food/managerHome.html';
                    }
            }).catch(err  =>{ 
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);
               
            });
        }

        },
        toEditMode: function(){
			document.getElementById("price").disabled=false;
            document.getElementById("type").disabled=false;
            document.getElementById("quantity").disabled=false;
            document.getElementById("measure").disabled=false;
            document.getElementById("description").disabled=false;
            document.getElementById("file").disabled=false;
            document.getElementById("saveBtn").disabled=false;
        },
        onChangeFileUpload($event){
            this.file = this.$refs.file.files[0];
            this.encodeImage(this.file);
            console.log(this.article.image);
        },
        encodeImage(input){
            if(input){
                const reader = new FileReader()
                reader.onload=(e) => {
                    this.article.image = e.target.result}
                    reader.readAsDataURL(input)
                }
        },
        restorePriceErrMess: function(){
            this.mess1 = ' '; 
            console.log('mess1:' + this.mess1);
        },
        restoreQuanErrMess: function(){
            this.mess2 = ' '; 
        },
        restorePriceReqMess: function(){
            this.mess4 = ' '; 
            console.log('mess1:' + this.mess1);
        },
        restoreMeReqMess: function(){
            this.mess3 = ' '; 
        },
        inputValidate: function(){
            var a = true;
            if(!parseFloat(this.article.price)){
                this.mess1='Ovo polje ne može sadržati znakove osim brojeva i . !';
                console.log('aaaaaaaaaa');
                a = false;
            }
            if(this.article.quantity!='' && !parseFloat(this.article.quantity)){
                this.mess2='Ovo polje ne može sadržati znakove osim brojeva i . !';
                console.log('aaaaaaaaaa');
                a = false;
            }
            return a;
        },
        quantityChange: function(){
            if(this.article.quantity!=0){
                document.getElementById("acrticleMeasure").required = true;
                console.log('required');
            }else{
                document.getElementById("acrticleMeasure").required = false;
                console.log(' not required');
            }
            
        },
        requiredFields : function(){
            var a = true;
            if(this.article.price!=0){
                if(this.article.quantity!=0){
                    if(this.article.measure==''){
                        a = false;
                        this.mess3 = 'Ovo polje je obavezno!';
                    }
                }
            }else{
                a = false;
                this.mess4 = "Ovo polje je obavezno!"
            }
            return a;
        }

		
	}
	
	
	
});