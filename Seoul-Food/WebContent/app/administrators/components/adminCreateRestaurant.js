Vue.component("create-restaurant",{


    template: `
    <div >
	<section class="container mt-4">
        <p class="fw-bold fs-20">Kreirajte novi restoran</p>
        <form action="#">
            <div class="row">
                <div class="col-md-3">
                    <label for="restourantName">Unesite ime restorana: </label>
                    <input type="text" id="restourantName" class=" mt-2 input-custom" placeholder="Ime restorana"
                        required>
                </div>
                <div class="col-md-3">
                    <label for="status">Da li restoran radi: </label>
                    <select data-trigger="" id="status" class="input-custom mt-2">
                        <option placeholder="" value="">Status restorana</option>
                        <option>Da</option>
                        <option>Ne</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="type">Unesite tip restorana: </label>
                    <select data-trigger="" id="type" class="input-custom mt-2">
                        <option placeholder="" value="">Tip restorana</option>
                        <option>Poslastičarnica</option>
                        <option>Pekara</option>
                        <option>Fastfood</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <label for="restourantPicture">Unesite logo restorana: </label>
                    <input type="file" id="restourantPicture" class=" mt-2 input-custom" placeholder="Slika proizvoda"
                        required>
                </div>
                <div class="col-md-6 mt-3">
                <label for="place">Unesite(grad) zip kod grada restorana: </label>
                <select data-trigger="" id="city" class="input-custom mt-2">
                    <option placeholder="" value="">Grad</option>
                    <option>Bijeljina</option>
                    <option>Brčko</option>
                    <option>Novi Sad</option>
                </select>
            </div>
            <div class="col-md-6 mt-3">
                <label for="place">Unesite ulicu restorana: </label>
                <input type="text" id="streetName" class=" mt-2 input-custom" placeholder="Ime restorana"
                    required>
            </div>
            <div class="col-md-6 mt-3">
                <label for="place">Unesite broj zgrade restoran: </label>
                <input type="text" id="streetNumber" class=" mt-2 input-custom" placeholder="Ime restorana"
                    required>
            </div>
                <div class="col-md-6 mt-3">
                    <label for="manager">Unesite menadžera restorana: </label>
                    <select data-trigger="" id="manager" class="input-custom mt-2">
                        <option placeholder="" value="">Menadžer</option>
                        <option>Đuro Đurić</option>
                        <option>Pero Perić</option>
                        <option>Nikola Nikić</option>
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
});