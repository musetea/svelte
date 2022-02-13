<button on:click={handleClick}>
    Button's Clicked <strong>{count}</strong> {count === 1 ? 'time' : 'times'}
</button>
<p>
    {count} doubled is <strong>{doubled}</strong>.
</p>
<button on:click={addNumber}>
    Add Number
</button>
<p>{numbers.join(' + ')} = {sum}</p>

<p>answer = {answer}</p>

<p>
	The <code>{name}</code> package is {speed} fast.
	Download version {version} from <a href="https://www.npmjs.com/package/{name}">npm</a>
	and <a href={website}>learn more here</a>
</p>

<script>
    let count = 0;
    let numbers = [1, 2, 3, 4];
    export let answer = 'a mystery';

    export let name;
	export let version;
	export let speed;
	export let website;

    // let sum = 0;
    $: doubled = count * 2;
    $: sum = numbers.reduce((t,n) => t +n, 0);
    $: {
        console.log('the count is ' + count);
        //alert(`I SAID THE COUNT IS ${count}`);

        if(count >= 10){
            alert(`I SAID THE COUNT IS ${count}`);
        }

        

    }
    function handleClick(){
        count += 1
    }
    function addNumber() {
		// 방법1
        // numbers.push(numbers.length + 1);
        // numbers = numbers  // 반드시필요
        // 방법2
        numbers = [...numbers, numbers.length + 1]; // 재배정
        // sum = numbers.reduce((t, n) => t + n, 0)
	}

</script>

<style>
    strong{
        font-size: 1.2em;
        color: red;
    }
</style>