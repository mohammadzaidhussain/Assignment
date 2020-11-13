<template>
   <div class="container">
       <h1>Welcome to warehouses</h1>
       <section class="heading" v-on:change="filterCity">
           <div class="filter-div">
               <label style="padding-right: 10px;">filter :</label>
               <select name="filter" id="fltr" class="slct">
                   <option value="city">city</option>
                   <option value="cluster">cluster</option>
                   <option value="space available">space available</option>
               </select>
           </div>
       </section>
       <section class="warehouse-list">
           <div class="warehouses">       <!-- v-for="warehouse in warehouses" :key="warehouse.id" -->
               <Warehouse />
           </div>
       </section>
   </div>
</template>

<script>
import Warehouse from "../components/Warehouse"
import store from "../store/index"
import sortBy from '../util/utils'


export default {
    name: "Homepage",
    data() {
        return {
           // warehouses: []
        }
    },
    components: {
        Warehouse
    },
    methods: {
        filterCity() {
            let filter = document.getElementById("fltr").value
            store.state.warehouseList = sortBy(store.state.warehouseList, `${filter}`)
        }
    },
    beforeCreate () {
        store.dispatch("getWarehouseList")
    },
    
}
</script>

<style scoped>

h1 {
    color: white;
    margin: 1rem 0;
}

.heading {
    display: block;
    padding: 4rem;
}

.filter-div {
    color: white;
    float: right;
    margin-right: 8rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.slct {
    background: white;
    color: black;
    font-size: 1rem;
    border-radius: 5px;
}

.slct option {
    background: white;
}

.warehouse-list{
    margin: 4rem 0;
}

</style>