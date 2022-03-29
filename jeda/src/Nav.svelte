<script>
  import { createEventDispatcher } from "svelte";
  let page = "home";
  let dropdown = false;

  const sendPage = createEventDispatcher();

  const OnClick = e => {
    console.log(e);

    switch (e.target.innerText) {
      case "Home":
        page = "home";
        break;
      case "About":
        page = "about";
        break;
      case "Contact":
        page = "contact";
        break;
    }

    sendPage("page", {
      page: page,
    });
  };
</script>

<nav>
  <ul>
    <li
      class={page == "home" && "active"}
      on:click={e => {
        OnClick(e);
      }}
    >
      <a href="/">Home</a>
    </li>
    <li
      class={page == "about" && "active"}
      on:click={e => {
        OnClick(e);
      }}
    >
      <a href="/">About</a>
    </li>
    <li
      class={page == "contact" && "active"}
      on:click={e => {
        OnClick(e);
      }}
    >
      <a href="/">Contact</a>
    </li>

    <li>
      <label for="dropdown">
        My Account
        <input type="checkbox" name="" id="dropdown" bind:checked={dropdown} />
      </label>
    </li>
  </ul>
  {#if dropdown}
    <ul>
      <li><a href="/">Login</a></li>
      <li><a href="/">Signup</a></li>
      <li><a href="/">Account</a></li>
    </ul>
  {/if}
</nav>

<style>
  ul {
    list-style: none;
    display: flex;
  }

  li {
    margin-right: 20px;
    padding: 5px 20px;
    border: 1px solid;
  }

  li.active {
    background-color: blue;
  }
  li.active a {
    color: white;
  }
</style>
