<!-- 스크립트 -->
<script>
	// import { onMount } from 'svelte';
	import Fruits from './Fruits.svelte';

	let name = 'world';
	let age = 100;
	let user = { loggedIn: false };
	let x = 7;
	let fruits = ['Apple', 'Banana', 'Cherry', 'Orange', 'Mango'];
	let isRed = false;
	let text = '';

	function toggle() {
		user.loggedIn = !user.loggedIn;
	}

	const addNumber = () => {
		x += 1;
	};
	const minusNumber = () => {
		x -= 1;
	};

	function deleteFruit() {
		fruits = fruits.slice(1);
	}

	// onMount(() => {
	// 	const box = document.querySelector('.box');
	// 	box.addEventListener('click', () => {
	// 		isRed = !isRed;
	// 	});
	// });

	// 이벤트 바인팅
	function enter() {
		name = 'enter';
	}
	const leave = () => {
		name = 'leave';
	};
</script>

<!-- HTML -->
{#if user.loggedIn}
	<!-- if 문 시작 -->
	<button on:click={toggle}> Log out </button>
{:else}
	<!-- else 문 사용 방법 -->
	<button on:click={toggle}> Log in </button>
{/if}
<!-- if 문 종료 -->
<hr />

{#if x > 10}
	<p>{x} is greater than 10</p>
{:else if 5 > x}
	<p>{x} is less than 5</p>
{:else}
	<p>{x} is between 5 and 10</p>
{/if}
<button on:click={addNumber}> add number + 1 </button>
<button on:click={minusNumber}> minus number - 1 </button>
<hr />
<h1>Hello {name}!</h1>
<h2 class={age <= 85 ? 'active' : ''}>{age}</h2>
<button
	on:click={() => {
		age--;
	}}
>
	-
</button>
<button
	on:click={() => {
		age++;
	}}
>
	+
</button>
<img src="" alt={name} />
<input type="text" value={name} />
<!-- 단반향 바인딩  -->
<input type="text" bind:value={name} />
<!-- 양방향 바인딩 -->
<button
	on:click={() => {
		name = 'musetea';
		age = 46;
	}}
>
	assign
</button>
<hr />
<!-- 반복문 -->
<h1>Fruits!</h1>

<ul>
	{#each fruits as fruit}
		<li>{fruit}</li>
	{/each}
</ul>
<button on:click={deleteFruit}> Eat it! </button>

<h2>Fruite Revers</h2>
<ul>
	{#each [...fruits].reverse() as fruit}
		<li>{fruit}</li>
	{/each}
</ul>

<h2>Fruite slice -2</h2>
<ul>
	{#each fruits.slice(-2) as fruit}
		<li>{fruit}</li>
	{/each}
</ul>
{fruits}
<hr />

<div
	class="box"
	style="background-color: {isRed ? 'red' : 'orange'};"
	on:click={() => {
		isRed = !isRed;
	}}
	on:mouseenter={enter}
	on:mouseleave={leave}
>
	BOX!
</div>
<hr />

<h1>{text}</h1>
<h2>INPUT 1</h2>
<input
	type="text"
	value={text}
	on:input={(e) => {
		text = e.target.value;
	}}
/>
<h2>INPUT 2</h2>
<input type="text" bind:value={text} />

<button
	on:click={() => {
		text = 'Musetea';
	}}
>
	Click
</button>
<hr />
<!-- 
    컴포넌트 
 -->

<Fruits {fruits} />
<Fruits {fruits} reverse={true} />
<Fruits {fruits} slice="-2" />
<Fruits {fruits} slice="0, 3" />

<!-- 스타일 -->
<style>
	h1 {
		color: green;
	}
	.active {
		color: blue;
	}

	.box {
		width: 300px;
		height: 150px;
		background-color: orange;
	}
</style>
