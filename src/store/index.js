import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
import VueAxios from 'vue-axios'

Vue.use(Vuex);
Vue.use(VueAxios, axios);

export default new Vuex.Store({
  state: {

    userDetails:[],
    
    users:[],
    restaurants:[],
    restaurantRatings:[],
    feedback:'',

    loggedUser:{
      idUser:'',
      username:'',
      email:'',
      contact:'',
      diet:'',
      avatar:'',
      userType:'',
      idRestaurant:'',
      token:''
    },
    userNotifications:[],

    existUser:false,
    logged:false,
    lastUserId:'',
    lastDishId:'',
    lastRestaurantId:'',
    restaurantTables:[],
    restaurantReservations:[],
    restaurantDishes:[],

  },
 

  mutations: {
    /* 
     async ADD_USER(state){


      const params = new URLSearchParams();

      params.append('username', state.userDetails.username);
      params.append('password',state.userDetails.password);
      params.append('email', state.userDetails.email);
      params.append('contact',state.userDetails.contact);
      params.append('zipCode',state.userDetails.zipCode);
      params.append('userType',state.userDetails.userType);

      let done = false
   

      await axios.post("https://cors-anywhere.herokuapp.com/mealset.herokuapp.com/signUp",params).then((response)=>{

      console.log(response.status)  


       state.feedback = response.status
      
      done = true
      }).catch((error)=>{
        console.log("Error:", error.response)
      
      })
      console.log(done)

      
    },
    */
   CREATE_FEEDBACK(state,payload){

    state.feedback = payload

   },

   LOGOUT(){
    sessionStorage.removeItem("loggedUser")
   },

   LAST_USER_ID(state,payload){
     state.lastUserId = payload
   },

   Last_RESTAURANT_ID(state,payload){

    state.lastRestaurantId = payload

   },

   CREATE_LOGGED_USER(state,payload){

    let result = payload
    
    state.loggedUser.idUser = result.idUser
    state.loggedUser.username = result.username
    state.loggedUser.email = result.email
    state.loggedUser.contact = result.contact
    state.loggedUser.diet = result.diet
    state.loggedUser.avatar = result.avatar
    state.loggedUser.userType = result.userType
    state.loggedUser.idRestaurant = result.idRestaurant
    state.loggedUser.token = result.token
    

    sessionStorage.setItem("loggedUser", JSON.stringify(state.loggedUser))

   },

   UPDATE_LOGGED_USER(state,payload){
    console.log("update logged user: ", payload)
    let result = payload[0]

    state.loggedUser.contact = result.contacto
    state.loggedUser.diet = result.dieta
    state.loggedUser.avatar = result.avatar
  

    sessionStorage.setItem("loggedUser", JSON.stringify(state.loggedUser))

   },

   CREATE_RESTAURANTS(state,payload){

    let result = payload[0]
    let restaurants = []
     for(let i = 0; i < result.length; i++){
      restaurants.push({
        idRestaurant:result[i].idRestaurante,
        name:result[i].nome,
        description:result[i].descrição,
        parking:result[i].estacionamento,
        address:result[i].morada,
        zipCode:result[i].Codigo_postal,
        coverFoto:result[i].coverFoto,
        logo:result[i].logoImg
      })
     } 

     state.restaurants = restaurants

      console.log("restaurants added on session storage:", state.restaurants)
      

      sessionStorage.setItem("restaurants", JSON.stringify(state.restaurants))
      
   },

   CREATE_RESTAURANT_RATINGS(state,payload){

     let result = payload[0]

     let ratings = []

     for(let i = 0; i<result.length; i++){
      ratings.push({
        idRestaurant:result[i].idRestaurante,
        idUser:result[i].idCliente,
        rating:result[i].rating,
        comment:result[i].Comentário,
        dateTime:result[i].data_hora,
      })
     }

     state.restaurantRatings = ratings
   },

   CREATE_USERDETAILS(state,payload){

     let result = payload[0]

    state.userDetails.name = result.username
    state.userDetails.email = result.email
    state.userDetails.contact = result.contacto
    state.userDetails.avatar = result.avatar
    state.userDetails.diet = result.dieta
    state.userDetails.userType = result.userType
    state.userDetails.idRestaurant = result.idRestaurante
     
   },

   CREATE_MENU(state,payload){

    let result = payload[0]

    state.menu.idPlate = result.idPrato
    state.menu.name = result.nome
    state.menu.description = result.descrição
    state.menu.price = result.preço
    state.menu.foto = result.foto


   },

   CREATE_RESTAURANT_TABLES(state,payload){

     let result = payload

     let tables = []
     
     for(let i = 0; i<result.length; i++){
      tables.push({
        idTable: result[i].idMesa,
        name: result[i].nome,
        size: result[i].tamanho,
        description: result[i].descrição,
        smokers: result[i].fumadores,
        outside: result[i].esplanada,
        idRestaurant: result[i].idRestaurante
      })
     }


     state.restaurantTables = tables
  
     
   },

   CREATE_RESTAURANT_RESERVATIONS(state,payload){

    let result = payload[0]

    let reservations = []

    for(let i = 0; i<result.length;i++){
      reservations.push({
        idReservation: result[i].idReserva,
        idUser: result[i].idCliente,
        idTable: result[i].idMesa,
        dateTime: result[i].horario,
        name: result[i].nome,
        n_people: result[i].n_pessoas,
        confirmed: result[i].confirmado
      })
    }
    state.restaurantReservations = reservations
   },

   CREATE_RESTAURANT_DISHES(state,payload){

    
     
    let result = payload

    console.log("GETTING RESTAURANT DISHES: ", result)

    let dishes = []

    for(let i = 0; i<result.length;i++){
      dishes.push({
        idDish: result[i].idPrato,
        name: result[i].nome,
        description: result[i].descrição,
        price: result[i].preço,
        foto: result[i].foto,
        recommended:result[i].recomendado,
        idRestaurant: result[i].idRestaurante,
      })
    }
    state.restaurantDishes = dishes
   },

   CREATE_LAST_DISH_ID(state,payload){
    let result = payload.idPrato
    console.log("Create last dish id commit, result value: ", result)
     state.lastDishId = result
   },

   CREATE_USER_NOTIFICATIONS(state,payload){

     let result = payload
    console.log("Creating user notifications result: ", result)
     let notifications = []
     

     for(let i = 0; i < result.length;i++){
       notifications.push({
         idNotification:result[i].idNotificações,
         idUser:result[i].idUser,
         idRestaurant:result[i].idRestaurante,
         status:result[i].status,
         message:result[i].mensagem,
         dateTime:result[i].data,
         read:result[i].lido,
       })
     }

     state.userNotifications = notifications
   },

   CREATE_RATINGS(state,payload){
    let result = payload

    console.log("ratings result: ", result)
    let ratings = []

     for(let i = 0; i < result.length; i++){
      ratings.push({
        idRestaurant:result[i].idRestaurante,
        idUser:result[i].idCliente,
        value:result[i].rating
      })
     }

     state.ratings = ratings

     sessionStorage.setItem("ratings", JSON.stringify(state.ratings))
   }

   

   


    //ADD_USER_RESTAURANT(state,payload){

    //}
  },
  actions: {

    //+++++++++++++++++++++++++++++++++++++++++++++++++SIGN UP USER+++++++++++++++++++++++++++++++++++++++
    async signUpUser({commit},payload){

      const params = new URLSearchParams();

      if(payload.idRestaurant != ''){
        console.log("Sending idRestaurant as: ", payload.idRestaurant)
        params.append('idRestaurant', payload.idRestaurant)
      }
      params.append('username', payload.username);
      params.append('password',payload.password);
      params.append('email', payload.email);
      params.append('contact',payload.contact);
     // params.append('zipCode',payload.zipCode);
      params.append('userType',payload.userType);

      
      

      await axios.post("https://mealset.herokuapp.com/signUp",params).then((response)=>{


      
      console.log(response.status)  
      console.log(response.data.success)


     
      
      commit("CREATE_FEEDBACK",response.status)
      commit("LAST_USER_ID", response.data.success)
   
      }).catch((error)=>{
        console.log("Error in signup:", error.response)
        console.log("Error in status:", error.response.status)

        commit("CREATE_FEEDBACK",error.response.status)
      
      })
      
    },
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ UPLOAD AVATAR ++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    async uploadAvatar({commit},payload){
      const avatar = payload.avatar
      const idUser = payload.idUser
      console.log("AVATAR: " + avatar)
      var bodyFormData = new FormData()

      bodyFormData.append('avatar',avatar)

     await axios({
      method:'put',
      url:`https://mealset.herokuapp.com/users/${idUser}/upload`,
      data:bodyFormData,
      headers:{'Content-Type': 'multipart/form-data'
      }}).then((response)=>{

        commit("CREATE_FEEDBACK",response.status)
        console.log("Feedback of upload avatar:" ,response.status)

      }).catch((error)=>{
        console.log("Error in avatar:", error.response)
        commit("CREATE_FEEDBACK",error.response.status)
      })
    },
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++LOGIN +++++++++++++++++++++++++++++++++++++++++++++++++++
    async login({commit},payload){

      const params = new URLSearchParams();

      params.append('username', payload.username);
      params.append('password',payload.password);

      await axios.post("https://mealset.herokuapp.com/login",params).then((response)=>{

      console.log("Response status: ",response.status)
      console.log("Response auth status:",response.data.auth)
      console.log("Response auth data:",response.data.token)
      console.log("Usertype", response.data.userType)
      console.log("response: ", response.status)
      commit("CREATE_FEEDBACK", response.status)

      commit("CREATE_LOGGED_USER", response.data)

      }).catch((error)=>{

        console.log("error in logging", error)
      
        commit("CREATE_FEEDBACK",error.response.status)
      })

    },

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++USER UPDATE ++++++++++++++++++++++++++++++++++++++++++++++

    async userUpdate({commit},payload){

      const params = new URLSearchParams();

      params.append('contact', payload.contact)
      params.append('diet', payload.diet)

      await axios.put(`https://mealset.herokuapp.com/users/${payload.idUser}`, params).then((response)=>{

        commit("CREATE_FEEDBACK",response.status)

        commit("UPDATE_LOGGED_USER", response.data.success)



      }).catch((error)=>{
        console.log("Error update user: ",error.response )
        commit("CREATE_FEEDBACK",error.response.status)

      })
    },

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++NEW PASSWORD +++++++++++++++++++++++++++++++++++++++++++++++++++++++
    async newPassword({commit},payload){

      const params = new URLSearchParams();

      params.append('password', payload.password);
      params.append('newPassword', payload.newPassword);

      
      await axios.put(`https://mealset.herokuapp.com/users/${payload.idUser}/newPassword`,params).then((response)=>{

        console.log("Response:" ,response.status)
        console.log("Data:", response.data.success)

        commit("CREATE_FEEDBACK", response.status)


      }).catch((error)=>{
        console.log("error in new password", error.response)
        commit("CREATE_FEEDBACK",error.response.status)
      })
    },

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++ADD RESTAURANT +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    async addRestaurant({commit},payload){
      const params = new URLSearchParams();

      params.append('name', payload.name);
      params.append('description', payload.description);
      params.append('parking', payload.parking);
      params.append('address', payload.address);
      params.append('zipCode', payload.zipCode);
  

      await axios.post("https://mealset.herokuapp.com/restaurants",params).then((response)=>{

        console.log("Response:" ,response.status)
        console.log("Data:", response.data.success)

        commit("CREATE_FEEDBACK", response.status)

        commit("Last_RESTAURANT_ID", response.data.success)


      }).catch((error)=>{
        console.log("error in restaurant add", error.response)
        commit("CREATE_FEEDBACK", error.response.status)
      })

    },

    //++++++++++++++++++++++++++++++++++ UPLOAD RESTAURANT IMAGES ++++++++++++++++++++++++++++++++++++++++++++++++++

    async uploadRestaurantImages({commit},payload){

      const coverImg = payload.coverImg
      const logoImg = payload.logoImg

      const idRestaurant = payload.lastRestaurantId

      var bodyFormData = new FormData()

      bodyFormData.append('cover',coverImg)
      bodyFormData.append('logo',logoImg)

     await axios({
      method:'put',
      url:`https://mealset.herokuapp.com/restaurants/${idRestaurant}/upload`,
      data:bodyFormData,
      headers:{'Content-Type': 'multipart/form-data'
      }}).then((response)=>{

        commit("CREATE_FEEDBACK",response.status)

      }).catch((error)=>{
        console.log("Error in restaurant images:", error.response)
        commit("CREATE_FEEDBACK", error.response.status)

      })
    },

    // ++++++++++++++++++++++++++++++++++++++++++++++++GET RESTAURANTS++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    async getRestaurants({commit}){
      await axios({
        method:'get',
        url:'https://mealset.herokuapp.com/restaurants'
      }).then((response)=>{

        console.log("Get restaurants result: ", response.data.success)
        commit("CREATE_RESTAURANTS",response.data.success)

        commit("CREATE_FEEDBACK",response.status)

      }).catch((error)=>{

        console.log("Error in getting restaurants:", error)
        commit("CREATE_FEEDBACK", error.response.status)

      })
    },

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET RESTAURANT RATINGS ++++++++++++++++++++++++++++++++++++++++++++++++++
    async getRestaurantRatings({commit}, payload){

      const idRestaurant = payload.idRestaurant

      await axios({
        method:'get',
        url:`https://mealset.herokuapp.com/restaurants/${idRestaurant}/ratings`
      }).then((response)=>{

        console.log("Get Ratings result: ", response.data.success)
        commit("CREATE_RESTAURANT_RATINGS",response.data.success)
        commit("CREATE_FEEDBACK",response.status)

      }).catch((error)=>{

        console.log("Error in getting restaurants:", error)
        commit("CREATE_FEEDBACK", error.response.status)

      })
    },

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++GET A USER ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    async getUser({commit},payload){

      const idUser = payload.idUser

      await axios({

        method:'get',
        url:`https://mealset.herokuapp.com/users/${idUser}`

      }).then((response)=>{

        console.log("Get a User result:", response.data.success)
        commit("CREATE_USERDETAILS",response.data.success)

      }).catch((error)=>{

        console.log("Error in getting a user:", error)
        commit("CREATE_FEEDBACK", error.response.status)

      })
    },

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ADD RATING++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    async add_rating({commit},payload){

      const rating = payload.rating
      const comment = payload.comment
      const dateTime = payload.dateTime
      const idUser = payload.idUser
      const idRestaurant = payload.idRestaurant
      

      const params = new URLSearchParams();

      params.append('rating',rating)
      params.append('comment',comment)
      params.append('dateTime',dateTime)
      


      await axios.post(`https://mealset.herokuapp.com/restaurants/${idRestaurant}/users/${idUser}/ratings`,params).then((response)=>{

        //console.log("Get a User result:", response.data.success)
        commit("CREATE_FEEDBACK",response.status)

      }).catch((error)=>{
        
        commit("CREATE_FEEDBACK",error.response.status)

        console.log("Error in getting a comment:", error)

      })
    },
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++Get Dishes++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    async getDishes({commit},payload){
      await axios.get(`https://mealset.herokuapp.com/restaurants/${payload.idRestaurant}/plates`).then((response)=>{
          //console.log("Get a User result:", response.data.success)
          commit("CREATE_FEEDBACK",response.status)

          commit("CREATE_MENU",response.data.success)
      }).catch((error)=>{

        commit("CREATE_FEEDBACK",error.response.status)

        console.log("Error in getting dishes:", error)
      })
    },

  //+++++++++++++++++++++++++++++++++++++++++++++++++Get Restaurant Tables+++++++++++++++++++++++++++++++++++++++++++++

  async getRestaurantTables({commit},payload){


    
    await axios.get(`https://mealset.herokuapp.com/restaurants/${payload.idRestaurant}/tables`).then((response)=>{
      
    commit("CREATE_FEEDBACK",response.status)

    commit("CREATE_RESTAURANT_TABLES",response.data.success)

    }).catch((error)=>{
      
    commit("CREATE_FEEDBACK",error.response.status)

    console.log("Error in getting restaurant tables:", error)

    })
  },

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Add Reservation ++++++++++++++++++++++++++++++++++++++++++++++

  async add_reservation({commit},payload){

    const idTable = payload.idTable
    const idUser = payload.idUser
    const time = payload.dateTime 
    const name = payload.name
    const n_people = payload.n_people


    const params = new URLSearchParams();

    params.append('time',time)
    params.append('name',name)
    params.append('n_people',n_people)
      



    await axios.post(`https://mealset.herokuapp.com/tables/${idTable}/users/${idUser}/reservations`, params).then((response)=>{
      
    commit("CREATE_FEEDBACK",response.status)

      
    }).catch((error)=>{

    commit("CREATE_FEEDBACK",error.response.status)

    console.log("Error in getting a user:", error)
    })
  },

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++get restaurant reservations +++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  async get_restaurant_reservations({commit},payload){
      const idRestaurant = payload.idRestaurant

      await axios.get(`https://mealset.herokuapp.com/restaurants/${idRestaurant}/reservations`).then((response)=>{
        
        commit("CREATE_FEEDBACK",response.status)
        commit("CREATE_RESTAURANT_RESERVATIONS",response.data.success)

      }).catch((error)=>{
        commit("CREATE_FEEDBACK",error.response.status)

        console.log("Error in getting a user:", error)
      })
  },

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++get restaurant dishes/////////////////////////////////////////////
  
  async get_restaurant_dishes({commit},payload){

    const idRestaurant = payload.idRestaurant
    console.log("Before the request of get_restaurant_dishes: ", payload.idRestaurant)
    await axios.get(`https://mealset.herokuapp.com/restaurants/${idRestaurant}/plates`).then((response)=>{
          
      commit("CREATE_FEEDBACK",response.status)
      commit("CREATE_RESTAURANT_DISHES",response.data.success)

    }).catch((error)=>{
      commit("CREATE_FEEDBACK",error.response.status)

      console.log("Error in getting a user:", error)
    })
  },

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Remove dish +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  async remove_dish({commit},payload){
    await axios.delete(`https://mealset.herokuapp.com/plates/${payload.idDish}`).then((response)=>{
          
      commit("CREATE_FEEDBACK",response.status)
 

    }).catch((error)=>{
      commit("CREATE_FEEDBACK",error.response.status)

      console.log("Error in getting a user:", error)
    })
  },
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Remove Restaurant Reservations++++++++++++++++++++++++++++++++++++++++++++++
  async delete_restaurant_reservations({commit},payload){
    
    await axios.delete(`https://mealset.herokuapp.com/restaurants/${payload.idRestaurant}/reservations`).then((response)=>{
          
      commit("CREATE_FEEDBACK",response.status)


    }).catch((error)=>{
      commit("CREATE_FEEDBACK",error.response.status)

      console.log("Error in getting a user:", error)
    })
  },

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ADD DISH+++++++++++++++++++++++++++++++++++++++++
  async add_dish({commit},payload){

    const params = new URLSearchParams();

    params.append('name',payload.name)
    params.append('description',payload.description)
    params.append('price',payload.price)
    params.append('recommended', payload.recommended)

    await axios.post(`https://mealset.herokuapp.com/restaurants/${payload.idRestaurant}/plates`, params).then((response)=>{
          
      commit("CREATE_FEEDBACK",response.status)
      console.log("last dish id: ", response.data.success)
      commit("CREATE_LAST_DISH_ID",response.data.success)

    }).catch((error)=>{
      commit("CREATE_FEEDBACK",error.response.status)

      console.log("Error in getting a user:", error)
    })
  },

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++UPLOAD DISH FOTO++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async upload_dish_foto({commit},payload){

    var bodyFormData = new FormData()


      bodyFormData.append('imgDish',payload.foto)

     await axios({
      method:'put',
      url:`https://mealset.herokuapp.com/plates/${payload.idDish}/upload`,
      data:bodyFormData,
      headers:{'Content-Type': 'multipart/form-data'
      }}).then((response)=>{


        commit("CREATE_FEEDBACK",response.status)
        console.log("Feedback of upload dish image:" ,response.status)

      }).catch((error)=>{
        console.log("Error in avatar:", error.response)
        commit("CREATE_FEEDBACK", error.response.status)
      })
  },
  
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Update Restaurant Cover++++++++++++++++++++++++++++++++++
  async updateRestaurantCover({commit},payload){


      const coverImg = payload.coverImg
 
      const idRestaurant = payload.lastRestaurantId

      var bodyFormData = new FormData()

      bodyFormData.append('cover',coverImg)
      

     await axios({
      method:'put',
      url:`https://mealset.herokuapp.com/restaurants/${idRestaurant}/uploadCover`,
      data:bodyFormData,
      headers:{'Content-Type': 'multipart/form-data'
      }}).then((response)=>{

        commit("CREATE_FEEDBACK",response.status)

      }).catch((error)=>{
        console.log("Error in restaurant images:", error.response)
        commit("CREATE_FEEDBACK", error.response.status)

      })
  },
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Update Restaurant Logo++++++++++++++++++++++++++++++++++++++++++++++
  async updateRestaurantLogo({commit},payload){


    const logo = payload.logo

    const idRestaurant = payload.lastRestaurantId

    var bodyFormData = new FormData()

    bodyFormData.append('logo',logo)
    

   await axios({
    method:'put',
    url:`https://mealset.herokuapp.com/restaurants/${idRestaurant}/uploadCover`,
    data:bodyFormData,
    headers:{'Content-Type': 'multipart/form-data'
    }}).then((response)=>{

      commit("CREATE_FEEDBACK",response.status)

    }).catch((error)=>{
      console.log("Error in restaurant images:", error.response)
      commit("CREATE_FEEDBACK", error.response.status)

    })
  },
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Confirm reservation ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async confirm_reservation({commit},payload){

    const params = new URLSearchParams();

    params.append('status',payload.status)

      



    await axios.put(`https://mealset.herokuapp.com/reservations/${payload.id}/confirm`, params).then((response)=>{
      
    commit("CREATE_FEEDBACK",response.status)

      
    }).catch((error)=>{

   
    commit("CREATE_FEEDBACK", error.response.status)
    console.log("Error in getting a user:", error)
    })
  },
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Add notification+++++++++++++++++++++++++++++++++++++++++++++++
  async add_notification({commit},payload){
    const params = new URLSearchParams();


    params.append('status',payload.status)
    params.append('message',payload.message)
    params.append('dateTime',payload.dateTime)

      



    await axios.post(`https://mealset.herokuapp.com/restaurants/${payload.idRestaurant}/users/${payload.idUser}/notifications`, params).then((response)=>{
      
    commit("CREATE_FEEDBACK",response.status)

      
    }).catch((error)=>{

    commit("CREATE_FEEDBACK",error.response)
    commit("CREATE_FEEDBACK", error.response.status)
    console.log("Error in getting notifications:", error)
    })
  },

  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Get user Notifications+++++++++++++++++++++++++++++++++++++++++++++++++++++

  async get_user_notifications({commit},payload){

     await axios.get(`https://mealset.herokuapp.com/users/${payload.idUser}/notifications`).then((response)=>{
      
    commit("CREATE_FEEDBACK",response.status)

    commit("CREATE_USER_NOTIFICATIONS", response.data.success)
      
    }).catch((error)=>{


    commit("CREATE_FEEDBACK", error.response.status)
    console.log("Error in getting a user:", error)
    })
  },

  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++Get Ratings+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  async get_ratings({commit}){
    await axios.get(`https://mealset.herokuapp.com/ratings`).then((response)=>{
      
      commit("CREATE_FEEDBACK",response.status)
  
      commit("CREATE_RATINGS", response.data.success)
        
      }).catch((error)=>{
  
     
      commit("CREATE_FEEDBACK", error.response.status)
      console.log("Error in getting ratings:", error)
      })
  }
},




  getters:{



    checkUserType:state => state.loggedUser.userType,

    feedbackChecker:state=> state.feedback,

    getLastUserId:state=>state.lastUserId,

    getLastRestaurantId:state=>state.lastRestaurantId,

    getRestaurants:state=>state.restaurants,

    getRestaurantRatings:state=>state.restaurantRatings,

    getUserDetails:state=>state.userDetails,
   
    getRestaurantDishes:state=>state.restaurantDishes,

    getRestaurantTables:state=>state.restaurantTables,

    getRestaurantReservations:state=>state.restaurantReservations,

    getLastDishId:state=>state.lastDishId,

    getUserNotifications:state=>state.userNotifications,

    getRatings:state=>state.ratings
  },

  modules: {}
});
