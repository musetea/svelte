<script context="module">
  export const load = async ({ fetch }) => {
    const res = await fetch("index.json");
    const data = await res.json();
    console.log(data);

    return {
      props: {
        data,
      },
    };
  };
</script>

<script>
  export let data;
</script>

<h1>HOME</h1>

{JSON.stringify(data)}
