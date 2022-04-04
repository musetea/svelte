<script>
  // import "uno.css";
  import "../app.css";
  import Nav from "$lib/Nav.svelte";
</script>

<div class="container">
  <Nav />
  <slot />
</div>

<style>
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0;
    background-color: lightgoldenrodyellow;
  }
</style>
