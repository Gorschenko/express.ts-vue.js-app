<template>
	<section class="flex-row-full-centered parent-size">
		<v-form
			ref="form"
			v-model="valid"
			lazy-validation
			class="full-width p-16"
			@submit.prevent="submit"
		>
			<v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>

			<v-text-field
				v-model="password"
				:rules="passwordRules"
				label="Password"
				required
			></v-text-field>

			<v-btn :disabled="!valid" color="success" class="mr-4" type="submit"> Validate </v-btn>
			{{ data }}
		</v-form>
	</section>
</template>
<script>
import axios from 'axios'

export default {
	data: () => ({
		valid: true,
		password: '',
		passwordRules: [(v) => !!v || 'Password is required'],
		email: '',
		emailRules: [
			(v) => !!v || 'E-mail is required',
			(v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
		],
		data: {},
	}),

	methods: {
		async submit() {
			try {
				const { data } = await axios.post('/auth/login', {
					email: this.email,
					password: this.password,
				})
				this.data = data
			} catch (e) {
				console.log(e)
			}
		},
	},
}
</script>
