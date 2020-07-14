import Vue from "vue"
import Vuex from "vuex"
import * as fb from '../firebase'
import router from '../router'


Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userProfile: {}
	},
	mutations: {
		setUserProfile(state, val) {
			state.userProfile = val
		}
	},
	actions: {
		async login({dispatch}, form){
			const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

			dispatch('fetchUserProfile', user)
		},
		async fetchUserProfile({commit}, user){
			const userProfile = await fb.usersCollection.doc(user.uid).get()

			commit('setUserProfile', userProfile.data())

			router.push('/')
		},
		async signup({dispatch}, form){
			console.log('signup')
			const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

			await fb.usersCollection.doc(user.uid).set({name: form.name, title: form.title})

			dispatch('fetchUserProfile', user)
		},
		async logout({commit}){
			await fb.auth.signOut()
			commit("setUserProfile",{})
			router.push("/login")
		}
	}

})


export default store
