<template>
	<div id="login">
		<resetPassword v-if="showPasswordReset" @close='togglePasswordReset()'></resetPassword>
		<section>
			<div class="col1">
				<h1>MERIEM</h1>
				<p>welcome to our website<a href="https://savvyapps.com/" target="_blank"> Apps</a>
					build this project with vue.js
				</p>
			</div>
			<div :class="{'signup-form': !showLoginForm }" class="col2">
				<form v-if="showLoginForm" @submit.prevent>
					<h1>Welcome back</h1>
					<div>
						<label for="email1">Email</label>
						<input type="text" v-model.trim="loginForm.email" placeholder="you@email.com" id='email1'/>
					</div>
					<div>
						<label for="password1">Password</label>
						<input type="password" v-model.trim="loginForm.password" id="password1" placeholder="*******"/>
					</div>
					<button @click="login()" class='button'>Log In</button>
					<div class="extras">
						<a @click="togglePasswordReset()">Forgot Password</a>
						<a @click="toggleForm()">Create an Account</a>
					</div>
				</form>
				<form v-else @submit.prevent>
					<h1>Get started</h1>
					<div>
						<label for='name'>Name</label>
						<input v-model.trim="signupForm.name" type='text' placeholder="savvy apps" id="name"/>
					</div>
					<div>
						<label for="title">Title</label>
						<input v-model.trim="signupForm.title" type='text' placeholder='company' id='title'/>
					</div>
					<div>
						<label for="email">Email</label>
						<input v-model.trim="signupForm.email" type="text" placeholder="your email" id="email"/>
					</div>
					<div>
						<label for="password2">Password</label>
						<input v-model.trim="signupForm.password" type="password" placeholder="min 6 characters" id="password2"/>
					</div>
					<button @click="signup()" class='button'>Singn Up</button>
					<div class="extras">
						<a @click="toggleForm()">Back to Log In</a>
					</div>
				</form>
			</div>
		</section>	
	</div>
</template>

<script>
	import resetPassword from "@/components/password_reset"
	export default {
		components: {
			resetPassword,
		},
		data() {
			return {
					loginForm:{
						email: '',
						password: '',
				},
					signupForm:{
						name: '',
						email: '',
						password: '',
						title: '',

				},
				
					showLoginForm : true,
					showPasswordReset: false,
				
			}
		},
		methods: {
	  		login() {
    					this.$store.dispatch('login', {
      						email: this.loginForm.email,
      						password: this.loginForm.password
    				})
	  		},
			signup() {
					this.$store.dispatch('signup',{
						email: this.signupForm.email,
						password: this.signupForm.password,
						title: this.signupForm.title,
						name: this.signupForm.name
					})
			},
			toggleForm() {
					this.showLoginForm = !this.showLoginForm
			},
			togglePasswordReset() {
				this.showPasswordReset = !this.showPasswordReset;
			}

		}
	}
</script>

<style scoped>
</style>
