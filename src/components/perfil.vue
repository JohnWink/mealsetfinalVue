<template>
  <v-dialog v-model="dialog" persistent max-width="400" max-height="600">
    <template v-slot:activator="{ on }">
      <v-img
              class="avatar"
              :src="loggedUser.avatar"
              width="80"
              height="80"
              v-on="on"
              style="border: 4px solid rgba(92, 107, 192, 0.82)"
            ></v-img>
    </template>
    
    <!--MODAL DE PERFIL-->
    <v-card>
      <!--Fechar-->
      <v-toolbar color="#5C6BC0">
        <v-row>
          <v-col class="text-left mt-2 ml-6 title1">
            <v-toolbar-title >Perfil</v-toolbar-title>
          </v-col>
          <v-col class="text-right mt-2">
            <v-btn color="#ffffff" text right @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
      <v-form  ref="form" v-model="valid" lazy-validation>
        <v-container class="text-center">
          
          <v-col align="center" justify="center">
            <v-img
              class="avatar"
              :src="loggedUser.avatar "
              width="200px"
              height="200px"
            ></v-img>
          </v-col>

          <v-col class="text-left">
            <v-text-field
              label="username"
              color="#5C6BC0"
              placeholder
              :value="loggedUser.username"
              outlined
              disabled
            ></v-text-field>

            <v-text-field
              label="Email"
              color="#5C6BC0"
              placeholder
              :value="loggedUser.email"
              outlined
              disabled
            ></v-text-field>


              <v-text-field
              label="Contact"
              v-model="loggedUser.contact"
              color="#5C6BC0"
              placeholder
              :value="loggedUser.contact"
              outlined
            ></v-text-field>


            <v-text-field
              label="Password Atual"
              v-model="oldPassword"
              color="#5C6BC0"
              placeholder="Password Anterior..."
              outlined
              :disabled="alter"
              type="password"
            ></v-text-field>

            <v-text-field
              label="Nova Password"
              v-model="newPassword"
              color="#5C6BC0"
              placeholder="Nova Password.."
              outlined
              :disabled="alter"
              type="password"
            ></v-text-field>
            
      
            <v-file-input
            label="Novo Avatar"
            v-model="newAvatar"
            filled
            prepend-icon="mdi-camera"
            outlined
            color="#5C6BC0"
             ></v-file-input>
            
          </v-col>
        </v-container>
        <!--Botões-->
        <v-card-actions class="text-right mr-3">
          <v-col >
            <v-btn color="#f7c23e"  dark @click="submit">Guardar</v-btn>                
          </v-col>         
          
        </v-card-actions>


      </v-form>
    </v-card>
  </v-dialog>
</template>


<style>
.title1 {
  color: white;
  text-shadow: 0px 0px 5px gray;
}

.text1 {
  color: black;
  font-weight: 500;
  margin-left: 15%;
}

.text2 {
  color: black;
  font-weight: 300;
}

.avatar {
  border-radius: 100%;
  margin-bottom: 5%;
}
</style>


<script>
export default {
  name: "perfil",

  data: () => ({
    dialog: false,
    //current logged user data info

    //email:"",
    oldAvatar:"",
    oldPassword: "",
    oldChecker: "",
    newPassword: "",
    newAvatar:[],
    alter: false,   
    show: true,
    loggedUser:[],

    //rules for old and newpassword, 

    


  }),

  methods: {
   async submit(){
      //aply the change of the information, in this case profle
      //first check if avatar are emphty , if emphty  it will send the old one
      
   
    
      if (this.$refs.form.validate()){

          let message = ""
          let response
     
       
        
        if(this.newAvatar.length != 0){

            await this.$store.dispatch("uploadAvatar",{

                idUser: this.loggedUser.idUser,
                avatar:this.newAvatar

            }).then(()=>{
                 response =  this.$store.getters.feedbackChecker;

                if(response == 200){

                message = "success"

                }else if(response == 404){
                  message = "O utilizador não foi encontrado"
                }else if(response == 400){
                   message = "A imagem é inválida"
                }
                else{
                  message="Erro interno"
                }
                   
            }).catch((error)=>{
                 console.log("Error", error)
                message="erro interno"
            })
              
              /*
            this.$store.commit("PROFILE_EDIT",{
              id:this.$store.state.loggedUser.idUser,
              email: this.email,
              password: this.newPassword,
              avatar: this.newAvatar
            })
            */
          }


        if(this.newPassword != "" || this.oldPassword !=""){
               if(this.newPassword != "" &&  this.oldPassword !=""){
            
            await this.$store.dispatch("newPassword",{
                idUser: this.loggedUser.idUser,
                password:this.oldPassword,
                newPassword: this.newPassword

            }).then(()=>{

                response =  this.$store.getters.feedbackChecker;

                if(response == 200){

                message = "password success"

                }else if (response == 404){
                  message="O utilizador foi encontrado"
                }else if (response == 400){
                  message="Conteudo vazio"
                }else{
                  message="Erro interno"
                }
                   
            }).catch((error)=>{
                 console.log("Error", error)
                message="erro interno"
            })
            
          }else{
             this.$fire({
                    type: "error",
                    title: "Erro",          
                    text: 'Para alterar a password por favor preencha a password atual e nova password ',
              })
          }


      
        }

          //Overall update
          
        await this.$store.dispatch("userUpdate",{
            idUser:this.loggedUser.idUser,
            diet:this.loggedUser.diet,
            contact:this.loggedUser.contact

        }).then(()=>{

          response =  this.$store.getters.feedbackChecker;

            if(response == 200){

                message = "success"
            }else if(response==404){
              message = "O utilizador não foi encontrado"
              }else{
              message="erro interno"
            }
          
             
        }).catch((error)=>{
            console.log("Error", error)
            message="erro interno"
        })
       
       if(message == "success"){
                  this.$fire({
                    type: "success",
                    title: "Prefil Editado!",  
                    confirmButtonText:"Confirmar"        
                 },
                 function(){  
                   this.update()
                 })

                     // change the buttons disabled values

                this.alter= true
                this.show = false
        }else if(message=="password success"){
          this.$fire({
                    type: "success",
                    title: "Prefil Editado!", 
                    text:"A confirmação da password foi enviada para o seu email",
                    confirmButtonText:"Confirmar"       
                 },function(){  
                   this.update()
                 })
        }else{
                  this.$fire({
                    type: "error",
                    title: "Oops!!",          
                    text: message,
                 })
            }

        


      

        

            
        
      }
    },

    update(){

      this.email = this.$store.state.loggedUser.email
      this.oldAvatar = this.$store.state.loggedUser.avatar
      //this.oldChecker = this.$store.state.loggedUser[0].password
      this.$router.replace("/landingPage");
    },
   

    
    
  },

  created() {
      
    this.loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))

    this.email = this.$store.state.loggedUser.email

    this.oldAvatar = this.$store.state.loggedUser.avatar
    //this.oldChecker = this.$store.state.loggedUser[0].password
    
    
  }

};
</script>