<script>
	export let fruits;
</script>

<!-- HTML  -->
<h1>Fruits!</h1>

<ul>
	{#each fruits as fruit}
		<li>{fruit}</li>
	{/each}
</ul>
