<script context="module">
  export const load = async ({ fetch }) => {
    // const res = await fetch("/api/post");
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();
    return {
      props: {
        posts,
      },
    };
  };
</script>

<script>
  export let posts;
</script>

<h1>Posts</h1>
<div class="posts">
  {#each posts as post}
    <div class="post">
      <h2>{post.title.substring(0, 20)}</h2>
      <p>{post.body.substring(0, 80)}</p>
      <p class="link">
        <a href={`/blog/${post.id}`} sveltekit:prefetch> Read More </a>
      </p>
    </div>
  {/each}
</div>

<style>
  .posts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .post {
    padding: 0.5rem;
    border: 1px solid #ddd;
    box-shadow: 0 0 0.8rem #ddd;
  }
  h2 {
    margin: 0;
  }

  .link {
    text-align: right;
  }

  a {
    text-decoration: none;
  }
</style>
