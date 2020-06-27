<template>
    <div class="notificationPage">
        
        <div class="mr-2 mb-6 mt-6" align="center" justify="center">
        
            <!-- ++++++++++++++++++++++++++++++++++navbar logout profile+++++++++++++++++++++++++++++++-->
            <v-row align="start" justify="center" >
                <v-col cols="1">
                    <navBar />
                </v-col>

                <v-col cols="3" sm="2" offset-sm="6" offset="6">
                    <perfil />
                </v-col>

                <v-col cols="3" sm="1" offset-sm="0" offset="7">
                    <logout />
                </v-col>
            </v-row>
            <!--++++++++++++++++table and set up so it doesnt clip the table by the navbar++++++++++++++++++++++++++++++++ -->

            <!-------------------------Notification table-------------------------------------------------------------------------------->
            <v-row class="pl-10 ml-10" >
                <v-col cols="12"  >
                    <v-data-table
                    v-model="selected"
                    :headers="headersMessage"                    
                    :items="notification"
                    :items-per-page="5"                    
                    :single-select="singleSelect"
                    item-key="id"
                    show-select
                    class="elevation-1"
                    >


                        <template v-slot:item.status="{ item }">
                            <v-chip :color="getColor(item.status)" dark> {{ item.status }}</v-chip>
                        </template>

                    
                    </v-data-table>

                </v-col>
                
               
                   

                <v-col cols="12" offset="0" sm="6" offset-sm="6"  align-self="end" justify="end" >
                    <v-btn v-if="this.selected.length!== 0" 
                    large rounded color="amber lighten-1"
                    class="white--text" @click="deleteNotification()">
                        Remover Mensagem
                    </v-btn>
                    <v-btn v-else large rounded  disabled>Remover Mensagem</v-btn>
                </v-col>
                   

               

                

            </v-row >

            
            



        </div>

    <footerVue/>


         
    
    </div>
</template>

<script>

    
    import NavBar from "@/components/navBar.vue";
    import footerVue from "@/components/footerVue.vue";
    import Logout from "@/components/logout.vue";
    import perfil from "@/components/perfil.vue";
  

export default {

    name:"notificationPage",

    components:{
        
        NavBar,
        footerVue,    
        Logout,
        perfil
    },
    data () {
        
        return {

            
            singleSelect: true,
            selected: [],
            notification: [],
            
            
            statusStr: "",
            headersMessage: [
                
                { text: 'Restaurante', value: 'idRestaurant',align: 'start' },
                { text: 'Data', value: 'date' },
                { text: 'Estado da Reserva', value: 'status' },
                { text: 'Mensagem', value: 'message' },            
                
            ],

            checker: "border: solid red 3px"
            

            


        }
        
        
      
    },

    
    
    async created(){
     
        
    let loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))
   await this.$store.dispatch("get_user_notifications",{
        idUser: loggedUser.idUser
    }).then(()=>{
        this.notification = this.$store.getters.getUserNotifications
    }).catch((error)=>{
        console.log("Error in getting user notifications",error)
    })

    },

    beforeMount(){
        /*
        this.$store.commit("CONFIRM_HISTORY_READ",{
            id: this.$store.getters.getLoggedUserId
        })
        */
    },

    
    
    methods:{




        //change the tag color and value of the status reservation 
        
        getColor(status){

            if (status == "A ser Comfirmado...") return 'orange lighten-1'
            else if(status =="Reserva Comfirmada!") return 'green lighten-1'       
            else return 'red lighten-1' 
        },

        //mark the message has readed

        deleteNotification(){
            this.$store.commit("DELETE_NOTIFICATION",{
                id: this.selected[0].idNotification,
            })

        this.$fire({
            title: "Mensagem Removida",          
            type: "success",
            confirmButtonText: "ok"
        })

        location.reload();

            

        }

        
       

        
    }


}
</script>