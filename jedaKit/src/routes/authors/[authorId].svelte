<script context="module">
  const DOMAIN = "https://jsonplaceholder.typicode.com";
  export const load = async ({ params, fetch }) => {
    // console.dir(params);
    const id = params.authorId;
    const res = await fetch(`${DOMAIN}/users/${id}`);
    const user = await res.json();

    const resPosts = await fetch(`${DOMAIN}/posts`);
    const posts = await resPosts.json();

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

<!-- {JSON.stringify(user)} -->
{JSON.stringify(posts)}
<div class="user">
  <h1>{user.name}</h1>
  <p>{user.company.catchPhrase}</p>
  <p>{user.email}</p>
</div>
