<script>
  import Nav from "$lib/Nav.svelte";
</script>

<div class="container">
  <Nav />
  <slot />
</div>

<style>
  .container {
    height: 100vh;
  }
</style>
