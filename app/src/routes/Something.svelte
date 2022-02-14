<h1 class="something">    
    {name}
</h1>
<input type="text" bind:value={name}>

<script>
    import { onMount, onDestroy, beforeUpdate, afterUpdate} from 'svelte'

    let name ='Something...';

    onMount(()=>{
        console.log('Mounted')

        const h1 = document.querySelector('h1.something');
        console.log(`${h1.innerText} 1`);

        // onDestroy() 역활을 함 반환 함수 
        return ()=>{
            console.log('Destory in mount');
        }
    })

    onDestroy(()=>{
        console.log("Destory");
        const h1 = document.querySelector('h1.something');
        console.log(`${h1.innerText} 2`);
    })

    beforeUpdate(()=>{
        console.log('before update.')
    });

    afterUpdate(()=>{
        console.log('after update.')
    });



</script>


