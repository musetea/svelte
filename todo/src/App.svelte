<script>
  import { todoStore } from "./store";
  import Header from "./components/Header.svelte";
  import Info from "./components/Info.svelte";
  import List from "./components/List.svelte";
  import { v4 as uuid } from "uuid";
  import Constant from './constant';



  let todos = $todoStore;
  let todoValue = "";
  let editMode = "";
  let viewMode = 'all';

  $: todoCount = todos.length;
  $: todoState  = todos;

  $: {
    if(viewMode === Constant.ALL) todoState = todos;
    if(viewMode === Constant.ACTIVE) todoState = todos.filter(t => t.done === false);
    if(viewMode === Constant.DONE)  todoState = todos.filter(t => t.done === true);
  }

  function refersh(){
    todos = todos;
  }

  function handleCheckTodo(id) {
    todos.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
      return todo;
    });
    console.log(todos);
  }

  function addTodo() {
    if (todoValue) {
      const newTodo = {
        id: uuid(),
        content: todoValue,
        done: false,
      };
      todos = [...todos, newTodo];
      todoValue = "";
    }
  }

  function handleTodoItemKeyUp(e) {
    if (e.keyCode === 13) {
      console.log(`todoValue: ${e.target.value}`);
      addTodo();
    }
  };

  function handleRemoveTodo(id){
    todos = todos.filter(todo => todo.id !== id);
  };

  function handleChangeEditMode(id){
    console.log(id, 'changed editer mode');
    editMode = id;
    refersh();
  };

  function closeEditMode(){
    editMode = "";
  };

  function handleEditTodo(e, modify){
    if(e.keyCode === 13){
      EditTodo(modify);
    }
  
  };

  const EditTodo = (modify) => {

    todos = todos.map(todo => {
      if(todo.id === modify.id){
        todo.content = modify.content;
      }
      return todo;
    });

    closeEditMode();
  };

  function handleChangeViewMode(mode){
    viewMode = mode;
  }



  
</script>

<div class="app">
  <Header bind:todoValue {handleTodoItemKeyUp} />
  <Info {todoCount}/>
  <List {todoState} {handleCheckTodo} {handleRemoveTodo} {editMode} {handleChangeEditMode} {handleEditTodo} />
</div>
