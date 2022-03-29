<script>
  let isPageLoaded = false;
  const pageLoaded = () => {
    isPageLoaded = true;
  };
</script>

{#if !isPageLoaded}
  <div class="loader" use:pageLoaded>
    <img src="" alt="" />
  </div>
{/if}

<slot />

<style>
  .loader {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: grid;
    place-items: center;
    background-color: white;
    z-index: 9999;
  }
</style>
