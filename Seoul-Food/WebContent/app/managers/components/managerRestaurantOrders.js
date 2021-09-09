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


Vue.component("rest-orders", {
    data() {
        return {
            orders: [],
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
                    <p class="fw-bold fs-15">Porudžbine</p>
                </div>
                <!-- novo -->
                <div id="for" v-for="(o,index) in filteredOrders" :key="index">

                    <div class="mt-3 d-flex border-bottom align-items-center justify-content-between">
                        <a v-on:click="showOrder(o.id)">
                            <div class="d-flex align-items-center">

                                <div class="ms-3">

                                    <p class="product-name"> Porudzbina: {{o.id}}</p>
                                    <p class="product-price">{{o.price}} din</p>
                                    <label>Kupac: {{o.name}} {{o.surname}}</label>
                                </div>

                            </div>
                        </a>
                        <div class="d-flex align-items-center">
                            <p class="product-price" style="margin-right:50px">Status : {{o.status}} </p>
                            <p class="product-price"> Datum : {{o.oderDate}} </p>
                        </div>
                        <button type="button" v-if="o.status == 'OBRADA' " @click="changeStatusPrepared(o)"
                            class="btn btn-success btn-sm">->U pripremi</button>
                        <button type="button" v-if="o.status == 'U_PRIPREMI' " @click="changeStatusWaiting(o)"
                            class="btn btn-success btn-sm">->Čeka dostavu</button>
                        <div>
                        <button type="button" v-if="o.status == 'CEKA_ODOBRENJE' " @click="changeStatusApproved(o)"
                        class="btn btn-success btn-sm">->Odobrena</button>
                        <button type="button" v-if="o.status == 'CEKA_ODOBRENJE' " @click="changeStatusDenied(o)"
                        class="btn btn-success btn-sm">->Odbijena</button>
                        </div>
                        <button type="button" v-if="o.status == 'CEKA_DOSTAVU' " class="btn btn-success btn-sm"
                            disabled>->Čeka dostavu</button>
                    </div>



                </div>

            </div>
        </div>

    </section>
    `
    ,
    mounted() {
        axios.get('rest/orders/restaurantOrders')
            .then(response => {
                this.orders = response.data;

            }).catch(err => {
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);

            });
    },
    methods: {

        changeStatusWaiting: function (order) {
            axios.put('rest/orders/statusWaiting/' + order.restID + '/' + order.id)
                .then(response => {
                    this.orders = response.data;
                }).catch(err => {
                    console.log("\n\n ------- ERROR -------\n");
                    console.log(err);

                });
        },
        changeStatusPrepared: function (order) {
            axios.put('rest/orders/statusPrepared/' + order.restID + '/' + order.id)
                .then(response => {
                    this.orders = response.data;
                }).catch(err => {
                    console.log("\n\n ------- ERROR -------\n");
                    console.log(err);

                });
        },
        //CEKA ODOBRENJE => ODBIJENA
        changeStatusDenied: function(order){
            axios.put('rest/orders/statusDenied/' +order.restID + '/' + order.id)
            .then(response => {
                this.orders = response.data;
            }).catch(err => {
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);

            });
        },
        //CEKA ODOBRENJE => ODOBRENA
        changeStatusApproved: function(order){
            axios.put('rest/orders/statusApproved/' +order.restID + '/' + order.id)
            .then(response => {
                this.orders = response.data;
            }).catch(err => {
                console.log("\n\n ------- ERROR -------\n");
                console.log(err);

            });
        },
        showOrder: function (id) {
            location.href = "#/orders/" + id;
        },
        clearStatusFilter: function () {
            this.statusFilter = undefined;

        },
        sortByPriceAscending: function () {
            function compare(a, b) {
                if (a.price < b.price)
                    return -1;
                if (a.price > b.price)
                    return 1;
                return 0;
            }

            this.orders.sort(compare);
            this.sortPrice = false;
        },
        sortByPriceDescending: function () {
            function compare(a, b) {
                if (a.price > b.price)
                    return -1;
                if (a.price < b.price)
                    return 1;
                return 0;
            }

            this.orders.sort(compare);
            this.sortPrice = true;
        },
        sortByDateAscending: function () {
            function compare(a, b) {
                if (a.oderDate < b.oderDate)
                    return -1;
                if (a.oderDate > b.oderDate)
                    return 1;
                return 0;
            }

            this.orders.sort(compare);
            this.sortDate = false;
        },
        sortByDateDescending: function () {
            function compare(a, b) {
                if (a.oderDate > b.oderDate)
                    return -1;
                if (a.oderDate < b.oderDate)
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
        filteredOrders: function () {
            console.log("usao u computed");
            var d1 = fixDate(this.dateFrom) ;
            var d2 = fixDate( this.dateTo);
           console.log(d1 + '----' + d2);

            if (this.orders == null) {
                return;
            }
            return this.orders.filter((order) => {
                var o = null;

                if ((order.status).match(this.statusFilter) && this.isBigger(order.price,this.priceFrom) ) 
                    {
                        if(this.priceTo !== ''){
                            if(!this.isSmaller(order.price,this.priceTo)){
                                return;
                            }
                            
                        }
                        if(this.dateFrom !== undefined){
                            if(!this.isBigger(order.oderDate,d1)){
                                console.log('date from');
                                return;
                            }
                        }
                        if(this.dateTo !== undefined){
                            if(!this.isSmaller(order.oderDate,d2)){
                                console.log('date to ');
                                return;
                            }
                        }
                        o = order;
                        console.log(order.id);
                    }
                return o;
            });
            
        }
    }
});