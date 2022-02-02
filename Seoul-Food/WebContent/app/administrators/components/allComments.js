Vue.component('star-rating', VueStarRating.default);
Vue.component("admin-comments", {
	data() {
		return {
            comments:null,
            rating: 0,
            isLoaded3 : false,
		}
	},

	template: `
	 <section>
    <p class="fw-bold fs-15 mt-4">Pregled komentara</p>

                <div v-if="isLoaded3" v-for="(c,index) in comments" class="overflow-auto row border-top border-bottom py-3">
                <div class="col-6 d-flex align-items-center">

                    <p class="reviewer-name">{{c.user.name}} {{c.user.surname}}</p> 
                    <p  v-if="c.status == false">   Status:ceka odobrenje</p>
                    <p  v-if="c.status == true">   Status:odobren</p>
                </div>
                <div class="col-6">
                    <p class="fs-10">Poruka:</p>
                    <p class="review-text">
                    {{c.content}}</p>
                </div>
                <div>
                <star-rating v-model="c.grade" :star-size="25" :read-only="true" ></star-rating>
                </div>
                </div>
                 </section>
    `
	,
	mounted() {
		axios.get('rest/comments/all').
            then(response => {
                console.log(response.data.restComments);
                console.log('halelujaaa');
                if(response.data != null){
                     this.comments = response.data.restComments;	
                     //this.canLeaveComment = response.data.canLeaveComment;
                    //  console.log(this.canLeaveComment);
                     this.isLoaded3 = true;
                }
        }); 

	}
	
});