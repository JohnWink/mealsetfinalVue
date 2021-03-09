<template>
    <div class="userRestaurantPage">
        
        <v-row class="mr-2 mb-6 mt-6" align="center" justify="center">
        
            <!-- ++++++++++++++++++++++++++++++++++navbar logout profile+++++++++++++++++++++++++++++++-->
            <v-row class="ml-12 pl-12" align="center" justify="space-between">
                <v-col cols="1">
                    <navBar/>
                </v-col>
                

                <v-col  cols="12" sm="3">
                    <v-img contain=true max-height="150px" :src="logoPage" style="border: solid indigo ;border-radius: 12px"></v-img>
                    <!--Inject the restaurants owners restaurant logo-->

                </v-col>
                <v-col cols="12" sm="5" >
                    

                </v-col>

                <v-col cols="7" sm="1" >
                    <perfil/>
                </v-col>
                <v-col cols="5" sm="2">
                    <logout/>
                </v-col>

            </v-row>
            <!--++++++++++++++++table and set up so it doesnt clip the table by the navbar++++++++++++++++++++++++++++++++ -->

            <!-------------------------reservation table-------------------------------------------------------------------------------->
            <v-row class="pl-12 ml-12" v-if="this.tableMode == true">
                <v-col cols="12" >
                    <v-data-table
                    v-model="selected"
                    :headers="headersReservation"                    
                    :items="reservations"                    
                    :single-select="singleSelect"
                    item-key="idReservation"
                    show-select
                    class="elevation-1"
                    >
                    <!--Condition to change status to a string and give color chips -->
                    <template v-slot:item.confirmed="{ item }">
                        <v-chip :color="getColor(item.confirmed)" dark> {{ item.confirmed }}</v-chip>
                    </template>

                    
                    </v-data-table>

                </v-col>
                
                
                <v-row class="pl-6 ml-6 mr-6 mt-3"  align="center" justify="center" justify-sm="space-between">
                   
                   <v-col cols="12" sm="2">
                       <v-btn v-on:click="tableMode = false" large rounded color="indigo lighten-1" class="white--text">Pratos</v-btn>
                   </v-col>

                   <v-col cols="12" sm="6">
                       <ChangeStatusRes v-if="this.selected.length!== 0" :selected="this.selected[0]" />  
                        <v-btn v-else large rounded  disabled>Mudar estado da Reserva</v-btn> 
                   </v-col>
                
                    <v-col cols="12" sm="3">
                       <v-btn  large rounded color="red" class="white--text" @click="deleteReserves()"> Limpar todas as Reservas </v-btn>
                   </v-col>
                </v-row>

               
                   

            </v-row >

            <!--------------------------dishes table---------------------------------------------------->
            <v-row class="pl-12 ml-12" v-if="this.tableMode == false">
                <v-col cols="12" >
                    <v-data-table
                        v-model="selected"
                        :headers="headersDishes"                    
                        :items="dishes"                    
                        :single-select="singleSelect"
                        item-key="id"
                        show-select
                        class="elevation-1"
                    >
                        <template v-slot:item.img="{ item }">
                            <a :href="item.foto" target="_blank">Link do prato: {{item.name}}</a>
                        </template>
                        <!--
                        <template v-slot:item.recommended="{ item }">
                            <v-chip :color="colorRecommended(item.recommended)" dark> {{ getRecommended(item.recommended) }}</v-chip>
                        </template>
                        -->
                    <!--add a v-slot item on img sence we will be sing new window link to imgur-->
                    </v-data-table>

                </v-col>
                
                
                <v-row class=" pl-6 ml-6 mr-6 mt-3"  align="center" justify="center" justify-sm="space-between">
                   <!--need to figure out how to bind selected items-->
                   
                 <ChangeStatusRes v-if="this.selected.length!== 0" :selected="this.selected[0]" />
                    
                    <v-col cols="12" sm="3">
                       <v-btn v-on:click="tableMode = true" large rounded color="indigo lighten-1" class="white--text">Reservas</v-btn>
                   </v-col>

                   <v-col cols="12" sm="4"> 
                        <addDish />
                   </v-col> 

                   

                   <v-col cols="12" sm="4">
                       <v-btn v-if="this.selected.length!== 0" large rounded color="red lighten-1" class="white--text" @click="deleteItem()" >Remover prato</v-btn>
                       <v-btn v-else large rounded disabled>Remover prato</v-btn>
                   </v-col>
                   

                </v-row>

            </v-row >

            



        </v-row>

    <footerVue/>


         
    
    </div>
</template>

<script>

    
    import NavBar from "@/components/navBar.vue";
    import footerVue from "@/components/footerVue.vue";
    import Logout from "@/components/logout.vue";
    import perfil from "@/components/perfil.vue";
    import ChangeStatusRes from "@/components/ChangeStatusReservation.vue"
    import addDish from "@/components/AddDish.vue";

