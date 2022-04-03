<script context="module">
  const DOMAIN = "https://jsonplaceholder.typicode.com";
  export const load = async ({ params, fetch }) => {
    // console.dir(params);
    // 1
    const id = params.id;
    const res = await fetch(`${DOMAIN}/posts/${id}`);
    const post = await res.json();
    const userRes = await fetch(`${DOMAIN}/users/${post.userId}`);
    const user = await userRes.json();
    
    //2
    

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
        post: post,
        user: user,
      },
    };
  };
</script>

<script>
  export let post;
  export let user;
</script>

<!-- {JSON.stringify(post)} -->
<div class="post">
  <h1>{post.title}</h1>
  <p>{post.body}</p>
  <p>- Written by <a href={`/authors/${user.id}`}><b>{user.name}</b></a></p>
</div>

<style>
  a {
    text-decoration: none;
  }
</style>
