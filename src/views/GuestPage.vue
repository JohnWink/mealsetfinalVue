<template>
  <div class="guestPage">
    <v-row align="center" justify="center">
      <v-img max-height="100%" max-width="100%" src="../assets/landingpage.png">
        <v-row align="start" justify="center">
          <!-- ++++++++++++++++++++++++++++++++++Registration dialog box+++++++++++++++++++++++++++++++-->

          <v-col sm="2" offset-sm="7" xs="2" offset="7" cols="3">
          <registration/>
          </v-col>
          <!--Login Button to pop up modal   !-->
          <v-col cols="5" sm="3" offset-sm="0" offset="6" >
            <login/>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col>
            <p
              :style="fontsize"
              id="header-text1"
              class="font-weight-bold white--text text-center"
            >Bem vindo ao MealSet!</p>
            <p
              id="header-text2"
              class="headline font-weight-bold black--text text-center"
            >Começa já a utilizar a nossa aplicação</p>
          </v-col>
        </v-row>
      </v-img>
    </v-row>
    <guestPageContent/>
    <v-spacer></v-spacer>
   <!-- <footerVue/> !-->
  </div>
</template>

<style>
#header-text1 {
  text-shadow: 1px 1px 14px gray ;
  margin-top: 15%;
}
#header-text2 {
  text-shadow: 0px 0px 20px gray ;
  margin-top: 15%;
}




</style>

<script>
//import footerVue from "@/components/footerVue.vue";
//import registration from "@/components/registration.vue";
import login from "@/components/login.vue";
import guestPageContent from "@/components/guestPageContent.vue";
import registration from "@/components/registration.vue"
export default {
  name: "guestPage",
  
  components: {
    //footerVue,
    registration,
    login,
    guestPageContent
  },
  data: () => ({
    fontsize: "",
    compHeight: ""
  }),
  methods:{
    mobileAjust(){

       let cssLine = "font-size:580%;"
      
      if(window.innerWidth < 600){
        
        cssLine += "font-size:300%;"
        
      }
      this.fontsize = cssLine;
    },
  },
  created(){
      console.log("we're here")
    window.addEventListener('resize', this.mobileAjust);
    this.mobileAjust();
  }
};
</script>