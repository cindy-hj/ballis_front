import { createStore } from 'vuex'

export default createStore({
  state: {
    selectedPrice : 0,
    selectedDate : '',
    selectedFormattedDate : '',
    selectedDays : 0,
    selectedItem : ''
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
    getSelectedItem (state) {
      return state.selectedItem
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
    setSelectedItem (state, payload) {
      state.selectedItem = payload
    }
  },

  actions: {
  },

  modules: {
  }
})
