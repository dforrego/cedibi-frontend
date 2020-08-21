import Vue from 'vue'
import Router from 'vue-router'
import session from 'vue-session'

//pages
import DashBusisness from '../views/pages/menu/home/DashBusisness.vue'
import DashCedi from '../views/pages/menu/home/DashCedi.vue'
import Base from '../views/pages/menu/home/BasePage.vue'
import Board1 from '../views/pages/menu/Board1.vue'
import Profile from '../views/pages/menu/Profile.vue'
import NotFound from '../views/pages/NotFound.vue'
import LogInApp from '../views/pages/auth/Login.vue'
import layouts from '../layout'
import store from '../store'

Vue.use(Router)

const router = new Router({
	mode: 'history',
	//base: '/login',
	routes: [
		{
			path: '/',
			name: 'login',
			component: LogInApp,
			meta: {
				layout: layouts.contenOnly
			}
		},
		{
			path: '/cedi', 
			redirect: 'cedi/dashboard',
			component: Base,
			name: 'dash-cedi',
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/cedi/dashboard',
			component: DashCedi,
			name: 'main-cedi',
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/cedi/board-1',
			component: Board1,
			name: 'board1-cedi',
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},

		{
			path: '/client', 
			redirect: 'client/dashboard',
			component: Base,
			name: 'dash-client',
            children: [ 
				{ 
					path: '/client/dashboard', 
					component: DashBusisness
				}, 
                { 
					path: '/client/board-1', 
					component: Board1
				},
			],
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{
			path: '/profile',
			name: 'profile',
			component: Profile,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				tags: ['pages']
			}
		},
		{ 
			path: '/logout',
			beforeEnter (to, from, next) {
				auth.logout()
				next({path:'/'})
			}
		},
		{
			path: '*',
			name: 'not-found',
			component: NotFound,
			meta: {
				layout: layouts.contenOnly
			}
		}
	]
})


const l = {
	contenOnly(){
		store.commit('setLayout', layouts.contenOnly)
	},
	navLeft(){
		store.commit('setLayout', layouts.navLeft)
	},
	navRight(){
		store.commit('setLayout', layouts.navRight)
	},
	navTop(){
		store.commit('setLayout', layouts.navTop)
	},
	navBottom(){
		store.commit('setLayout', layouts.navBottom)
	},
	set(layout){
		store.commit('setLayout', layout)
	}
}

const auth = {
	loggedIn() {
		return Vue.prototype.$session.exists()
	},
	logout() {
		store.commit('setLogout')
		Vue.prototype.$session.destroy()
	}
}

router.beforeEach((to, from, next) => {
	let authrequired = to && to.meta && to.meta.auth 
	if(authrequired) {
		if(auth.loggedIn()) {
			var rol = Vue.prototype.$session.get('profile').profile.rol.code
			if(to.name === 'login') {
				if(Vue.prototype.$session.get('profile')) {
					if (rol == 10){
						window.location.href = '/client'
					} else {
						window.location.href = '/cedi'
					}
				} else {
					window.location.href = '/'
				}
				return false
			} else if  (to.name.startsWith('client') && rol != 10) {
				window.location.href = '/cedi'
				return false
			} else if (to.name.startsWith('cedi') && rol != 20) {
				window.location.href = '/client'
				return false
			}
			next()
		} else {
			if(to.name !== 'login'){
				window.location.href = '/'
				return false
			}
			next()
		}
	} else {
		next()
	}

	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}	
})

router.afterEach((to, from) => {
	setTimeout(()=>{
		store.commit('setSplashScreen', false)
	}, 900)
})

export default router