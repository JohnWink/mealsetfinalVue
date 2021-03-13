<template>
    <v-container>
        <v-row  >
            
            <v-col cols="12"  >
                <v-form ref="commentSection">
                <v-textarea  outlined
                 name="input-7-4"
                 color="indigo darken-1"                 
                 placeholder="Escreva a sua experiencia..."
                 :rules="commentRules"
                 v-model="commentText"
                ></v-textarea>
                </v-form>
                
            </v-col>
            <v-col cols="12">
                <v-row justify="space-between" >
                    <v-col cols="12" sm="3" >
                
                        <v-rating v-model="rating" :rules="ratingRules" background-color="orange lighten-3" color="orange" medium></v-rating>
                     
                    </v-col>
                    
                    <v-col cols="12" sm="2">
                        <v-btn large rounded color="#f7c23e" @click="submit" dark v-on="on">Avaliar</v-btn>
                    </v-col>
                </v-row>
                
            </v-col>
            

        </v-row>

    </v-container>
    
</template>



<style>
    #comment{
        border-radius: 20px;
    }
</style>

<script>
export default {
  name: "commentAdd",
  data: () => ({       
    checker: "border: solid red;",
    //default to show emphty
    rating:3,
    commentText:"",


    //rules for comment/evaluation submitions

    commentRules:[
        v => !!v || 'Por favor descreva a sua experiencia',
    ],

    //the user id and restaurant id will be needed
    promp:[]


    

  }),
  methods: {
      //method when clicked on the button
      async submit(){
          
              this.$fire({
                title:"A publicar avaliação",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton:false,         
               })

            let date = new Date()
           

       
            let postDate = date.getUTCFullYear() + '-' +
                            ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
                            ('00' + date.getUTCDate()).slice(-2) + ' ' + 
                            ('00' + date.getUTCHours()).slice(-2) + ':' + 
                            ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
                            ('00' + date.getUTCSeconds()).slice(-2);

            
                if (this.$refs.commentSection.validate()) {

                    let loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))

                   await this.$store.dispatch("add_rating",{
                        idUser: loggedUser.idUser,
                        idRestaurant:  parseInt(this.$route.params.id),
                        rating: this.rating,
                        comment:this.commentText,
                        dateTime:postDate,
                    }).then(()=>{
                        let response = this.$store.getters.feedbackChecker

                        if(response == 201){
                                this.$fire({
                                title: "Comentario Enviado!",          
                                type: "success",
                                confirmButtonText: "ok"
                            }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            });

                        }else if(response ==409){
                            this.$fire({
                            title: "O comentário já existe!",          
                            type: "error",
                            text:"Não pode comentar mais do que uma vez",
                            confirmButtonText: "ok"
                            }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            });
                        }else{
                            this.$fire({
                            title: "Oops!",          
                            type: "error",
                            text:"algo deu errado",
                            confirmButtonText: "ok"
                            }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            });

                        }
                    }).catch((error)=>{
                        console.log("Error in commend add: ", error)

                    })

                        /*
                        this.$store.commit("ADD_COMMENT",{
                        id: 1 + this.$store.getters.getLastCommentId,
                        restaurantId: parseInt(this.$route.params.id),
                        name: this.$store.getters.getLoggedUsername,
                        avatar: this.$store.getters.getLoggedUserAvatar,
                        description: this.commentText,
                        date:postDate,
                        rating:this.rating
                        });
                        */
                    
               /*
                this.$store.commit("CALCULATE_RESTAURANT_RATING",{
                    restaurantId: parseInt(this.$route.params.id)
                })
                */

               
                
            }

            //this.$router.replace("/")
            

        

      }
  }
};
</script>