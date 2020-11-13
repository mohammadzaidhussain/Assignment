<template>
 <div>
  <div class="container" v-for="(warehouse, index) in warehouses" :key="index">
      <div class="card">
          <div class="content">
              <a style="cursor: pointer; font-size: 1.2rem;"> {{ warehouse.name }} </a>
              <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia maxime ab dignissimos expedita quae laboriosam ullam culpa eveniet quos nesciunt et cum enim, modi, earum itaque natus quasi a eum.</p>
              <span style="float: right; display: flex;color: white;">city: {{ warehouse.city }}</span> 
              <span style="display: flex;"><button v-on:click="openWareHouseDetails(warehouse.id)">check</button></span>
          </div>
      </div>
  </div>
 </div> 
</template>

<script>
import store from "../store/index"
import sortBy from '../util/utils'


export default {
    name: "Warehouse",
    data() {
        return {
            warehouses: []
        }
    },
    methods: {
        openWareHouseDetails(id) {
            this.$router.push(`/details/${id}`)
        },
    },
    mounted () {
        store.state.warehouseList = sortBy(store.state.warehouseList, "city")
        this.warehouses = store.getters.warehouseList
        console.log(this.warehouses)
    },
}
</script>

<style scoped>

a, p{
    color: white;
    text-align: left;
    padding: 5px;
    display: flex;
}

.container {
    border: 2px solid green;
    border-radius: 5px;
    margin: 0.5rem 4rem;
    width: 72%;
}

.card {
    padding: 10px;
}



</style>