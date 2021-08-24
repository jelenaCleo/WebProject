Vue.component("register", {
	
	template: ` 
	<html lang="en">

	<head>
		<meta charset="UTF-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="assets/fontawesome/css/all.min.css">
		<link rel="stylesheet" href="bootstrap-5.0.2-dist/css/bootstrap.min.css">
		<link rel="stylesheet" href="Login.css">
	
		<title>Maja</title>
	</head>
	
	<body>
	
		<div class="container d-flex align-items-center justify-content-center">
						<div class="tab-pane fade " id="profile" role="tabpanel" aria-labelledby="profile-tab">
							
							  
								<div class="d-flex flex-column">
									<input type="text" class=" input-custom" placeholder="Ime" required>
									<input type="text" class="mt-3 input-custom" placeholder="Prezime" required>
	
									<input type="text" class="mt-3 input-custom" placeholder="Korisničko ime" required>
									<input  type="password" class="mt-3 input-custom" placeholder="Šifra" required>
									<input  type="text" class="mt-3 input-custom" placeholder="Pol" required>
									<input  type="text" class="mt-3 input-custom" placeholder="Datum rođenja" required>
								   
									<button type="button" class="btn btn-warning fw-600 mt-3">Registruj se </button>
									<div class="text-center mt-3 fs-14 pb-4">
										<span>Prijavljivanjem prihvatate</span>
										<br>
										<span>Uslove korišćenja i Izjava o privatnosti</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	
		<script src="bootstrap-5.0.2-dist/js/bootstrap.js"></script>
		<script src="js/vue.js"></script>
		<script src="js/vue-router.js"></script>
		<script src="js/axios.js"></script>
		<script src="js/jquery.min.js"></script> 
		<script src="js/toast.js"></script> 
		<script src="app/login.js"></script>
		<script src="app/x.js"></script>


			<script src="app/VueComponents/header.js"></script>
			<script src="app/app.js"></script>
	
	</body>
	
	</html>
`

});