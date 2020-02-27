import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state: {
		toa: {
			param1: 'client_credentials',
			param2: 'HaVMvaZVFR9c5U8OXbM9PR8sYnez8z4E2yuL0M49',
			param3: '9RsVoicNmNP3lXvy8CS0FNRF2aTDBzScwrRSnluaeK6D05xYGL2bS4sYlTUVhBjKPjpIvKquHWiMIp8ioffG4QmKY92EkD2M8br0GLZoBWWRHf0gByjwV1Jb4UXvQsJO'
		},
		poo: {
			object1: '',
			object2: 0
		},
		layout: {
			navPos: 'left', //top, bottom, left, right, false
			toolbar: 'top', //top, bottom, false
			footer: true, //above, below, false
			boxed: false, //true, false
			roundedCorners: false, //true, false
			viewAnimation: 'fade-top' // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
		},
		splashScreen: true,
		logged: false
	},
	mutations: {
		setLayout(state, payload) {
			if(payload && payload.navPos !== undefined)
				state.layout.navPos = payload.navPos

			if(payload && payload.toolbar !== undefined)
				state.layout.toolbar = payload.toolbar
				
			if(payload && payload.footer !== undefined)
				state.layout.footer = payload.footer
		
			if(payload && payload.boxed !== undefined)
				state.layout.boxed = payload.boxed

			if(payload && payload.roundedCorners !== undefined)
				state.layout.roundedCorners = payload.roundedCorners

			if(payload && payload.viewAnimation !== undefined)
				state.layout.viewAnimation = payload.viewAnimation
		},
		setLogin(state, payload) {
			state.logged = true
		},
		setLogout(state, payload) {
			state.layout.navPos = null
			state.layout.toolbar = null
			state.logged = false
		},
		setSplashScreen(state, payload) {
			state.splashScreen = payload
		},
		setGlobalData(state, payload){
			state.poo = payload
		}
	},
	actions: {

	},
	getters: {
		layout(state, getters) {
			return state.layout
		},
		navPos(state, getters) {
			return state.layout.navPos
		},
		toolbar(state, getters) {
			return state.layout.toolbar
		},
		footer(state, getters) {
			return state.layout.footer
		},
		boxed(state, getters) {
			return state.layout.boxed
		},
		roundedCorners(state, getters) {
			return state.layout.roundedCorners
		},
		viewAnimation(state, getters) {
			return state.layout.viewAnimation
		},
		isLogged(state, getters) {
			return state.logged
		},
		splashScreen(state, getters) {
			return state.splashScreen
		}
	},
	plugins: [createPersistedState({paths: ['layout']})],
	strict: debug
})
