function fixDate(value) {
    var format = "dd-MM-yyyy";


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
    //this.datetostr = datum;
    //console.log("EVEGA JELENA datetostr: " + this.datetostr);
    return datum;
}


Vue.component("dmOrders-page", {
    data() {
        return {
            user: {},
            orders: [],
            myOrders: [],
            priceFrom: '',
            priceTo: '',
            dateFrom: undefined,
            dateTo:  undefined,
            statusFilter: '',
            sortDate: false,
            sortPrice: false,
        }
    },
	components: {
      	vuejsDatepicker
    },

    template: `
    
    <section class="container mt-4">
        <p class="fw-bold fs-20">Prikaz svih porudzbina</p>
        <label for="priceFrom" style="width:170px;text-align: left;">Cena(od):</label>
        <label for="priceTo" style="width:200px;margin-right:150px;">Cena(do):</label>
        <label for="dateFrom" style="width:200px;margin-left:100px;">Datum(od):</label>
        <label for="dateTo" style="width:200px;">Datum(do):</label>
        <form class="example mt-2" style="margin-left: 2rem;">
            <input type="text" v-model="priceFrom" class="input-custom1" style="width:200px;" placeholder="Pocetna cena"
                name="search">
            <input type="text" v-model="priceTo" class="input-custom1" style="width:200px;" placeholder="Krajnja cena"
                name="search">
            <button style="width:30px;margin-right:200px;" v-on:click="sortPrice? sortByPriceAscending() : sortByPriceDescending()" data-toggle="button"
                class="btn  btn-primary"><i class=" fas fa-sort"></i></button>

            <!-- <input type="text"  v-model="dateFrom" class="input-custom1" style="width:300px;" placeholder="Pocetni datum" name="search">
            <input type="text"  v-model="dateTo" class="input-custom1" style="width:300px;" placeholder="Krajnji datum" name="search">
            -->
            <vuejs-datepicker format="dd-MM-yyyy" v-model="dateFrom" placeholder="Pocetni datum">
            </vuejs-datepicker>
            <vuejs-datepicker format="dd-MM-yyyy" v-model="dateTo" placeholder="Krajnji datum">
            </vuejs-datepicker>
            <button style="width:30px;" v-on:click="sortDate? sortByDateAscending() : sortByDateDescending()" data-toggle="button"
                class="btn  btn-primary"><i class=" fas fa-sort"></i></button>
            

        </form>
        </br>

        <label for="selRole">Status porudzbine:</label>

        <select v-model="statusFilter" style="width:200px;height:30px;" class="custom-select" id="selStatus"
            name="selectStatus">

            <option>OBRADA</option>
            <option>U_PRIPREMI</option>
            <option>CEKA_DOSTAVU</option>
            <option>CEKA_ODOBRENJE</option>
            <option>U_TRANSPORTU</option>
            <option>DOSTAVLJENA</option>
            <option>OTKAZANA</option>
        </select>
        <button @click="clearStatusFilter()" for="selStatus"
            style="width:30px;height:30px;margin-right: 6rem">X</button>

        </br>



        <div>
            <div class="box-shadow mt-3 px-4 py-4">
                <div class="border-bottoms">
                    <p class="fw-bold fs-15">Dostupne porudžbine</p>
                </div>
                <!-- novo -->
                <div id="for" v-for="(o,index) in availableOrders" :key="index">

                    <div class="mt-3 d-flex border-bottom align-items-center justify-content-between">
                        <a v-on:click="showOrder(o.order.id)">
                            <div class="d-flex align-items-center">

                                <div class="ms-3">

                                    <p class="product-name"> Porudzbina: {{o.order.id}}</p>
                                    <p class="product-price">{{o.order.price}} din</p>
                                    <label>Kupac: {{o.order.name}} {{o.order.surname}}</label>
                                </div>

                            </div>
                        </a>
                        <div class="d-flex align-items-center">
                        	<div>
                            <p class="product-price" style="margin-right:50px">Status : {{o.order.status}} </p>
                            <p class="product-price"> Datum : {{o.order.oderDate}} </p>
                            </div>
                            <div>
                            <p class="product-price" style="margin-right:50px">Restoran : {{o.rest.name}} </p>
                            <p class="product-price"> Vrsta restorana : {{o.rest.restaurantType}} </p>
                            </div>
                            
                        </div>
                        <button type="button" v-if="o.order.status == 'CEKA_DOSTAVU' " @click="changeStatusApproval(o.order)"
                            class="btn btn-success btn-sm">->Zahtev</button>
                    </div>

                </div>

            </div>

            <!-- LISTA MOJIH PORUDZBINA -->
            <div class="box-shadow mt-3 px-4 py-4">
                <div class="border-bottoms">
                    <p class="fw-bold fs-15">Moje trenutne porudžbine</p>
                </div>
                <!-- novo -->
                <div id="for" v-for="(o,index) in myActiveOrders" :key="index">

                    <div class="mt-3 d-flex border-bottom align-items-center justify-content-between">
                        <a v-on:click="showOrder(o.order.id)">
                            <div class="d-flex align-items-center">

                                <div class="ms-3">

                                    <p class="product-name"> Porudzbina: {{o.order.id}}</p>
                                    <p class="product-price">{{o.order.price}} din</p>
                                    <label>Kupac: {{o.order.name}} {{o.order.surname}}</label>
                                </div>

                            </div>
                        </a>
                         <div class="d-flex align-items-center">
                        	<div>
                            <p class="product-price" style="margin-right:50px">Status : {{o.order.status}} </p>
                            <p class="product-price"> Datum : {{o.order.oderDate}} </p>
                            </div>
                            <div>
                            <p class="product-price" style="margin-right:50px">Restoran : {{o.rest.name}} </p>
                            <p class="product-price"> Vrsta restorana : {{o.rest.restaurantType}} </p>
                            </div>
                            
                        </div>
                        <button type="button" v-if="o.order.status == 'U_TRANSPORTU' " @click="changeStatusDelivered(o.order)"
                            class="btn btn-success btn-sm">->Dostavljena</button>
                    </div>

                </div>

            </div>

            <!-- ODOBRENE PORUDZBINE -->
            <div class="box-shadow mt-3 px-4 py-4">
                <div class="border-bottoms">
                    <p class="fw-bold fs-15">Moje odobrene porudžbine</p>
                </div>
                <!-- novo -->
                <div id="for" v-for="(o,index) in myApprovedOrders" :key="index">

                    <div class="mt-3 d-flex border-bottom align-items-center justify-content-between">
                        <a v-on:click="showOrder(o.order.id)">
                            <div class="d-flex align-items-center">

                                <div class="ms-3">

                                    <p class="product-name"> Porudzbina: {{o.order.id}}</p>
                                    <p class="product-price">{{o.order.price}} din</p>
                                    <label>Kupac: {{o.order.name}} {{o.order.surname}}</label>
                                </div>

                            </div>
                        </a>
                         <div class="d-flex align-items-center">
                        	<div>
                            <p class="product-price" style="margin-right:50px">Status : {{o.order.status}} </p>
                            <p class="product-price"> Datum : {{o.order.oderDate}} </p>
                            </div>
                            <div>
                            <p class="product-price" style="margin-right:50px">Restoran : {{o.rest.name}} </p>
                            <p class="product-price"> Vrsta restorana : {{o.rest.restaurantType}} </p>
                            </div>
                            
                        </div>
                        <button type="button" v-if="o.order.status == 'ODOBRENA' " @click="changeStatusInTransport(o.order)"
                            class="btn btn-success btn-sm">->U transportu</button>
                    </div>

                </div>

            </div>

            <!-- MOJE PORUDZBINE NA CEKANJU -->
            <div class="box-shadow mt-3 px-4 py-4">
                <div class="border-bottoms">
                    <p class="fw-bold fs-15">Porudzbine koje cekaju odobrenje </p>
                </div>
                <!-- novo -->
                <div id="for" v-for="(o,index) in waitingApproval" :key="index">

                    <div class="mt-3 d-flex border-bottom align-items-center justify-content-between">
                        <a v-on:click="showOrder(o.order.id)">
                            <div class="d-flex align-items-center">

                                <div class="ms-3">

                                    <p class="product-name"> Porudzbina: {{o.order.id}}</p>
                                    <p class="product-price">{{o.order.price}} din</p>
                                    <label>Kupac: {{o.order.name}} {{o.order.surname}}</label>
                                </div>

                            </div>
                        </a>
                        <div class="d-flex align-items-center">
                        	<div>
                            <p class="product-price" style="margin-right:50px">Status : {{o.order.status}} </p>
                            <p class="product-price"> Datum : {{o.order.oderDate}} </p>
                            </div>
                            <div>
                            <p class="product-price" style="margin-right:50px">Restoran : {{o.rest.name}} </p>
                            <p class="product-price"> Vrsta restorana : {{o.rest.restaurantType}} </p>
                            </div>
                            
                        </div>
                    </div>

                </div>

            </div>

            <!-- MOJE DOSTAVLJENE PORUDZBINE -->
            <div class="box-shadow mt-3 px-4 py-4">
                <div class="border-bottoms">
                    <p class="fw-bold fs-15">Dostavljene porudžbine</p>
                </div>
                <!-- novo -->
                <div id="for" v-for="(o,index) in myDeliveredOrders" :key="index">

                    <div class="mt-3 d-flex border-bottom align-items-center justify-content-between">
                        <a v-on:click="showOrder(o.order.id)">
                            <div class="d-flex align-items-center">

                                <div class="ms-3">

                                    <p class="product-name"> Porudzbina: {{o.order.id}}</p>
                                    <p class="product-price">{{o.order.price}} din</p>
                                    <label>Kupac: {{o.order.name}} {{o.order.surname}}</label>
                                </div>

                            </div>
                        </a>
                        <div class="d-flex align-items-center">
                        	<div>
                            <p class="product-price" style="margin-right:50px">Status : {{o.order.status}} </p>
                            <p class="product-price"> Datum : {{o.order.oderDate}} </p>
                            </div>
                            <div>
                            <p class="product-price" style="margin-right:50px">Restoran : {{o.rest.name}} </p>
                            <p class="product-price"> Vrsta restorana : {{o.rest.restaurantType}} </p>
                            </div>
                            
                        </div>
                    </div>

                </div>

            </div>

        </div>

    </section>
    `
    ,
    mounted() {
        axios.get('rest/orders/allOrders')
            .then(response => {
                this.orders = response.data;
                this.getMyOrders();
                

            }).catch(err => {
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);

            });
		
            axios.get('rest/users/myProfile').then(response => {
                this.user = response.data;
                this.getMyOrders();
                
            }).catch(err => {
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);

            });
        

        
    },
    methods: {
        getMyOrders: function(){
            if(this.orders !== null && this.user !== null){
                for(o in this.orders){
                    for(id in this.user.ordersToDeliver){
                        if(id === o.order.id){
                            this.myOrders.put(o);
                            break;
                        }
                    }
                }
            }
        },
        //MENJA STATUS IZ U TRANSPORTU U DOSTAVLJENA
        changeStatusDelivered: function (order) {
            axios.put('rest/orders/statusDelivered/' + order.id)
                .then(response => {
                    this.orders = response.data;
                }).catch(err => {
                    console.log("\n\n ------- ERROR -------\n");
                    console.log(err);

                });
        },
        //CEKA DOSTAVU => CEKA ODOBRENJE
        changeStatusApproval: function (order) {
            axios.put('rest/orders/statusPermission/' + order.id)
                .then(response => {
                    this.orders = response.data;
                }).catch(err => {
                    console.log("\n\n ------- ERROR -------\n");
                    console.log(err);

                });
        },
        //ODOBRENA => U TRANSPORTU
        changeStatusInTransport: function (order) {
            axios.put('rest/orders/statusTransport/' + order.id)
                .then(response => {
                    this.orders = response.data;
                }).catch(err => {
                    console.log("\n\n ------- ERROR -------\n");
                    console.log(err);

                });
        },
        showOrder: function (id) {
            location.href = "#/order/" + id;
        },
        clearStatusFilter: function () {
            this.statusFilter = undefined;

        },
        sortByPriceAscending: function () {
            function compare(a, b) {
                if (a.order.price < b.order.price)
                    return -1;
                if (a.order.price > b.order.price)
                    return 1;
                return 0;
            }

            this.orders.sort(compare);
            this.sortPrice = false;
        },
        sortByPriceDescending: function () {
            function compare(a, b) {
                if (a.order.price > b.order.price)
                    return -1;
                if (a.order.price < b.order.price)
                    return 1;
                return 0;
            }

            this.orders.sort(compare);
            this.sortPrice = true;
        },
        sortByDateAscending: function () {
            function compare(a, b) {
                if (a.order.oderDate < b.order.oderDate)
                    return -1;
                if (a.order.oderDate > b.order.oderDate)
                    return 1;
                return 0;
            }

            this.orders.sort(compare);
            this.sortDate = false;
        },
        sortByDateDescending: function () {
            function compare(a, b) {
                if (a.order.oderDate > b.order.oderDate)
                    return -1;
                if (a.order.oderDate < b.order.oderDate)
                    return 1;
                return 0;
            }

            this.orders.sort(compare);
            this.sortDate = true;
        },
        isSmaller: function (a, b) {
            if (a > b)
                return false;
            if (a < b)
                return true;
        },
        isBigger: function (a,b) {
            if (a < b)
                return false;
            if (a > b)
                return true;
        }



    },
    computed: {
        availableOrders: function () {
            //this.getMyOrders();



            console.log("usao u computed");
            var d1 = fixDate(this.dateFrom) ;
            var d2 = fixDate( this.dateTo);
           console.log(d1 + '----' + d2);

            if (this.orders == null) {
                return;
            }
            return this.orders.filter((o) => {
               

                if ((o.order.status).match(this.statusFilter) && this.isBigger(o.order.price,this.priceFrom) ) 
                    {
                        if(this.priceTo !== ''){
                            if(!this.isSmaller(o.order.price,this.priceTo)){
                                return;
                            }
                            
                        }
                        if(this.dateFrom !== undefined){
                            if(!this.isBigger(o.order.oderDate,d1)){
                                console.log('date from');
                                return;
                            }
                        }
                        if(this.dateTo !== undefined){
                            if(!this.isSmaller(o.order.oderDate,d2)){
                                console.log('date to ');
                                return;
                            }
                        }
                        if(o.order.status !== 'CEKA_DOSTAVU'){
                            console.log("nije u dobrom stanju");
                                return;
                        }
                        
                        console.log(o.order.id);
                    }
                return o;
            });
            
        },
        myActiveOrders: function () {
            //this.getMyOrders();


            console.log("usao u computed");
            var d1 = fixDate(this.dateFrom) ;
            var d2 = fixDate( this.dateTo);
           console.log(d1 + '----' + d2);

            if (this.orders == null) {
                return;
            }
            return this.orders.filter((o) => {
               

                if ((o.order.status).match(this.statusFilter) && this.isBigger(o.order.price,this.priceFrom) ) 
                    {
                        if(this.priceTo !== ''){
                            if(!this.isSmaller(o.order.price,this.priceTo)){
                                return;
                            }
                            
                        }
                        if(this.dateFrom !== undefined){
                            if(!this.isBigger(o.order.oderDate,d1)){
                                console.log('date from');
                                return;
                            }
                        }
                        if(this.dateTo !== undefined){
                            if(!this.isSmaller(o.order.oderDate,d2)){
                                console.log('date to ');
                                return;
                            }
                        }
                        if(o.order.status !== 'U_TRANSPORTU'){
                            console.log("nije u dobrom stanju");
                                return;
                        }
                        
                        console.log(o.order.id);
                    }
                return o;
            });
            
        },
        myDeliveredOrders: function () {
           // this.getMyOrders();

            console.log("usao u computed");
            var d1 = fixDate(this.dateFrom) ;
            var d2 = fixDate( this.dateTo);
           console.log(d1 + '----' + d2);

            if (this.orders == null) {
                return;
            }
            return this.orders.filter((o) => {
               

                if ((o.order.status).match(this.statusFilter) && this.isBigger(o.order.price,this.priceFrom) ) 
                    {
                        if(this.priceTo !== ''){
                            if(!this.isSmaller(o.order.price,this.priceTo)){
                                return;
                            }
                            
                        }
                        if(this.dateFrom !== undefined){
                            if(!this.isBigger(o.order.oderDate,d1)){
                                console.log('date from');
                                return;
                            }
                        }
                        if(this.dateTo !== undefined){
                            if(!this.isSmaller(o.order.oderDate,d2)){
                                console.log('date to ');
                                return;
                            }
                        }
                        if(o.order.status !== 'DOSTAVLJENA'){
                            console.log("nije u dobrom stanju");
                                return;
                        }
                        
                        console.log(o.order.id);
                    }
                return o;
            });
            
        },
        waitingApproval: function () {
           // this.getMyOrders();

            console.log("usao u computed");
            var d1 = fixDate(this.dateFrom) ;
            var d2 = fixDate( this.dateTo);
           console.log(d1 + '----' + d2);

            if (this.orders == null) {
                return;
            }
            return this.orders.filter((o) => {
               

                if ((o.order.status).match(this.statusFilter) && this.isBigger(o.order.price,this.priceFrom) ) 
                    {
                        if(this.priceTo !== ''){
                            if(!this.isSmaller(o.order.price,this.priceTo)){
                                return;
                            }
                            
                        }
                        if(this.dateFrom !== undefined){
                            if(!this.isBigger(o.order.oderDate,d1)){
                                console.log('date from');
                                return;
                            }
                        }
                        if(this.dateTo !== undefined){
                            if(!this.isSmaller(o.order.oderDate,d2)){
                                console.log('date to ');
                                return;
                            }
                        }
                        if(o.order.status !== 'CEKA_ODOBRENJE'){
                            console.log("nije u dobrom stanju");
                                return;
                        }
                        
                        console.log(o.order.id);
                    }
                return o;
            });
            
        },
        myApprovedOrders: function () {
            // this.getMyOrders();
 
             console.log("usao u computed");
             var d1 = fixDate(this.dateFrom) ;
             var d2 = fixDate( this.dateTo);
            console.log(d1 + '----' + d2);
 
             if (this.orders == null) {
                 return;
             }
             return this.orders.filter((o) => {
                
 
                 if ((o.order.status).match(this.statusFilter) && this.isBigger(o.order.price,this.priceFrom) ) 
                     {
                         if(this.priceTo !== ''){
                             if(!this.isSmaller(o.order.price,this.priceTo)){
                                 return;
                             }
                             
                         }
                         if(this.dateFrom !== undefined){
                             if(!this.isBigger(o.order.oderDate,d1)){
                                 console.log('date from');
                                 return;
                             }
                         }
                         if(this.dateTo !== undefined){
                             if(!this.isSmaller(o.order.oderDate,d2)){
                                 console.log('date to ');
                                 return;
                             }
                         }
                         if(o.order.status !== 'ODOBRENA'){
                             console.log("nije u dobrom stanju");
                                 return;
                         }
                         
                         console.log(o.order.id);
                     }
                 return o;
             });
             
         }
    }
});