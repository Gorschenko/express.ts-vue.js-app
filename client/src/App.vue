<template>
	<v-app class="kek">
		<h1 class="text-3xl font-bold underline mb-202">Hello world!</h1>
		<v-btn append>Hi</v-btn>
		<router-view />
	</v-app>
</template>

<script>
export default {
	name: 'App',

	data: () => ({
		//
	}),
}
</script>
<style lang="scss">
.kek {
	background: $cl-red;
}
</style>
