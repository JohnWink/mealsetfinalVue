<template> 

        <div>
            <v-card id="comment" elevation="4" class="my-2">
                <v-row  justify="space-between" align="center" id="comment" >

                    <v-col cols="7"  class="mx-4">
                        <v-avatar size="60">
                            <v-img  :src="user.avatar"
                                alt="user"/>
                        </v-avatar>                
                        <span class="pl-2"><b>{{user.name}}  </b>{{commentDate}}</span>
                    </v-col>

                    <!--method to calculate and print the rate stars and empthy stars-->
                    <v-col  cols="3" sm="3">
                        <div v-html="rateprint(rating.value)"></div>
                    </v-col>

                    <v-col cols="12">
                        <v-row class=" mx-4">{{rating.comment}}</v-row>
                    </v-col >

                </v-row>
            </v-card>
        </div>
</template>


<style>
    #comment{
        border-radius: 10px;
    }
</style>




<script>
export default {
  name: "commentReview",
  data: () => ({      
      checker:"border: solid indigo",
      user:[],
      commentDate:""


    }),

    props:["rating"],


    methods:{
        rateprint: function(rate){
            
            let rateCode = ""
            for(let i=0;i<rate;i++){  rateCode += `<i style="color:gold" class="fas fa-star"></i> ` }     
                        
            let nostar = 5-rate

            for(let i=0;i<nostar;i++)  {rateCode += `<i style="color:BurlyWood" class="fas fa-star"></i> `}             

            return rateCode;
            
        },

        

    },
   

    async created(){
        await this.$store.dispatch("getUser",{
                
            idUser: this.rating.idUser

            }).then(()=>{

            this.user = this.$store.getters.getUserDetails

                


                
        }).catch((error)=>{
                console.log("Error in getting a user in comments:", error)
        })

        console.log(this.rating.datetime)
        //var t = this.rating.dateTime.split(/[- :]/)
        
        let date = new Date(this.rating.dateTime)

        var dd = date.getDate();
        var mm = date.getMonth()+1; //As January is 0.
        var yyyy = date.getFullYear();

        if(dd<10) dd='0'+dd;
        if(mm<10) mm='0'+mm;

        this.commentDate = `- ${dd}/${mm}/${yyyy} às ${date.getHours()}:${date.getMinutes()}`

    }
};
</script>