import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	state: {
		toa: {
			param1: 'client_credentials',
			param2: 'KjAYWUESyWnV6ph1xN904zcYjTuWczX0LoFPFnUs',
			param3: 'qIcHqINiV1Lme568zP31iJjw2ZS5XxSUayxDeQJaRUKexzqNDpZKQZufpX1ScxWhzS22FZlstAy4koosbjVmQzXJnvd3rK70FhrHsNVhGfTtelDuQrtLI4ycX7xbROXK'
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
		getOauth: async function (context) {
			const formData = new FormData();
			formData.append('grant_type', context.state.toa.param1)
			formData.append('client_id', context.state.toa.param2)
			formData.append('client_secret', context.state.toa.param3)
			let response = await Vue.prototype.$oauth.post('token/', formData)
			if(response.data.access_token) { 
				context.commit('setLogin');
				context.commit('setGlobalData', {
					object1: response.data.access_token, 
					object2: response.data.expires_in
				})
			}
		}
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
