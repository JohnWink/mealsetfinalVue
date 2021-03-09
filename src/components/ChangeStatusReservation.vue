<!--Using the addrestaurtant has a part templete -->


<template>
   <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
       <v-btn large rounded color="#f7c23e" dark v-on="on">Mudar estado da Reserva</v-btn>
    </template>
    <v-card>
      <!--Fechar-->
      <v-toolbar color="#f7c23e">
        <v-row>
          <v-col class="text-left mt-2 ml-6">
            <v-toolbar-title >Estado da Reserva </v-toolbar-title>
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
        <v-select
          v-model="statusChange"
          :items="statusSlc"
          :rules="[v => !!v || 'Selecione o estado da reserva!']"
          label="Estado da Reserva"
          required
        ></v-select>

        <v-textarea  outlined
          v-model="notificationText"
          name="input-7-4"
          color="indigo darken-1"                 
          placeholder="Escreva alguma notação..."       
        ></v-textarea> 

         

      <v-btn color="indigo lighten" class="white--text" large rounded @click="submit">Confirmar</v-btn>
     
     </v-form>
    </v-card>
  </v-dialog>
  
</template>

<script>
export default {
 name: "ChangeStatusRes",
props:{
  selected:{
    type: Object,
    default: function () {
        return { message: 'default on' }
      }
  }

},

data: () => ({
    
    
    dialog: false,

    statusSlc:['Aceite', 'Recusado'],

    statusChange:"",
    
    notificationText:"",
  
    
  }),
  

methods: {
   async submit () {


  
      if (this.$refs.form.validate()) {


         this.$fire({
                title:"Atualizando Reserva...",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton:false,         
               })

        this.dialog=false
        let noteText = this.notificationText        
        let setDate = new Date()

        var dd = setDate.getDate();
        var mm = setDate.getMonth()+1; //As January is 0.
        var yyyy = setDate.getFullYear();

        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;

       
        let postDate = yyyy + "-" + mm +"-"+ dd +"  "+ setDate.getHours()+ ":" + setDate.getMinutes() + ":" + setDate.getSeconds()
        //conditions for the status change , if true then it will go to the storage and change that data
        //also making sure that if we are changing a status true to true again, not to send to the historic again 
        //let statusValue =""
        console.log("current date: ", postDate)

        let response
        let loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))

        if(this.selected.status != "Reserva Confirmada!"){
           
          if(this.statusChange ==='Aceite' ){
          
              //statusValue = "Reserva Confirmada!"
              

             await this.$store.dispatch("confirm_reservation",{
                id: this.selected.idReservation,            
                status: "Reserva Confirmada"
              }).then(async()=>{
                  response = this.$store.getters.feedbackChecker
                   //sending the notification
                if(response== 200){
                     await this.$store.dispatch("add_notification",{
                    idUser: this.selected.idUser,
                    idRestaurant: loggedUser.idRestaurant,
                    status: "Reserva Confirmada",
                    message: noteText,
                    dateTime: postDate,
                    }).then(()=>{
                        response = this.$store.getters.feedbackChecker

                        if(response == 201){
                            this.$fire({
                                title: "Reserva Aceitada!",          
                                type: "sucess",
                                confirmButtonText: "ok"
                            }).then((result) => {
                                if (result.value) {
                                location.reload();}
                            });
                         }else{
                            this.$fire({
                            title: "Erro interno",          
                            type: "error",
                            confirmButtonText: "ok"
                            }).then((result) => {
                            if (result.value) {
                            location.reload();}
                            });
                         }
                    
                 

                }).catch((error)=>{
                    console.log("Error in add notification: ", error)
                     this.$fire({
              title: "Erro interno",          
              type: "error",
              confirmButtonText: "ok"
              }).then((result) => {
              if (result.value) {
              location.reload();}
              });
                })
                }
               

            }).catch((error)=>{
                console.log("Error in accept reservation: ", error)
                 this.$fire({
              title: "Erro interno",          
              type: "error",
              confirmButtonText: "ok"
              }).then((result) => {
              if (result.value) {
              location.reload();}
              });
            })

             




            


            }
          
            
          
            // if false it will change the status to "Reserva Recusada"
         
            if(this.statusChange === 'Recusado'){
              if(noteText !== ""){

                //statusValue = "Reserva Recusada"

              await this.$store.dispatch("confirm_reservation",{
                id: this.selected.idReservation ,
                status: "Reserva Recusada"
              }).then(async()=>{
                   response = this.$store.getters.feedbackChecker
                   if(response == 200){
                            //sending the notification

                    await this.$store.dispatch("add_notification",{
                        idUser: this.selected.idUser,
                        idRestaurant: loggedUser.idRestaurant,
                        status:"Reserva Recusada",
                        message: noteText,
                        dateTime: postDate,
                    }).then(()=>{
                        response = this.$store.getters.feedbackChecker
                        if(response == 201){
                                this.$fire({
                                title: "Reserva Recusada!",          
                                type: "sucess",
                                confirmButtonText: "ok"
                                }).then((result) => {
                                    if (result.value) {
                                    location.reload();}
                                });
                        }else{
                           this.$fire({
              title: "Erro interno",          
              type: "error",
              confirmButtonText: "ok"
              }).then((result) => {
              if (result.value) {
              location.reload();}
              });
                        }
                    }).catch((error)=>{
                        console.log("Error in add notification: ", error)
                    })

                   }
              }).catch((error)=>{
                  console.log("Error in refuse reservation: ", error)
              })
         
             




              }
              else{

                this.$fire({
                  title: "Adicione uma justificação na área de notação!",          
                  type: "error",
                  confirmButtonText: "ok"
                }).then((result) => {
                    if (result.value) {
                    location.reload();}
                });
              }

              

              

            }


      
        
        }
        else if (this.selected.status == "Reserva Confirmada!"){


          if(this.statusChange === 'Recusado'){
              if(noteText !== ""){

                //statusValue = "Reserva Recusada"

           
              await this.$store.dispatch("confirm_reservation",{
                id: this.selected.idReservation ,
                status:"Reserva Confirmada"
              }).then(async()=>{
                   response = this.$store.getters.feedbackChecker
                   if(response == 200){
                            //sending the notification

                    await this.$store.dispatch("add_notification",{
                        idUser: this.selected.idUser,
                        idRestaurant: loggedUser.idRestaurant,
                        status: "Reserva Confirmada",
                        message: noteText,
                        date: postDate,
                    }).then(()=>{
                        response = this.$store.getters.feedbackChecker
                        if(response == 201){
                                this.$fire({
                                title: "Reserva Recusada!",          
                                type: "sucess",
                                confirmButtonText: "ok"
                                }).then((result) => {
                                    if (result.value) {
                                    location.reload();}
                                });
                        }
                    }).catch((error)=>{
                        console.log("Error in add notification: ", error)
                         this.$fire({
              title: "Erro interno",          
              type: "error",
              confirmButtonText: "ok"
              }).then((result) => {
              if (result.value) {
              location.reload();}
              });
                    })

                   }
              }).catch((error)=>{
                  console.log("Error in refuse reservation: ", error)
                   this.$fire({
              title: "Erro interno",          
              type: "error",
              confirmButtonText: "ok"
              }).then((result) => {
              if (result.value) {
              location.reload();}
              });
              })


            

              }else{

                this.$fire({
                  title: "Adicione uma justificação na área de notação!",          
                  type: "error",
                  confirmButtonText: "ok"
                }).then((result) => {
                    if (result.value) {
                    location.reload();}
                });
              }

              

              

            }
            else{
              this.$fire({
                title: "A reserva já foi aceite!",          
                type: "warning",
                confirmButtonText: "ok"
              }).then((result) => {
                  if (result.value) {
                  location.reload();}
              });
            }



          
          
        } 

                
        

        
        
      }
    }
  }

  
}

</script>