export default {

    name:"userRestaurantPage",

    components:{
        
        NavBar,
        footerVue,    
        Logout,
        perfil,
        ChangeStatusRes,
        addDish
    },
    data () {
        
        return {

            tableMode: true, // this will be the switch that allows it to change from reservation table to plate table  
            singleSelect: true,
            selected: [],
            restaurants: [],
            logoPage: "https://elements-cover-images-0.imgix.net/6359eb8d-2d31-4bea-a137-92baa4b68eb2?auto=compress%2Cformat&fit=max&w=710&s=d7e84e77ccd12f5ab06926237b5ded0d",
            
            statusStr: "",
            headersReservation: [
                
                { text: 'Nome', value: 'name' },
                { text: 'Data', value: 'dateTime' },
                { text: 'Numero de Pessoas', value: 'n_people' },
                { text: 'Estado da Reserva', value:'confirmed' },
                
                
            ],
            

            headersDishes: [
                
                { text: 'Prato', value: 'name' },
                { text: 'Imagem', value: 'foto' },
                //{ text: 'Tipo de Prato', value: 'tag' },
                { text: 'Descrição', value: 'description' },
                {text:'Preço', value:'price'},
                //{ text: 'Avaliação', value: 'evaluation' },
                { text: 'Recomendado', value: 'recommended'}
                
            ],
            reservations: [],
            dishes: [],
            loggedUser:[]

        }
        
        
      
    },

    
    
    created(){

        
       

        //this.logoPage = this.$store.getters.getCoverLogo     somehow the getter isnt working?          
    },

    async beforeCreate(){

        this.loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))

        console.log("before create logged user id Restaurant: ", this.loggedUser.idRestaurant)

        await this.$store.dispatch("get_restaurant_reservations",{
            idRestaurant:this.loggedUser.idRestaurant
        }).then(()=>{

            this.reservations  = this.$store.getters.getRestaurantReservations

        }).catch((error)=>{
            console.log("Error in getting restaurant reservations: ", error)
        })

        this.loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))
        await this.$store.dispatch("get_restaurant_dishes",{
            idRestaurant:this.loggedUser.idRestaurant
        }).then(()=>{

             this.dishes = this.$store.getters.getRestaurantDishes

        }).catch((error)=>{
             console.log("Error in getting restaurant dishes: ", error)
        })
    },

    
    
    methods:{
       
        getColor(status){

            if (status == "A ser confirmado") return 'orange lighten-1'
            else if(status == "Reserva Confirmada") return 'green lighten-1'       
            else return 'red lighten-1' 
        },

        // delete dish method
        deleteItem(){

            let response

            this.$fire({
                title: 'Quer remover o Prato?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Sim!'
                }).then(async (result) => {

                
                if (result.value) {

                this.$fire({
                title:"Removendo Prato...",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton:false,         
              })

                    await this.$store.dispatch("remove_dish",{
                    idDish: this.selected[0].idDish            
                    }).then(()=>{
                        response = this.$store.getters.feedbackChecker
                        if(response == 204){
                            this.$fire({
                            title:'Prato removido!',                        
                            type:'success'
                            }).then((result) => {
                            if (result.value) {
                            location.reload();}
                            });
                        }
                       
                    }).catch((error)=>{
                        console.log("error in removing dish:", error)
                    })
                    //update List 
                    //this.dishes = this.$store.getters.getRestaurantDishes
                  
                }})
                                



          
        },
        deleteReserves(){
let response
   this.$fire({
            title: 'Tem a certeza?',
            text: "Todas as reservas vão ser permanentemente eliminadas",
            type: 'warning',
            confirmButtonText: 'Sim! Eliminar tudo!',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then(async(result) => {
            if (result.value) {

                await this.$store.dispatch("delete_restaurant_reservations",{
                    restaurantId: this.loggedUser.idRestaurant
                }).then(()=>{
                    response = this.$store.getters.feedbackChecker

                    if(response == 204){
                        this.$fire({
                            title:'Reservas removidas!',                        
                            type:'success'
                            }).then((result) => {
                            if (result.value) {
                            location.reload();}
                            });
                    }
                }).catch((error)=>{
                    console.log("Erro em remover reservas: ", error)
                })

              
            }
        })

          
        },
        // return recommended text
        getRecommended(recommendedV){
            if(recommendedV === true){ return 'Sim';}
            else{ return 'Não';}

        },

        colorRecommended(recommendedV){
            if (recommendedV == false) return 'orange lighten-1'        
            else return 'green lighten-1'
        }

        
    }


}
</script>
