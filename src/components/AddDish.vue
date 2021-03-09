<!--adding has a base tamplet -->
<template>
   <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
       <v-btn large rounded color="green lighten-1"  dark v-on="on">Adicionar prato</v-btn>
    </template>
    <v-card>
      <!--Fechar-->
      <v-toolbar color="green lighten-1" dark>
        <v-row>
          <v-col class="text-left mt-2 ml-6">
            <v-toolbar-title >Adicionar prato</v-toolbar-title>
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
            label="Nome do prato"
            color="green darken-1"                 
            placeholder="Nome do Prato..."
            required
        ></v-text-field>


         <v-file-input
          label="Imagem"
          v-model="foto"
          :rules="fotoRules"
          required
          filled
          prepend-icon="mdi-camera"
          color="#reen darken-1"
         ></v-file-input>

        <v-textarea  outlined 
            v-model="description"            
            :rules="descripRules"            
            color="green darken-1"
            label="Descrição do Prato"                 
            placeholder="Descrição do Prato..."                    
        ></v-textarea> 

          <v-textarea  outlined 
            v-model="price"            
            :rules="priceRules"            
            color="green darken-1"
            label="Preço do Prato"                 
            placeholder="Preço do Prato..."                    
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
          v-model="recommended" 
          required       
          label="Prato para as Recomendaçôes"   
          true-value = 1
          false-value = 0     
        ></v-checkbox>



      <v-btn color="green lighten" class="white--text" large rounded @click="submit">Adicionar Restaurante</v-btn>
     
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
    foto:[],
    description: "",
    price: 0,
    //tag:"",
   // tagSlc:['Carne', 'Peixe', 'Vegetariano', 'Sobremesa'],
    recommended: 0,
    

    //----------- dish submition rules----------------

    descripRules:[
        v => !!v || 'Por favor preencha a Descrição do Prato.',
        v => (v && v.length >= 15) || 'Tem de ter mais de 15 caracteres',
    ],

    nameRules:[
        v => !!v || 'Por favor preencha o nome.',
        v => (v && v.length >= 5) || 'Tem de ter mais de 5 caracteres',
    ],

    fotoRules:[
        v => v.length != 0 || 'Por favor Introduza a foto.',
       
    ],

    priceRUles:[
         v => !!v || 'Por favor preencha o Preço do prato.',
    ]
    
  }),
  

methods: {
  async  submit () {

  
      if (this.$refs.form.validate()) {
        let  loggedUser = JSON.parse(sessionStorage.getItem("loggedUser"))
        let response
        this.dialog=false

         this.$fire({
                title:"Adicionando Prato...",
                allowEscapeKey: false,
                allowOutsideClick: false,
                showCancelButton: false,
                showConfirmButton:false,         
               })

        //if condtion if no img was added
        if(this.foto.length == 0){
          this.imgLink ="https://media.istockphoto.com/vectors/knife-fork-plate-drawing-vector-id1047553544"
        }


       await this.$store.dispatch("add_dish",{
            name: this.name,
            description: this.description,
            price:this.price,
            recommended:this.recommended,
            idRestaurant: loggedUser.idRestaurant
        }).then(async()=>{

            response = this.$store.getters.feedbackChecker

            if(response == 201){
              let lastDishId = this.$store.getters.getLastDishId
              await this.$store.dispatch("upload_dish_foto",{
                idDish:lastDishId,
                foto: this.foto
              }).then(()=>{

                response = this.$store.getters.feedbackChecker

                if(response == 200){
                     this.$fire({
                      title: "Prato Adicionado!",          
                      type: "success",
                      confirmButtonText: "ok"
                      }).then((result) => {
                      if (result.value) {
                      location.reload();}
                      });
                }else if(response == 404){
                  this.$fire({
                      title: "Prato não foi encontrado",          
                      type: "error",
                      confirmButtonText: "ok"
                      }).then((result) => {
                      if (result.value) {
                      location.reload();}
                      });
                }else if(response == 400){
                  this.$fire({
                      title: "Imagem inválida",          
                      type: "error",
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
              })
         
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
            console.log("Error in adding dish: ", error)

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