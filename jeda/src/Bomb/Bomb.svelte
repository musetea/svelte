<script>
  import Button from "./Room.svelte";
  let blast;

  const detonateBomb = event => {
    console.log(event.detail.blast);
    blast = event.detail.blast;
  };
</script>

<div class="lab">
  <div class="bomb" class:blast />
  <div class="button">
    <Button on:click={detonateBomb} />
  </div>
</div>

<style>
  .lab {
    position: relative;
    display: grid;
    place-items: center;
    height: 100%;
    width: 100%;
  }
  .bomb {
    width: 20px;
    height: 20px;
    border-radius: 100%;
    border: 4px solid;
    background: gray;
    transition: transform 2s ease-in-out;
  }

  .button {
    position: absolute;
    bottom: 0;
    transition: tr;
  }

  .blast {
    background: red;
    border-color: red;
    transform: scale(30);
  }
</style>
