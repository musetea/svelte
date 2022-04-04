<script>
  import Nav from "$lib/Nav.svelte";
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<div class="container">
  <Nav />
  <slot />
</div>

<style>
  .container {
    height: 100vh;
    background-color: lightskyblue;
  }
</style>
