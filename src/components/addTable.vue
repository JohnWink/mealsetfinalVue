<!--adding has a base tamplet -->
<template>
   <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
       <v-btn large rounded color="green lighten-1"  dark v-on="on">Adicionar Mesa</v-btn>
    </template>
    <v-card>
      <!--Fechar-->
      <v-toolbar color="green lighten-1" dark>
        <v-row>
          <v-col class="text-left mt-2 ml-6">
            <v-toolbar-title >Adicionar Mesa</v-toolbar-title>
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
            v-model="name"            
            :rules="nameRules"
            label="Nome da mesa"
            color="green darken-1"                 
            placeholder="Nome da Mesa..."
            required
        ></v-text-field>

        <v-text-field  
            v-model="size"            
            :rules="sizeRules"            
            color="green darken-1"
            label="Tamanho da mesa"                 
            placeholder="nº de pessoas"                    
        ></v-text-field>

        <v-textarea  outlined 
            v-model="description"            
            :rules="descripRules"            
            color="green darken-1"
            label="Descrição do Prato"                 
            placeholder="Descrição da Mesa..."                    
        ></v-textarea> 

    
<!--
        <v-select
          v-model="tag"
          :items="tagSlc"
          :rules="[v => !!v || 'Selecione o tipo de Prato!']"
          label="Tipo de Prato"
          required
        ></v-select>
-->   
        <v-checkbox
          v-model="smoking" 
          required       
          label="Zona de fumadores?"   
          true-value = 1
          false-value = 0     
        ></v-checkbox>

         <v-checkbox
          v-model="outside" 
          required       
          label="Esplanada"   
          true-value = 1
          false-value = 0     
        ></v-checkbox>



      <v-btn color="green lighten" class="white--text" large rounded @click="submit">Adicionar Mesa</v-btn>
     
     </v-form>
    </v-card>
  </v-dialog>
  
</template>

<script>
export default {
 name: "addDish",
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

    //---------new dish data-------------
    name: "",
    size:"",
    description: "",
    //tag:"",
   // tagSlc:['Carne', 'Peixe', 'Vegetariano', 'Sobremesa'],
    smoking: 0,
    outside:0,

    //----------- dish submition rules----------------

    descripRules:[
        v => !!v || 'Por favor preencha a Descrição da Mesa.',
        v => (v && v.length >= 5) || 'Tem de ter mais de 5 caracteres',
    ],

    nameRules:[
        v => !!v || 'Por favor preencha o nome.',
        v => (v && v.length >= 5) || 'Tem de ter mais de 5 caracteres',
    ],

    

    sizeRules:[
         v => !!v || 'Por favor indique o tamanho da mesa (nº de pessoas)',
    ]
    
  }),
  

methods: {
  async  submit () {

  
      if (this.$refs.form.validate()) {
        let  loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))
        let response
        this.dialog=false

         this.$fire({
                title:"Adicionando Mesa...",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton:false,         
               })

      


       await this.$store.dispatch("add_table",{
            name: this.name,
            description: this.description,
            size:this.size,
            smoking:this.smoking,
            outside: this.outside,
            idRestaurant: loggedUser.idRestaurant
        }).then(async()=>{

            response = this.$store.getters.feedbackChecker

            if(response == 201){
                this.$fire({
                      title: "Mesa Adicionada!",          
                      type: "success",
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
            console.log("Error in adding Table: ", error)

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
      
    }
  }

  
}
</script>