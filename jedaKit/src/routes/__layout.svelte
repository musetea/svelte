<script>
  import Nav from "$lib/Nav.svelte";
</script>

<div class="container">
  <Nav />
  <slot />
</div>

<style>
  .container {
    margin: 0;
    height: 100vh;
    background-color: lightgoldenrodyellow;
  }
</style>
