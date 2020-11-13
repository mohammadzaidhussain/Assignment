import Vue from "vue";
import Router from "vue-router";
// import Home from "../views/Home.vue";
import Homepage from "../components/Homepage"
import WarehouseDetails from "../views/WarehouseDetails"

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Homepage",
      component: Homepage
    },
    {
      path: "/details/:id",
      name: "warehouseDetails",
      component: WarehouseDetails
    },
    {
      path: "/about",
      name: "About",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/About.vue")
    }
  ]
});


export default router;
