<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn large rounded color="#f7c23e" elevation="7" dark v-on="on">Registar</v-btn>
    </template>
    <!--MODAL DE REGISTO-->
    <v-card>
      <!--Fechar-->
      <v-toolbar color="#f7c23e">
        <v-row>
          <v-col class="text-left mt-2 ml-6">
            <v-toolbar-title id="text">Registo</v-toolbar-title>
          </v-col>
          <v-col class="text-right mt-2">
            <v-btn color="#ffffff" text right @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>

      <v-form class="pa-10" ref="form" v-model="valid" lazy-validation>
        <!--Username-->
        <v-text-field
          prepend-icon="fas fa-user-circle"
          v-model="username"
          :counter="20"
          :rules="nameRules"
          label="Username"
          required
          clearable
          color="#5C6BC0"
        ></v-text-field>

        <!--Email-->
        <v-text-field
          prepend-icon="fas fa-at"
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          clearable
          color="#5C6BC0"
        ></v-text-field>

        <!--Password-->
        <v-text-field
          prepend-icon="fas fa-lock"
          v-model="password"
          :counter="20"
          :rules="passwordRules"
          label="Password"
          required
          clearable
          type="password"
          color="#5C6BC0"
        ></v-text-field>

         <!--Contact-->
        <v-text-field
         prepend-icon="fas fa-phone"
          v-model="contact"
          :counter="20"
          :rules="contactRules"
          label="Contacto"
          required
          clearable
          color="#5C6BC0"
        ></v-text-field>

      

        <!--Imagem de perfil-->
         <v-file-input
          label="Link de Avatar(opcional)"
          accept="image/*"
          v-model="userAvatar"
          filled
          prepend-icon="mdi-camera"
          color="#5C6BC0"
         ></v-file-input>

        <v-checkbox
        v-model="checkbox"        
        label="Registar como restaurante utilizador?"        
        ></v-checkbox>
        
        <!--This section will apper when the user checks the box. the restaurant registration will apper -->

        <div v-if="this.checkbox == true">

          <v-text-field          
          v-model="restautantName"
          :counter="25"
          :rules="RestaurantNameRules"
          label="Nome do Restaurante"
          required
          clearable
          color="#5C6BC0"
          ></v-text-field>

  
          <v-text-field          
          v-model="restaurantDescrip"          
          label="Descrição do Restaurate"
          :counter="40"
          required
          clearable
          color="#5C6BC0"
          ></v-text-field>
          
          <!--
          <v-checkbox
          v-model="outDoor"
          required        
          label="Tem Esplanada?"        
          ></v-checkbox>
          -->

          <v-checkbox
          v-model="parking" 
          required       
          label="Parque de Estacionamento?"        
          ></v-checkbox>

          <!--
          <v-text-field          
          v-model="restaurantWaitTime"          
          label="Tempo media de espera"
          :rules="waitTimeRule"
          required
          clearable
          color="#5C6BC0"
          ></v-text-field>
          -->

          <v-text-field          
          v-model="restaurantLocation"          
          label="Morada do Restaurante"
          required
          :rules="locationRules"
          clearable
          color="#5C6BC0"
          ></v-text-field>

          <v-text-field          
          v-model="restaurantZipCode"          
          label="Código Postal"
          required
          :rules="restaurantZipCodeRules"
          clearable
          color="#5C6BC0"
          ></v-text-field>

          <v-file-input
          label="Logotipo"
          v-model="logoImg"
          :rules="logoImgRules"
          required
          filled
          prepend-icon="mdi-camera"
          color="#5C6BC0"
         ></v-file-input>

          <v-file-input
          label="Banner"
          v-model="coverImg"
          :rules="coverImgRules"
          required
          filled
          prepend-icon="mdi-camera"
          color="#5C6BC0"
         ></v-file-input>


        
        </div>



      </v-form>
      <!--Botões-->
      <v-card-actions>
        <v-col class="text-right mr-4 mb-4">
          <v-btn color="#f7c23e" dark @click="signUp">Registar</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
#text {
  color: white;
  text-shadow: 0px 0px 5px gray;
}
</style>

    <script>
