<!-- HTML -->
{#if user.loggedIn } <!-- if 문 시작 -->
<button on:click={toggle}>
    Log out
</button>
{:else } <!-- else 문 사용 방법 -->
<button on:click={toggle}>
    Log in
</button>
{/if} <!-- if 문 종료 -->
<hr />

{#if x > 10 }
    <p>{x} is greater than 10</p>
{:else if 5 > x}
    <p>{x} is less than 5</p>
{:else}
    <p>{x} is between 5 and 10</p>
{/if}
<button on:click={addNumber}>
    add number + 1
</button>
<button on:click={minusNumber}>
    minus number - 1
</button>
<hr />
<h1>Hello {name}!</h1>
<h2 class={age <= 85 ? 'active' : ''}>{age}</h2>
<button on:click={()=>{ age--; }}>
    -
</button>
<button on:click={()=>{ age++; }}>
    +
</button>
<img src="" alt={name}>
<input type="text" value={name}>        <!-- 단반향 바인딩  -->
<input type="text" bind:value={name}>   <!-- 양방향 바인딩 -->
<button on:click={()=>{
    name="musetea";
    age = 46;
}} >
    assign
</button>
<hr>
<!-- 반복문 -->
<h1>Fruits!</h1>

<ul>
    {#each fruits as fruit}
    <li>{fruit}</li>
    {/each}
</ul>
<button on:click={deleteFruit}>
    Eat it!
</button>

<!-- 스크립트 -->
<script>
    let name= "world";
    let age=100
    let user = { loggedIn: false };
    let x = 7;
    let fruits = ['Apple', 'Banana', 'Cherry', 'Orange', 'Mango'];


    function toggle(){
        user.loggedIn = !user.loggedIn;
    };

    const addNumber = () =>{
        x+= 1;
    };
    const minusNumber = () =>{
        x -= 1;
    };

    function deleteFruit(){
        fruits = fruits.slice(1)
    }
</script>

<!-- 스타일 -->
<style>
    h1{
        color: green;
    }
    .active{
        color: blue;
    }
</style>