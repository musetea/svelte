<script context="module">
  export const load = ({ page }) => {
    const id = page.params.id;

    return {
      props: {
        id,
      },
    };
  };
</script>

<script>
  export let id;
</script>

{id}

<h1>Blog Post</h1>
