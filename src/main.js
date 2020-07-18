import Vue from "vue"
import App from "./App.vue"
import router from './router'
import store from './store/index'
import  { auth, postsCollection } from './firebase'
import './assets/scss/app.scss'

Vue.config.productionTip = false

let app;

postsCollection.orderBy("createdOn", "desc").onSnapshot(snapshot => {
	let postArray = []
	snapshot.forEach(doc => {
		let post = doc.data()
		post.id = doc.id

		postArray.push(post)
	})
	store.commit('setPosts', postArray)
})



auth.onAuthStateChanged(user =>{
	if(!app) {
		 new Vue({
			router,
			store,
			render: h => h(App)
		}).$mount('#app')
	}
	if (user) {
		store.dispatch('fetchUserProfile', user);
	}
})



