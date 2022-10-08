<template>
	<div class="main-layout">
		<v-toolbar>
			<v-btn icon class="text-green" @click="goTo('home')">
				<v-icon>mdi-bike</v-icon>
			</v-btn>

			<v-toolbar-title>My shop</v-toolbar-title>

			<v-spacer></v-spacer>

			<v-btn icon>
				<v-icon>mdi-star-outline</v-icon>
			</v-btn>

			<v-btn icon>
				<v-icon>mdi-basket-outline</v-icon>
			</v-btn>

			<v-btn icon @click="goTo('login')">
				<v-icon>mdi-account-outline</v-icon>
			</v-btn>
		</v-toolbar>
		<v-main>
			<router-view />
		</v-main>
	</div>
</template>
<script>
import { useRouter } from 'vue-router'
export default {
	setup() {
		const router = useRouter()

		const goTo = (name) => router.push({ name })
		return {
			goTo,
		}
	},
}
</script>
<style lang="scss">
.main-layout {
	display: grid;
	grid-template-rows: auto 1fr;
	grid-template-columns: 1fr;
	@include parent-size;
}
</style>
