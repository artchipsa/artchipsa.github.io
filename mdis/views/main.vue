<template>
	<h1> {{ hello }} </h1>
</template>

<script>
	module.exports = {
		data: function(){
			return{
				hello: "Hello World!"
			}
		}
	}
</script>

<style>
	h1{
		color: #333;
	}
</style>