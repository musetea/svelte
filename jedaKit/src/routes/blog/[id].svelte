<script context="module">
  const DOMAIN = "https://jsonplaceholder.typicode.com";
  export const load = async ({ params, fetch }) => {
    // console.dir(params);
    const id = params.id;
    const res = await fetch(`${DOMAIN}/posts/${id}`);
    const data = await res.json();
    const userRes = await fetch(`${DOMAIN}/users/${data.userId}`);
    const user = await userRes.json();

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
        post: data,
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
