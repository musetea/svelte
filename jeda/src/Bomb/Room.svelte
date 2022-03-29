<script>
  import { createEventDispatcher } from "svelte";

  const send = createEventDispatcher();

  const goAhead = () => {
    send("click", {
      blast: true,
    });
  };
</script>

<div class="safe-room">
  <button on:click={goAhead}> Detonate </button>
</div>

<style>
  .safe-room {
    width: 200px;
    height: 100px;
    border: 4px solid;
    background: white;

    display: grid;
    place-items: center;
  }
</style>
