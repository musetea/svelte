<script>
  import { userName } from "../stores";
  import { page } from "$app/stores";

  const navs = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Contact", path: "/contact" },
    { title: "Login", path: "/login" },
  ];

  $: console.log($page);
</script>

<header>
  <nav>
    <ul>
      {#each navs as nav}
        <li class:active={$page.url.pathname === nav.path}>
          <a href={nav.path}>{nav.title}</a>
        </li>
      {/each}
    </ul>
  </nav>

  <div class="user">
    <h2>{$userName}</h2>
    <input type="text" name="" id="" bind:value={$userName} />
  </div>
</header>

<!-- {JSON.stringify($page)} -->
<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .user {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.1rem;
  }

  ul {
    margin: 0;
    display: flex;
    list-style: none;
  }

  li {
    padding: 5px 10px;
    margin-right: 10px;
    border: 1px solid;
  }
  li.active {
    color: black;
    background-color: white;
  }

  a {
    text-decoration: none;
  }
</style>
