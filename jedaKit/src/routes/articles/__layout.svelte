<svelte:head>
  <title>Article</title>
</svelte:head>

<div class="container">
  <slot />
</div>

<style>
  .container {
    max-width: 700px;
    margin: 50px auto;
    background-color: mediumorchid;
  }
</style>
