<!-- HTML -->
<h1>Welcome to SvelteKit</h1>
<!-- <Assignments answer={'46'}, {...pkg} /> -->
<!-- <Logic /> -->
<!-- <Store /> -->
<!-- <Todo /> -->
<button on:click={()=>{
	toggle = !toggle;
}}>
	Toggle
</button>
{#if toggle}
	<Something />
{/if}


<script>
    // import Assignments  from "./assignments.svelte"
    import Logic from './logic.svelte'; 
	import Store from './Store.svelte';
	import Todo from './todo/Todo.svelte'
	import Something from './Something.svelte';

    const pkg = {
		name: 'svelte',
		version: 3,
		speed: 'blazing',
		website: 'https://svelte.dev'
	};

	let toggle=false;

</script>