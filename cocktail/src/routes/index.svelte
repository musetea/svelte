<script context="module" lang="typescript">
	import type { DrinkType } from '../types';
	export async function load({ fetch }) {
		try {
			const drink: DrinkType = await (await fetch('index.json')).json();
			console.log(drink);

			return {
				props: {
					drinkProp: drink
				}
			};
		} catch (e) {
			console.error(e);
		}
	}
</script>

<script lang="typescript">
	export let drinkProp: DrinkType;
	let drinkState: DrinkType;
	$: drinkState = drinkProp;

	const handleOnClick = async () => {
		console.log('button on clicked');
		const drink: DrinkType = await (await fetch('index.json')).json();
		drinkState = drink;
	};
</script>

<div class="wrapper">
	<button on:click={handleOnClick}> Get new drink </button>
	<h2>{drinkState.name}</h2>
	<img class="drink-thumb" src={drinkState.thumbUrl} alt={drinkState.instructions} />

	<p>{drinkState.instructions}</p>
	{#each drinkState.ingredients as ingredient}
		<p class="ingredient">{ingredient.name} {ingredient.amount}</p>
	{/each}
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-family: Arial, Helvetica, sans-serif;
	}

	.drink-thumb {
		width: 300px;
		border-radius: 1rem;
	}
	p {
		max-width: 500px;
		text-align: center;
	}

	.ingredient {
		margin: 2px 0;
	}
</style>
