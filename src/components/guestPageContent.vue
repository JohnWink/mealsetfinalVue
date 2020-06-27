<template>
  <div id="guestPageContent">
    <v-app>
      <br>
      <!--CONTENT GUEST PAGE-->

      <!--CARDS-->
     <h1 class="headline font-weight-bold text-center">Algumas funcionalidades</h1>
      <v-row class="mb-6 mx-1"  align-content="center">
        <v-col cols="12" md="4" sm="6" v-for="card in cards" :key="card.id">
          <v-card id="cards" class="mx-auto" elevation="10" max-height="350" max-width="500">
            <br>
            <v-title class="headline ml-7 font-weight-bold">{{ card.index }}</v-title>
            <v-title class="ml-7 font-weight-bold">{{ card.title }}</v-title>
            <v-img max-width="70%" max-height="70%" :src="card.img" id="cardsImg"></v-img>
            <br>
          </v-card>
        </v-col>
      </v-row>
      <v-img id="mobileAd" src="../assets/tlmv.png"></v-img>
    </v-app>
    <v-spacer></v-spacer>

    <!--ADDS-->
  </div>
</template>

<style>
#cards {
  border-radius: 20px;
  margin-top: 10%;
}
#bg {
  background-color: black;
}
#cardsImg {
  margin-left: 15%;
  margin-top: 8%;
}
#mobileAd {
  margin-top: 8%;
  margin-bottom: 8%;
}
</style>

<script>
export default {
  name: "guestPageContent",
  data: () => ({
    cards: [
      {
        index: "1.",
        title: "Começa por te registar",
        img: require("@/assets/1.png")
      },
      {
        index: "2.",
        title: "Pesquisa",
        img: require("@/assets/2.png")
      },
      {
        index: "3.",
        title: "Faz reservas",
        img: require("@/assets/3.png")
      },
      {
        index: "4.",
        title: "Avalia as refeições",
        img: require("@/assets/4.png")
      },
      {
        index: "5.",
        title: "Sobre os restaurantes",
        img: require("@/assets/5.png")
      },
      {
        index: "6.",
        title: "Comenta sobre os restaurantes",
        img: require("@/assets/6.png")
      }
    ]
  })
};
</script>