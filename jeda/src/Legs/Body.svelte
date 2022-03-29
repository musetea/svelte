<script>
  import Brain from "./Brain.svelte";
  import Legs from "./Legs.svelte";
</script>

<div class="body">
  <Brain />
  <Legs />
</div>

<style>
  .body {
    display: grid;
    place-items: center;
  }
</style>
