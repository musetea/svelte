<script>
  import { onMount, onDestroy, beforeUpdate, afterUpdate, tick } from "svelte";

  let name = "world";

  beforeUpdate(() => {
    // console.log("Before");
  });
  onMount(() => {
    // console.log("Mounted");
  });
  afterUpdate(() => {
    // console.log("After");
  });
  onDestroy(() => {
    // console.log("Destroy");
  });

  const updateGreeting = async () => {
    name = "Sharath";
    await tick();
    name = "Jhon";
    await tick();
    name = "Micle";
  };
</script>

<h1>Hello {name}</h1>

<button on:click={updateGreeting}> Update </button>
