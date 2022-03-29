<script>
  import { onMount } from "svelte";

  let boxy;
  let width = 100;
  let height;

  onMount(() => {
    boxy.style = "background-color:red; width:100px";
  });

  $: {
    console.log(boxy);
    console.log(width, height);
  }
</script>

<div class="group">
  <div class="box" bind:this={boxy} />
  <div>
    <div
      class="box"
      bind:clientWidth={width}
      bind:clientHeight={height}
      style="width: {width}px;"
    />
    <input type="range" name="" id="" bind:value={width} />
  </div>
</div>

<style>
  .group {
    display: flex;
  }

  .box {
    margin: 10px;
    height: 100px;
    background-color: navy;
  }
</style>
