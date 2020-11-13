<template>
  <div id="app">
    <header>
      <nav>
       <ul class="nav-links">
         <li><router-link to="/">Home</router-link></li>
         <li><router-link to="/about">warehouse</router-link></li>
         <li><router-link to="/about">About</router-link></li>
       </ul>
      </nav>
      <div class="search-bar-div">
        <input type="text" name="search-bar" id="search" class="srch" placeholder="search here..." v-on:input="search($event)" v-on:focusin="activeSuggestion">
        <div class="list-item-div">
          <ul class="list" id="sugg">
          </ul>
        </div>
      </div>
      <a href="#" class="contact"><button>Contact</button></a>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
  name: "App",
  methods: {
    search(event) {
      let value = event.target.value
      let suggestion = []
      if(value && value != '') {
        suggestion = this.warehouses.filter((data) => {
          return data.name.toLocaleLowerCase().startsWith(value.toLocaleLowerCase());
        })
        suggestion = suggestion.map((data) => {
          return data = `<li><a href=#/details/${data.id}>` + data.name + `</a></li>`
        })
        // document.getElementById('sugg').style.display = 'inherit'
        //console.log(suggestion)
      }
      else {
        document.getElementById('sugg').style.display = 'none'
      }
      this.showSuggestion(suggestion)
    },
    activeSuggestion() {
      document.getElementById('sugg').style.display = 'inherit'
    },
    showSuggestion(list) {
      let data
      if(!list.length) {
        //
      } else {
        data = list.join('')
      }
      document.getElementById('sugg').innerHTML  = data
    }  
  },  
  computed: {
    ...mapGetters({
      warehouses: 'warehouseList'
    })
  },
  updated () {
    this.$root.$emit('url', this.$route.params.id)
  }, 
  

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
}


* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  background-color: #2c3e50;
}


li, a, button {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: bisque;
  text-decoration: none;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10%;
  height: 100px;
  max-height: 100px;
}


.nav-links {
  list-style: none;
}

.nav-links li {
  display: inline-block;
  padding: 0px 20px;
}

.nav-links li a {
  font-size: 1.2rem;
  transition: all 0.3s ease 0s;
}

.nav-links li a:hover {
  color: rgb(104, 104, 245);
  font-size: 1.4rem;
}

button {
  padding: 9px 25px;
  background-color: rgb(88, 122, 235);
  color: white;
  border: none;
  outline: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease 0s;
}

button:hover {
  background-color: rgb(7, 70, 165);
}

.srch{
  color: black;
  border-radius: 5px;
  width: 250px;
  height: 28px;
  padding: 5px;
  background: white;
  border: none;
  outline: none;
  font-size: 1rem;
  transition: 0.3s all ease;
}

.search-bar-div {
  background: white;
  border-radius: 5px;
  border: 4px solid green;
  height: auto;
  max-height: 200px;
  z-index: 2;
  overflow-y: scroll;
}

.list {
  margin-top: 5px;
  display: inherit;
}

.list li{
  background: white;
  color: black;
  list-style-type: none;
  padding: 2px 5px;
  text-align: left;
}

.list li:hover {
  color: white;
  background: rgb(77, 77, 83);
  cursor: pointer;
}

::-webkit-scrollbar {
    display: none;
}


.list-item-div{
  position: fixed;
  width: 250px;
}

.list-item-div a {
  display: flex;
  background-color: transparent;
  color:  black;

}

.list-item-div a:hover{
  color: white;
}

</style>
