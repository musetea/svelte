<script>
  import Item from "./Item.svelte";

  export let todoState;
  export let handleCheckTodo;
  export let handleRemoveTodo;
  export let editMode;
  export let handleChangeEditMode;
  export let handleEditTodo;
</script>

<div class="main">
  <ul>
    {#each todoState as todo, index (todo)}
      <li>
        <Item {todo} {handleCheckTodo} {handleRemoveTodo} {editMode} {handleChangeEditMode} {handleEditTodo}/>
      </li>
    {/each}
  </ul>
</div>
