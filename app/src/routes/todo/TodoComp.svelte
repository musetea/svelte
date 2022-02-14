
{#if isEdit}
    <div>
        <input type="text" 
            bind:value={title}
            on:keydown={(e) => {
                e.key === 'Enter' && updateTodo();
            }} 
        />
        <button on:click={updateTodo} >Ok</button>
        <button on:click={offEdit}>Cancel</button>
    </div>
{:else}
    <div>
        {todo.title}
        <button on:click={onEdit}>
            Edit
        </button>
        <button on:click={onDelete}>
            Delete
        </button>
    </div>
{/if}





<script>
    export let todo;
    export let todos;

    let isEdit = false;
    let title = '';

    function onEdit(){
        console.log(`${todo.title} Editing`)
        isEdit = true;
        title = todo.title;

    }
    function updateTodo(){
        todo.title = title;
        offEdit();
    }
    function offEdit(){
        isEdit = false;
    }

    function onDelete(){
        console.log(`${todo.title} Deleting`)

        // 반응성 유지 
        $todos = $todos.filter(t => t.id !== todo.id);
    }
</script>