export default {
  name: "registration",

  data: () => ({
    dialog: false,

    //User data 
    username: "",
    password: "",
    contact: 0,
    email: "",
    userAvatar:[],
    userType: "",
    //zipCode: 0,
    id: 0,
  
    
    checkbox: false, //checker for the user restaurant registration

    //Restauntant data

    restautantName: "",
    restaurantCover: "",
    restaurantDescrip: "",
   // outDoor: false,
    parking: false,
    //restaurantWaitTime: 0,
    restaurantLocation: "",
    restaurantLogo: "",
    restaurantZipCode:0,
    coverImg:[],
    logoImg:[],







    nameRules: [
      v => !!v || "Por favor preencha o Username",
      v => (v && v.length <= 20) || "Tem de ter menos de 20 caracteres"
    ],

  

    restaurantZipCodeRules:[
      v => !!v || "Por favor preencha o código-postal"
    ],

    passwordRules: [
      v => !!v || "Por favor preencha a Password",
      v => v.length >= 6 || "A password tem de ter no mínimo 6 caracteres",
      v => v.length <= 20 ||"A password não pode ter mais que 20 caracteres"
    ],
/*
    waitTimeRule:[ 
      time => !!time || "Por favor preencha o tempo media de espera"
    ],
*/
    locationRules:[
      location => !!location || "Por favor preencha a localização do Restaurante"
    ],


    contactRules:[
        contact => !!contact || "Por favor introduza o seu contacto"
    ],


    emailRules: [v => !!v || "Por favor introduza o seu email"],

    //rules on the restaurant user part

    RestaurantNameRules: [
      v => !!v || "Por favor preencha o nome do Restaurante",
      v => (v && v.length <= 25) || "Tem de ter menos de 25 caracteres"
    ],

    DescriptionRules: [
      v => !!v || "Por favor preencha a descrição",
      v => (v && v.length <= 40) || "Tem de ter menos de 40 caracteres"
    ],

    logoImgRules:[
      v => v.length != 0 || "Por favor introduza o logotipo "
    ],

    coverImgRules:[
      v => v.length != 0 || "Por favor introduza o a Banner "
    ]



  }),

  methods: {

    async signUpUser(){
      
               this.$fire({
                title:"Registando Utilizador...",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton:false,         
               })
              
              
              let lastRestaurantId = this.$store.getters.getLastRestaurantId

               console.log("Last restaurant Id:", lastRestaurantId)

              let userTypeInfo = "cliente"

                if(lastRestaurantId!=''){
                  //lastRestaurantId = null
                  userTypeInfo = "restaurante"
                }
             
               await this.$store.dispatch('signUpUser',{
                      
                username:this.username,
                password: this.password,
                email : this.email,
                contact:this.contact,
                //zipCode:this.zipCode,
                idRestaurant: lastRestaurantId,
                userType: userTypeInfo

               }).then(async()=>{

                 

                
               const lastUserId = this.$store.getters.getLastUserId
               let response =  this.$store.getters.feedbackChecker;
              
                console.log("Axios response:", response)

                 if(response == 201){

                  console.log("Avatar: ", this.userAvatar)
                  if(!this.userAvatar){
                    
                      this.$fire({
                          type: "success",
                          title: 'Registado!',
                          text: 'Um link foi enviado para o seu email para ativar a sua conta',
                          }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            })
                    
                  }else{
                       
                        
                          //this.$refs.form.reset()

                          console.log("User avatar has been detected")

                    await this.$store.dispatch('uploadAvatar',{

                      idUser: lastUserId,
                      avatar:this.userAvatar

                      }).then(()=>{

                        response = this.$store.getters.feedbackChecker

                        if(response == 200){

                          this.$fire({
                          type: "success",
                          title: 'Registado! e Avatar enviado!',
                          text: 'Um link foi enviado para o seu email para ativar a sua conta',
                          }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            })
                          //this.$refs.form.reset()

                        }else if(response == 404){
                          this.$fire({
                          type: "error",
                          title: 'Oops...!',
                          text: 'O utilizador não foi encontrado ',
                          }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            })
                          //this.$refs.form.reset()
                        }else if(response == 400){
                          this.$fire({
                          type: "error",
                          title: 'Oops...!',
                          text: 'A imagem não é válida',
                           }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            })
                           //this.$refs.form.reset()
                        }else if(response == 409){

                          this.$fire({
                          type: "error",
                          title: 'Conflito',
                          text: 'O nome do utilizador ou email já está a ser utilizado',
                          }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            })
                          //this.$refs.form.reset()

                        }else{
                          this.$fire({
                          type: "error",
                          title: 'Oops!',
                          text: 'Ocorreu um erro',
                          }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            })
                        }
                      })
                  }
                
                }else if(response ==409){
                   this.$fire({
                  type: "error",
                  title: 'Oops...!',
                  text: 'O username ou email já existe ',
                }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            })
                //this.$refs.form.reset()
                }else{
                  this.$fire({
                  type: "error",
                  title: 'Oops...!',
                  text: 'Algo deu errado',
                }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            })
                //this.$refs.form.reset()
                }

              }).catch((error)=>{
                console.log(error)
                
                 this.$fire({
                  type: "error",
                  title: 'Oops...!',
                  text: 'Algo deu errado',
                })
                
              })

              //this.$store.state.feedback = "";
              //this.$router.replace("/");
              
    },

  
    async signUp() {
      if(this.$refs.form.validate()){
         this.dialog = false
        // If Client SignUp
          if(this.checkbox === false){

            //this.$store.state.userDetails.username = this.username
            //this.$store.state.userDetails.password = this.password
            //this.$store.state.userDetails.userAvatar = this.userAvatar
            //this.$store.state.userDetails.email = this.email
            //this.$store.state.userDetails.contact = this.contact
            //this.$store.state.userDetails.zipCode = this.zipCode
            //this.$store.state.userDetails.userType = "cliente"


            /*
              this.$store.commit("ADD_USER",{
                avatar : this.userAvatar,
                username: this.username,
                password: this.password,
                email: this.email,
                contact: this.contact,
                zipCode: this.zipCode,
                userType: "cliente"
              })
              */
             
              
              console.log("we're here")
/*
              let result = ""

              await this.$store.commit("ADD_USER")

              result = await this.$store.getters.feedbackChecker;


                if(result == 201){
                  this.$fire({
                  type: "Success",
                  title: 'Registado!',
                  text: 'Bem vindo ao MealSet',
                })
                }else if(result ==409){
                   this.$fire({
                  type: "error",
                  title: 'Oops...!',
                  text: 'O username ou email já existe ',
                })
                }else{
                  this.$fire({
                  type: "error",
                  title: 'Oops...!',
                  text: 'Algo eu errado',
                })
                }
                */
               this.signUpUser()
              
          // If Restaurant SignUp
          }else if(this.checkbox ===true){

            let booleanParking = 0

            if(this.parking==true){
              booleanParking = 1
            }

              this.$fire({
                title:"Registando Restaurante...",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton:false,         
              })
              
             await this.$store.dispatch('addRestaurant',{
                      

                name:this.restautantName,
                description: this.restaurantDescrip,
                parking : booleanParking,
                address:this.restaurantLocation,
                zipCode: this.restaurantZipCode

               }).then(async()=>{


                const lastRestaurantId = this.$store.getters.getLastRestaurantId
                
                let response =  this.$store.getters.feedbackChecker;

                if(response == 201){

                 await this.$store.dispatch('uploadRestaurantImages',{

                    coverImg:this.coverImg,
                    logoImg: this.logoImg,
                    lastRestaurantId: lastRestaurantId

                  }).then(async()=>{

                    response = this.$store.getters.feedbackChecker

                        if(response == 200){

                          
                          

                                 this.$fire({
                                  title:"Registando Utilizador...",
                                  allowEscapeKey: false,
                                  allowOutsideClick: false,
                                  showCancelButton: false,
                                  showConfirmButton:false,         
                                 })

                              //Signup User Begins here
                              this.signUpUser()
                              // User signup ends here
                     

                        }else if(response == 404){
                          this.$fire({
                          type: "error",
                          title: 'Oops...!',
                          text: 'O restaurante não foi encontrado ',
                          }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            })
                          this.$refs.form.reset()
                        }else if(response == 400){
                          this.$fire({
                          type: "error",
                          title: 'Oops...!',
                          text: 'A imagem não é válida',
                           }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            })
                           this.$refs.form.reset()
                        }else{
                          this.$fire({
                          type: "error",
                          title: 'Oops!',
                          text: 'Ocorreu um erro',
                          }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            })
                        }



                  }).catch((error)=>{
                    /*
                     this.$fire({
                  type: "error",
                  title: 'Oops...!',
                  text: 'Algo deu errado',
                })
                */
                    console.log(error)
                  })
                }else{
                  this.$fire({
                  type: "error",
                  title: 'Oops...!',
                  text: 'Algo deu errado',
                }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            })
                //this.$refs.form.reset()
                }



               }).catch((error)=>{
                 /*
                  this.$fire({
                  type: "error",
                  title: 'Oops...!',
                  text: 'Algo deu errado',
                })
                */
                console.log(error)
              })
          }
          this.$refs.form.reset()

      }

              this.$store.state.lastRestaurantId = ""
              this.$store.state.feedback = "";
              this.$router.replace("/");
    }
  }
};
</script>