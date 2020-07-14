<template>
	<div class="modal">
		<div class="modal-content">
			<div @click="$emit('close')" class="close">Close</div>
				<h3>Repeat Password</h3>
				<div v-if="!showSuccess">
					<p>enter your email to reset your password</p>
					<form @submit.prevent>
						<input type="text" v-model.trim="email" placeholder="you@gmail.com"/>
					</form>
					<p v-if="errorMsg !== ''" class="error">{{ errorMsg }}</p>
					<button @click="resetPassword()" class="button">Reset</button>
				</div>
				<p v-else>Success! check your email for a reset link.</p>
			</div>
		</div>
	</div>
</template>
<script>
	import { auth } from '@/firebase'
	export default {
		data() {
			return {
				errorMsg: "",
				email: "",
				showSuccess:false,
			}

		},
		methods: {
			async resetPassword() {
				this.errorMsg = '';
				try {
					await auth.sendPasswordResetEmail(this.email);
					this.showSuccess = true;
				} catch(err) {
					this.errorMsg = err.message
				}
			},
			
		}
	}
</script>
<style scoped>
</style>
