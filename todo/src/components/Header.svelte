<script>
  export let todoValue;
  export let handleTodoItemKeyUp;
</script>

<header>
  <div class="wrap">
    <h1>TODO</h1>
    <input type="text" bind:value={todoValue} on:keyup={handleTodoItemKeyUp} />
  </div>
</header>
