<!-- HTML -->
<input type="text" 
    bind:value={title}
    on:keydown={
        (e)=> {
            e.key === 'Enter' && createTodo()
        }
    }

>
<button on:click={createTodo}>
    Create Todo
</button>
<hr />

{#each $todos as todo}
    <TodoComp todo={todo} todos={todos} />
{/each}

{$todos.map(t => t.title)}
<!-- SCRIPT -->
<script>
    import {writable} from 'svelte/store';
    import TodoComp from './TodoComp.svelte';
    let title = ''
    let todos = writable([]);
    let id = 0;

    const createTodo = () =>{
        if(!title.trim())
        {
            title="";
            return;
        }
        const todo = {
            id,
            title
        }
        $todos.push(todo);
        title='';
        id++;

        // todos = [...todos];
        $todos = $todos;
    }

</script>