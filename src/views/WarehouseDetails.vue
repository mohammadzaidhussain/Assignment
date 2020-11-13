<template>
    <div>
        <div class="warehouse-details">
            <h3 v-if="warehouse != null">{{ warehouse.name }}</h3>
            <div class="content" v-if="warehouse != null">
                <pre>city:              {{ warehouse.city }}</pre><br>
                <pre>space available:   {{ warehouse.space_available }}</pre><br>
                <pre>type:              {{ warehouse.type }}</pre><br>
                <pre>cluster:           {{ warehouse.cluster }}</pre><br>
                <pre v-if="warehouse.is_registered">Registered:        Yes</pre><pre v-else>Registered:        No</pre><br>
                <pre v-if="warehouse.is_live">live:              Yes</pre><pre v-else>live:              No</pre><br><br>
                  <input type="text" name="city" id="city" placeholder="update city" v-on:keydown="update($event, key[0])"><br><br>
                  <input type="number" name="space" id="space" placeholder="update space" v-on:keydown="update($event, key[1])"><br><br>
                  <input type="text" name="type" id="type" placeholder="update type" v-on:keydown="update($event, key[2])"><br><br>
                  <input type="text" name="cluster" id="cluster" placeholder="update cluster" v-on:keydown="update($event, key[3])"><br><br>
                  registered: <select name="register" id="rgst" v-on:change="update($event, key[4])">
                                 <option value="">select</option>
                                 <option value="yes">Yes</option>
                                 <option value="no">No</option>
                              </select> <br><br>
                  live:  <select name="live" id="live" style="margin-left: 4rem;" v-on:change="update($event, key[5])">
                                 <option value="">select</option>
                                 <option value="yes">Yes</option>
                                 <option value="no">No</option>
                              </select> <br><br>            
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis reprehenderit voluptas cumque voluptatem. Est ipsam iste porro, minus iure quod provident earum nobis ab perspiciatis ducimus et molestias enim hic vel rem cumque quasi possimus tempore aut sint nihil omnis!</p>
            </div>
            <button>Book cluster</button>
        </div>
    </div>
</template>

<script>
import { db } from '../database/db'
import store from "../store/index"
import { mapState } from 'vuex'

    export default {
        name: "WarehouseDetails",
        data() {
            return {
                warehouse: null,
                key: ['city', 'space', 'type', 'cluster', 'register', 'live']
            }
        },
        beforeCreate () {
            if(store.state.loaded == false) {
                store.dispatch('getWarehouseList')
            }
        },
        computed: {
            ...mapState({
                warehouses: 'warehouseList'
            })
        },
        mounted () {
            this.$root.$on('url', (id) => {
                this.warehouse = this.warehouses.find((e) => e.id == id)
                document.getElementById('sugg').style.display = 'none'
            })
        },
        methods: {
            update(event, key) {
                if(event.key == 'Enter' && event.target.value != null && event.target.value != '') {
                    console.log("key => " + key + " value => " + event.target.value)
                    switch (key) {
                        case 'city':
                        {
                            db.find((elem) => elem.id == this.$route.params.id).city = event.target.value
                            event.target.value = ''
                            break
                        }
                        case 'space':
                        {
                            db.find((elem) => elem.id == this.$route.params.id).space_available = event.target.value
                            event.target.value = ''
                            break
                        }
                        case 'type':
                        {
                            db.find((elem) => elem.id == this.$route.params.id).type = event.target.value
                            event.target.value = ''
                            break
                        }
                        case 'cluster':
                        {
                            db.find((elem) => elem.id == this.$route.params.id).cluster = event.target.value
                            event.target.value = ''
                            break
                        }
                        
                        default:
                            break;
                    }
                    event.target.value = ''
                }
                else if(event.type == 'change') {
                    switch (key) {
                        case 'register':
                        {
                            if(event.target.value == 'yes') {
                                db.find((elem) => elem.id == this.$route.params.id).is_registered = true
                                event.target.value = ''
                            }
                            else if(event.target.value == 'no') {
                                db.find((elem) => elem.id == this.$route.params.id).is_registered = false
                                event.target.value = ''
                            }
                            break
                        }
                        case 'live':
                        {
                            if(event.target.value == 'yes') {
                                db.find((elem) => elem.id == this.$route.params.id).is_live = true
                                event.target.value = ''
                            }
                            else if(event.target.value == 'no') {
                                db.find((elem) => elem.id == this.$route.params.id).is_live = false
                                event.target.value = ''
                            }
                            break
                        }    
                    
                        default:
                            break;
                    }
                }
            }
        }
        
    }
</script>

<style scoped>

h3{ 
    color: white;
    font-size: 1.3rem;
}

pre {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
}

.content {
    text-align: left;
    color: white;
    margin: 2rem;
}

input {
    color: black;
    font-size: 1.2rem;
    background: white;
    padding: 5px;
    border-radius: 5px;
}

.warehouse-details {
    margin: 2rem 0;
}

select {
    margin: 0 1rem;
    color: black;
    background: white;
    font-size: 1.2rem;
    border-radius: 5px;
}

option {
    background: white;

}

</style>