import Vue from "vue"
import Vuex from "vuex"
import * as fb from '../firebase'
import router from '../router'


Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userProfile: {},
		posts: [],
	},
	mutations: {
		setUserProfile(state, val) {
			state.userProfile = val
		},
		setPosts(state, val) {
			state.posts = val;
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
			
			if(router.currentRoute.path === "/login"){
				router.push('/')
			}
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
		},
		async createPost({state, commit}, post) {
			await fb.postsCollection.add({
				createdOn: new Date(),
				content: post.content,
				userId: fb.auth.currentUser.uid,
				userName: state.userProfile.name,
				comments: 0,
				likes: 0,
			})
		},
		async likePost ({commit}, post) {
			const userId = fb.auth.currentUser.uid;
			const docId = `${userId}_${post.id}`

			const doc = await fb.likesCollection.doc(docId).get()

			if(doc.exists){return}

			await fb.likesCollection.doc(docId).set({
				postId: post.id,
				userId: userId,
			})
			await fb.postsCollection.doc(post.id).update({
				likes: post.likesCount + 1
			})

		},
	}

})


export default store
