Vue.component("create-restaurant",{
    data() {
		return {
			file : {},
            managers: [],
            newRestaurant : {
                name : '',
                restaurantType : '',
                working : undefined,
                imgURL : '',
                street : '',
                city : '',
                zipCode : '',
                longitude : 0.0,
                latitude : 0.0,
                managerID : '',
            },
            typeOptions: [
                "Korejski",
                "Kineski",
                "Italijanski",
                "FastFood",
                "Pekara",
                "Poslasticarnica",
            ]

		}
	},

    template: `
    <div >
        <section class="container mt-4">
            <p class="fw-bold fs-20">Kreirajte novi restoran</p>
            <form action="#">
                <div class="row">
                    <div class="col-md-3">
                        <label for="restourantName">Unesite ime restorana: </label>
                        <input type="text" id="restourantName" v-model="newRestaurant.name" class=" mt-2 input-custom" placeholder="Ime restorana"
                            required>
                    </div>
                    <div class="col-md-3">
                        <label for="status">Da li restoran radi: </label>
                        <select data-trigger="" id="status"  v-model="newRestaurant.working" class="input-custom mt-2">
                            <option  value=true>Da</option>
                            <option  value=false>Ne</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="type">Unesite tip restorana: </label>
                        <select data-trigger="" id="type"  v-model="newRestaurant.restaurantType" class="input-custom mt-2">
                        <option v-for="option in typeOptions" :value="option">{{ option }}</option>
                        </select>
                    </div>
                    <div class="col-md-3">
                        <label for="restourantPicture"  >Unesite logo restorana: </label>
                        <input type="file" id="file" ref="file" v-on:change="onChangeFileUpload()" class=" mt-2 input-custom" placeholder="Slika proizvoda"
                            required>
                    </div>
                    <div class="col-md-6 mt-3">
                    <label for="place">Unesite(grad) zip kod grada restorana: </label>
                    <input type="text" id="cityName" v-model="newRestaurant.city" class=" mt-2 input-custom" placeholder="Grad"
                            required>
                </div>
                <div class="col-md-6 mt-3">
                    <label for="place">Unesite ulicu i  broj: </label>
                    <input type="text" id="streetName" v-model="newRestaurant.street" class=" mt-2 input-custom" placeholder="Ulica i broj"
                        required>
                </div>
                <div class="col-md-6 mt-3">
                    <label for="place">Unesite postanski broj: </label>
                    <input type="text" id="zipCode" class=" mt-2 input-custom" v-model="newRestaurant.zipCode" placeholder="Postanski broj"
                        required>
                </div>
                    <div class="col-md-6 mt-3">
                        <label for="manager">Unesite menadžera restorana: </label>
                        <select data-trigger="" id="manager" class="input-custom mt-2">
                            <option v-for="m in managers" :value="m.id">{{ option }}</option>
                        </select>
                    </div>
                </div>
                <div class="text-end">
                    <button type="submit" class="btn btn-primary fw-600 mt-3">Dodaj restoran</button>
                </div>
            </form>
        </section>
    
    </div>			 
    
    `
    ,
    methods: {
        onChangeFileUpload($event){
            this.file = this.$refs.file.files[0];
            this.encodeImage(this.file);
            console.log(this.newRestaurant.imgURL);
        },
        encodeImage(input){
            if(input){
                const reader = new FileReader()
                reader.onload=(e) => {
                    this.newRestaurant.imgURL = e.target.result}
                    reader.readAsDataURL(input)
                }
        },
        

    }
});