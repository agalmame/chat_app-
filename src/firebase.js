import * as firebase from 'firebase/app'
import 'firebase/auth' 
import 'firebase/firestore' 


const firebaseConfig = {
	apiKey: 'AIzaSyCpO9Y4nqsxmLdSDpz-77-kJ9O-RwntS_U',
	authDomain: 'vue-dev-5c8ab.firebaseapp.com',
	databaseURL: 'https://vue-dev-5c8ab.firebaseio.com',
	projectId: 'vue-dev-5c8ab',
	storageBucket: 'vue-dev-5c8ab.appspot.com',
	messagingSenderId: '914286053370',
	appId: '1:914286053370:web:bb924fa2c6af3c9af64643'
}

firebase.initializeApp(firebaseConfig)


const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
	db,
	auth,
	usersCollection,
	postsCollection,
	commentsCollection,
	likesCollection
}
