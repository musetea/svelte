<script>
	export let fruits;
	export let reverse;
	export let slice;
	let computedFruits = []
	let name = "";

	if(reverse){
		computedFruits = [...fruits].reverse();
		name = "reverse"
	}
	else if(slice){
		console.log(...slice.split(','))
		computedFruits = fruits.slice(...slice.split(','))
		// name = 'slice ' + slice;
		name = `slice  ${slice}`;
	}
	else{
		computedFruits = fruits;
	}

</script>

<!-- HTML  -->
<h1>Fruits! {name}</h1>

<ul>
	{#each computedFruits as fruit}
		<li>{fruit}</li>
	{/each}
</ul>
