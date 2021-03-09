<template>
<div class="login">


  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn large rounded color="#5C6BC0" elevation="7" dark v-on="on">Iniciar Sessão</v-btn>
    </template>
    <!--MODAL DE LOGIN-->
    <v-card>
      <!--Fechar-->
      <v-toolbar color="#5C6BC0">
        <v-row>
          <v-col class="text-left mt-2 ml-6">
            <v-toolbar-title id="text">Login</v-toolbar-title>
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
          clearable
          color="#5C6BC0"
          :rules="nameRules"
          label="Username"
          required
        ></v-text-field>
        <!--Password-->
        <v-text-field
          prepend-icon="fas fa-lock"
          v-model="password"
          clearable
          color="#5C6BC0"
          :rules="passwordRules"
          label="Password"
          required
          type="password"
        ></v-text-field>
      </v-form>

      <!--Botões-->
      <v-card-actions>
        <v-col class="text-right mr-3">
          <v-btn color="#5C6BC0" dark @click="login">Iniciar Sessão</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>


</div>
</template>

<script>
export default {
  name: "login",

  data: () => ({
    errorMessages: "",
    username: "",
    password: "",
    dialog: false,


    nameRules: [v => !!v || "Por favor preencha o Username"],

    passwordRules: [password => !!password || "Por favor preencha a Password"]
  }),

  methods: {
      async login() {
      if (this.$refs.form.validate()) {
        this.dialog = false
        //this.dialog = false;

        /*
        this.$store.commit("LOGIN", {
          username: this.username,
          password: this.password
        });

        */

        this.$fire({
                title:"Verificando Login...",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton:false,         
              })

       await this.$store.dispatch('login',{
           username:this.username,
           password:this.password
       }).then(()=>{

        let userType = ""
        let response = this.$store.getters.feedbackChecker
        console.log("Axios response:", response)

        if(response == 201){

          userType = this.$store.getters.checkUserType
          
          console.log("User type: ", userType)
           if(userType == "cliente"){

             this.$fire({
                type: "success",
                title: `Bem vindo ${this.username}!`,
             })

               this.$router.push({ path: "/landingPage" });
               console.log("Pushing to landing page")
              
           }else if(userType == "restaurante"){
             
              this.$fire({
                type: "success",
                title: `Bem vindo ${this.username}!`,
             })

               this.$router.push({ path: "/userRestaurantPage" });  
           }
           
        }else if(response == 401){
            this.$fire({
                type: "error",
                title: 'Oops...!',
                text: 'Password ou username inválido',
            })
        }else if(response == 404){
            this.$fire({
                type: "error",
                title: 'Oops...!',
                text: 'User não existe',
            })
        }else{
           this.$fire({
                type: "error",
                title: 'Oops...!',
                text: 'Algo deu errado',
            })
        }

        this.$refs.form.reset()

       }).catch((error)=>{
          
           console.log(error)
      
            this.$fire({
                type: "error",
                title: 'Oops...!',
                text: 'Algo deu errado',
            })
           //console.log("error status")
       })

      }
    },

    pushForward(){

    }
  },
  computed: {
    form() {
      return {
        username: this.username,
        password: this.password
      };
    }
  }
};
</script>



