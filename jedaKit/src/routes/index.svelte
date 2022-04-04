<script context="module">
  // export const ssr = false;
  export const load = async ({ session, fetch }) => {
    // const res = await fetch("/api/post");
    console.log(session);
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await res.json();
    return {
      props: {
        posts,
        session,
      },
    };
  };
</script>

<script>
  // import { paginate, LightPaginationNav } from 'svelte-paginate'
  // import { session } from "$app/stores";
  export let posts;
  export let session;
  // let currentPage = 1
  // let pageSize = 4
  // $: paginatedItems = paginate({ items:posts, pageSize, currentPage })
  export let serchTerm = "";
  $: searchPosts = posts.filter(post => {
    return post.title.includes(serchTerm);
  });
</script>

<!-- {JSON.stringify(session)} -->

<h1>Posts</h1>
<input type="text" placeholder="search" bind:value={serchTerm} />
<div class="posts">
  {#if searchPosts.length > 0}
    {#each searchPosts as post}
      <div class="post">
        <h2>{post.title.substring(0, 20)}</h2>
        <p>{post.body.substring(0, 100)}</p>
        <p class="link">
          <a href={`/blog/${post.id}`} sveltekit:prefetch> Read More </a>
        </p>
      </div>
    {/each}
  {:else}
    <p>No posts found with <b>"{serchTerm}"</b></p>
  {/if}
</div>

<!-- 
<LightPaginationNav
  totalItems="{posts.length}"
  pageSize="{pageSize}"
  currentPage="{currentPage}"
  limit="{1}"
  showStepOptions="{true}"
  on:setPage="{(e) => currentPage = e.detail.page}"
/> -->
<style>
  .posts {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1rem 0;
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
  input[type="text"] {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 0.5rem;
    font-size: 1rem;
  }

  @media screen and (max-width: 600px) {
    .posts {
      grid-template-columns: 1fr;
    }
  }
</style>
