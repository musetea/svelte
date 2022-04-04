<script context="module">
  const DOMAIN = "https://jsonplaceholder.typicode.com";
  export const load = async ({ params, fetch }) => {
    // console.dir(params);
    const id = params.authorId;

    // const res = await fetch(`${DOMAIN}/users/${id}`);
    // const resPosts = await fetch(`${DOMAIN}/posts`);
    // 2
    // const [resUser, resPosts] = await Promise.all([
    //   fetch(`${DOMAIN}/users/${id}`),
    //   fetch(`${DOMAIN}/posts`)
    // ]);
    const res = await fetch(`${DOMAIN}/users/${id}?_embed=posts`);
    const user = await res.json();
    // const allPosts = await resPosts.json();
    // const posts = allPosts.filter((post) => {
    //   return post.userId === user.id;
    // });
    const posts = user.posts;

    /**
       * {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      "address": {
        "street": "Kulas Light",
        "suite": "Apt. 556",
        "city": "Gwenborough",
        "zipcode": "92998-3874",
        "geo": {
          "lat": "-37.3159",
          "lng": "81.1496"
        }
      },
      */

    return {
      props: {
        user: user,
        posts: posts,
      },
    };
  };
</script>

<script>
  export let user;
  export let posts;
</script>

<svelte:head>
  <title>Author</title>
</svelte:head>

<!-- {JSON.stringify(user)} -->
<!-- {JSON.stringify(posts)} -->
<div class="user">
  <h1>{user.name}</h1>
  <p>{user.company.catchPhrase}</p>
  <p>{user.email}</p>
</div>
<div class="posts">
  <h2>Posts by <i>{user.name}</i></h2>
  <ul>
    {#each posts as post}
      <li>
        <a href={`/blog/${post.id}`}>{post.title}</a>
      </li>
    {/each}
  </ul>
</div>

<style>
  li {
    margin-bottom: 0.5rem;
  }
</style>
