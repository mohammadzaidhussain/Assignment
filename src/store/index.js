import Vue from "vue";
import Vuex from "vuex";
import { db } from "../database/db";
import sortBy from "../util/utils";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    warehouse: null,
    warehouseList: [],
    loaded: false
  },
  getters: {
    // warehouseName: state => {
    //   return state.warehouse.name;
    // },
    warehouseList: state => {
      return state.warehouseList;
    }
  },
  mutations: {
    getWareHouse(state, name) {
      return new Promise((resolve, reject) => {
        state.warehouse = db.filter((e) => e.name == name)
        if(state.warehouse != null)
        resolve(state.warehouse)
        else
        reject(null)
      })
    },
    getWarehouseList(state) {
      if(state.loaded == false) {
        return new Promise((resolve,reject) => {
          db.forEach((elem) => {
            state.warehouseList.push(elem)
          })
          if(state.warehouseList.length != 0) {
            state.loaded = true
            state.warehouseList = sortBy(state.warehouseList, "city")
            resolve(state.warehouseList)
          }
          else
          reject(null)
        })
      }
    }
  },
  actions: {
    getWareHouse(context, name) {
      context.commit("getWareHouse", name)
    },
    getWarehouseList(context) {
      context.commit("getWarehouseList")
    }
  },
  modules: {}
});
