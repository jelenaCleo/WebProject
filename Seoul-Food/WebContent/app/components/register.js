Vue.component("register",{

    template:`
    <input type="text" class=" input-custom" placeholder="Vaša e-adresa" required>
    <input type="password" class="mt-3 input-custom" placeholder="Vaša lozinka" required>
    <p class="fs-11 text-muted pt-2">Vaša lozinka mora biti najmanje 8 znakova duga i
        sadržati
        najmanje
        jedan
        broj,
        jedno veliko i
        jedno malo slovo.</p>
    <input type="text" class="mt-3 input-custom" placeholder="Korisničko ime koje želite"
        required>
    <button type="button" class="btn btn-warning fw-600 mt-3">Registruj se </button>
    <div class="text-center mt-3 fs-14 pb-4">
        <span>Prijavljivanjem prihvatate</span>
        <br>
        <span>Uslovi korišćenja i Izjava o privatnosti</span>
    </div>

    `
});