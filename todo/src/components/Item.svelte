<script>
  export let todo;
  export let handleCheckTodo;
  export let handleRemoveTodo;
  export let editMode;
  export let handleChangeEditMode;
  export let handleEditTodo;
</script>

<input
  type="checkbox"
  bind:checked={todo.done}
  on:click={() => {
    handleCheckTodo(todo.id);
  }}
/>
{#if editMode === todo.content}
  alert(`${editMode}`)
  <input type="text" 
      bind:value={todo.content} 
      on:keyup={ (e)=> {
      console.log('on:keyup', e, todo.content);
      handleEditTodo(e, todo)
    }} />
{:else}
  <span on:dblclick={() => {
        console.log('double clicked ', todo.id);
        handleChangeEditMode(todo.id)
    }} >
    {todo.content}
  </span>
{/if}

<a href="#null"
  on:click|preventDefault={(e)=>{
    handleRemoveTodo(todo.id);
  }}
>X</a>
