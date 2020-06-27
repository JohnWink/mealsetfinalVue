<template>
   <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
       <v-btn large rounded color="#f7c23e "  dark v-on="on">Editar</v-btn>
    </template>
    <v-card>
      <!--Fechar-->
      <v-toolbar color="#f7c23e " dark>
        <v-row>
          <v-col class="text-left mt-2 ml-6">
            <v-toolbar-title >Editar Pagian de Restaurante</v-toolbar-title>
          </v-col>
          <v-col class="text-right mt-2">
            <v-btn color="#ffffff" text right @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
      <!-- looks like the sellected data gets trough
      <pre>{{this.selected}}</pre>      -->

      <v-form class="pa-10" ref="form" lazy-validation>

          

          <v-text-field          
          v-model="restautantName"
          :counter="25"
          :rules="RestaurantNameRules"
          label="Nome do Restaurante"          
          required
          clearable
          color="#5C6BC0"
          ></v-text-field>


          <v-file-input
          label="Imagem Cover"
          v-model="restaurantCover"
          filled
          prepend-icon="mdi-camera"
          color="#5C6BC0"
         ></v-file-input>  

          <v-text-field          
          v-model="restaurantDescrip"          
          label="Descrição do Restaurate"
          :counter="40"
          required
          clearable
          color="#5C6BC0"
          ></v-text-field>

          <v-checkbox
          v-model="parking" 
          required       
          label="Parque de Estacionamento?"        
          ></v-checkbox>


          <v-text-field          
          v-model="restaurantLocation"          
          label="Morada do Restaurante"
          required
          :rules="locationRules"
          clearable
          color="#5C6BC0"
          ></v-text-field>


          
          <v-file-input
          label="Imagem Logo"
          v-model="restaurantLogo"
          filled
          prepend-icon="mdi-camera"
          color="#5C6BC0"
         ></v-file-input>       

        
         

      <v-btn color="orange lighten" class="white--text" large rounded @click="submit">Editar Restaurante</v-btn>
     
     </v-form>
    </v-card>
  </v-dialog>
  
</template>

<script>
export default {
    name: "editPage",
    props:["restaurant"],

data: () => ({
    
    
    dialog: false,

    //---------new restaurant data-------------
    restautantName: "",
    restaurantCover: [],
    restaurantDescrip: "",
    parking: false,
    restaurantLocation: "",
    restaurantLogo:[],
    

    //----------- submition rules----------------

    RestaurantNameRules: [
      v => !!v || "Por favor preencha o nome do Restaurante",
      v => (v && v.length <= 25) || "Tem de ter menos de 25 caracteres"
    ],

    DescriptionRules: [
      v => !!v || "Por favor preencha a descrição",
      v => (v && v.length <= 40) || "Tem de ter menos de 40 caracteres"
    ],
   

    locationRules:[
      location => !!location || "Por favor preencha a localização do Restaurante"
    ],
    
  }),
  

methods: {
   async submit () {

  
      if (this.$refs.form.validate()) {

        this.dialog=false

         let loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))

         this.$fire({
                title:"Atualizando Restaurante...",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton:false,         
               })
              
        // when left it empthy if you cleared with the cler option it will return null
        // if you clear it whit backspace keyboard button then it will return ""

/*
        if(this.restaurantCover === "" ){
          this.restaurantCover = this.restaurant.coverFoto
        }
        
        if(this.restaurantCover === null ){
          this.restaurantCover = this.restaurant.coverFoto
        }

        if(this.restaurantLogo === "" ){
          this.restaurantLogo = this.restaurant.logo}
        
        if(this.restaurantLogo === null ){
          this.restaurantLogo = this.restaurant.logo}
*/
        let response

        //Will always check if there's any errors in any updates, if so, all the other updates won't take effect
        let message = "success"
  

             if( this.restaurantCover != 0){
               if(message == "success"){
                  await this.$store.dispatch("updateRestaurantCover",{
                    idRestaurant: loggedUser.idRestaurant,
                    coverImg: this.restaurantCover
                    }).then(()=>{

                        response = this.$store.getters.feedbackChecker
                        
                        if(response == 200){
                          message = "success"
                        }else if(response ==404){
                          message = "O restaurante não foi encontrado"
                        }else if(response == 400){
                          message = "A imagem não é valida"
                        }else{
                          message = "Erro Interno"
                        }
                        
                    }).catch((error)=>{
                      console.log("Error in updating restaurant cover: ", error)
                      message = "Erro Interno"
                    })
               }
              }


              if(this.restaurantLogo.length != 0 ){
                if(message == "success"){
                 await this.$store.dispatch("updateRestaurantLogo",{
                   idRestaurant:loggedUser.idRestaurant,
                   logo:this.restaurantLogo
                  }).then(()=>{

                    response = this.$store.getters.feedbackChecker

                     if(response == 200){
                          message = "success"
                        }else if(response ==404){
                          message = "O restaurante não foi encontrado"
                        }else if(response == 400){
                          message = "A imagem não é valida"
                        }else{
                          message = "Erro Interno"
                        }

                  }).catch((error)=>{
                    console.log("Error in updating restaurant logo: ", error)
                    message = "Erro Interno"
                  })
                }
              }

        if(message == "success"){

         

          await this.$store.dispatch("update_restaurant",{
            idRestaurant:loggedUser.idRestaurant,
            address:this.restaurantLocation,
            name:this.restautantName,
            description:this.restaurantDescrip,

          }).then(()=>{
              response = this.$store.getters.feedbackChecker
                        if(response == 200){
                          message = "success"
                        }else if(response ==404){
                          message = "O restaurante não foi encontrado"
                        }else{
                          message = "Erro Interno"
                        }
          }).catch((error)=>{
            console.log("Error in updating restaurant: ", error)
            message = "Erro Interno"
          })
        }
        
        /*
        this.$store.commit("EDIT_RESTAURANT",{
          id:this.restaurant.id,             
          name:this.restautantName,
          coverImg:this.restaurantCover,
          description:this.restaurantDescrip,
          outDoor: this.outDoor,
          parking: this.parking,
          mediumWaitingTime: this.restaurantWaitTime,
          location: this.restaurantLocation,
          logo: this.restaurantLogo
        })
        */
        
/*
        this.$fire({
          title: "Restaurante Editado!",          
          type: "success",
          confirmButtonText: "ok"
        }).then((result) => {
          if (result.value) {
          location.reload();}
        });
*/

         if(message == "success"){
                  this.$fire({
                    type: "success",
                    title: "Restaurante Editado!",  
                    confirmButtonText:"Confirmar"        
                 
                 }).then((result) => {
                  if (result.value) {
                  location.reload();}
                  });

                     // change the buttons disabled values

                this.alter= true
                this.show = false
        }else{
          this.$fire({
          type: "error",
          title: "Oops!!",          
          text: message,
          }).then((result) => {
          if (result.value) {
          location.reload();}
        });
        }
        
      }
      
    }
  },

  created(){
      // add the already existing info so its easy to fill
    this.restautantName = this.restaurant.name
    this.restaurantCover = this.restaurant.coverFoto
    this.restaurantDescrip = this.restaurant.description
    
    //this.restaurantWaitTime = this.restaurant.mediumWaitingTime
    this.restaurantLocation = this.restaurant.address
    this.restaurantLogo = this.restaurant.logo
      
  }

  
}
</script>