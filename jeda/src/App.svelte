<script>
  import Bomb from "./Bomb/Bomb.svelte";
  import Select from "./Bind/Select.svelte";
  import Box from "./Bind/Box.svelte";
  import Video from "./Video.svelte";
  import LiftCycle from "./LiftCycle.svelte";
  import Body from "./Legs/Body.svelte";
  import Nav from "./Nav.svelte";

  let page;

  const OnPage = e => {
    page = e.detail.page;
  };
</script>

<h1><a href="/"> WEB JEDA</a></h1>
<hr />
<Nav on:page={OnPage} />
{page}
<!-- <Bomb /> <Select /> <Box /> -->
<!-- <Video /> -->

<!-- <LiftCycle /> -->

<!-- <Body /> -->
<style>
</style>
