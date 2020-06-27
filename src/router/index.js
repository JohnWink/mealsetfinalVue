import Vue from "vue";
import VueRouter from "vue-router";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "guestPage",
    component:()=>
      import("../views/GuestPage.vue")
    
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path:"/landingPage",
    name:"landingPage",
    component:()=>
    import("../views/LandingPage.vue")
  },

  {
    path:"/restaurant/:id",
    name: "restaurant",
    component:() =>
      import("../views/RestaurantPage.vue")
  },
  {
    path:"/userRestaurantPage",
    name:"userRestaurantPage",
    component:()=>
      import("../views/UserRestaurantPage.vue")
  },

  {
    path:"/notificationPage",
    name:"notificationPage",
    component:()=>
      import("../views/NotificationPage.vue")
  },

];

const router = new VueRouter({
  routes
});

export default router;
