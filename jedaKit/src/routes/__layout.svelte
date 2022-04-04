<script context="module">
  const modules = import.meta.glob("./**.svelte");
  // console.log(modules);
  const allMenus = [];
  for (let path in modules) {
    if (path.includes("./__*")) continue;
    if (path.includes("/__")) continue;

    let cleanPath = path.replace(".svelte", "").replace("./", "/");
    let title = path.substring(cleanPath.lastIndexOf("/") + 1);
    let link = cleanPath.includes("index")
      ? cleanPath.replace("index", "")
      : cleanPath;
    allMenus.push({
      title: title,
      link: link,
    });
  }
  // console.log(allMenus);
</script>

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
