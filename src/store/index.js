import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedPrice : 0,
    selectedDate : '',
    selectedFormattedDate : '',
    selectedDays : 0,
    sellerNumber : 0,
    buyerNumber : 0
  },

  getters: {
    getSelectedPrice (state) {
      return state.selectedPrice
    },
    getSelectedDate (state) {
      return state.selectedDate
    },
    getSelectedFormattedDate (state) {
      return state.selectedFormattedDate
    },
    getSelectedDays (state) {
      return state.selectedDays
    },
    getSellerNumber (state) {
      return state.sellerNumber
    },
    getBuyerNumber (state) {
      return state.buyerNumber
    }
  },

  mutations: {
    setSelectedPrice (state, payload) {
      state.selectedPrice = payload
    },
    setSelectedDate (state, payload) {
      state.selectedDate = payload
    },
    setSelectedFormattedDate (state, payload) {
      state.selectedFormattedDate = payload
    },
    setSelectedDays (state, payload) {
      state.selectedDays = payload
    },
    setSellerNumber (state, payload) {
      state.sellerNumber = payload
    },
    setBuyerNumber (state, payload) {
      state.buyerNumber = payload
    }
  },

  actions: {
  },

  modules: {
  }
})
