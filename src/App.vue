<template>
	<v-app>
		<div id="app">
			<h1>Sundbåten webapp</h1>
			<Entur />
			<!-- <ApolloExample msg="Welcome to Your Vue.js App" /> -->
		</div>
	</v-app>
</template>

<script>
// import ApolloExample from "./components/ApolloExample.vue";
import Entur from "./components/Entur";

export default {
	name: "App",
	components: {
		// ApolloExample
		Entur
	}
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
</style>
