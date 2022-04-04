<script>
  import { onMount } from "svelte";
  import App from "../../../jeda/src/App.svelte";
  import Box from "../../../jeda/src/Bind/Box.svelte";
  import Bomb from "../../../jeda/src/Bomb/Bomb.svelte";
  import Body from "../../../jeda/src/Legs/Body.svelte";
  import { fruits, user } from "../stores";
  import AuthorId from "./authors/[authorId].svelte";
  // import "unocss";
  //import "../../static/style.scss";

  let fruit = "";

  onMount(() => {
    $fruits = [...$fruits];
    $user = { ...$user, email: "t7730@email.com" };
  });
</script>

<h1>About</h1>

<div class="box wrapper">
  <h2>SCSS About</h2>
</div>

<h2 class="font-bold text-indigo-500">스벨트 타일원도</h2>
<div>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ratione quam
  vel saepe repellat temporibus ad, laudantium atque magni ipsa ab molestias,
  totam architecto pariatur voluptatibus voluptate nobis eveniet blanditiis.
</div>
<button class="bg-indigo-500 hover:bg-indigo-700 text-green-100 px-4"
  >Click</button
>

<div class="fruits m-10">
  <h2>Fruits</h2>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. eiciendis cum illum
    nostrum.
  </p>
  <ul>
    {#each $fruits as item}
      <li>{item}</li>
    {/each}
  </ul>
  <input type="text" bind:value={fruit} />
  <button
    class="btn"
    on:click={() => {
      $fruits = [...$fruits, fruit];
      fruit = "";
    }}
  >
    Add
  </button>
</div>

<div class="user m-10 card shadow-x1">
  <h2 class="cart-title">User Info</h2>
  <h2>{$user.name}</h2>
  <p><i>{$user.age}</i></p>
  <p>{$user.email}</p>
</div>

<style lang="scss">
  .box {
    padding: 1rem;
    background-color: black;

    h2 {
      color: white;
    }
  }

  .fruits {
    h2 {
      color: $info-color;
    }
    p {
      @include danger;
    }
  }
</style>
