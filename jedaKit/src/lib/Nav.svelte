<script>
  import { userName } from "../stores";
</script>

<header>
  <nav>
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/about">About</a>
      </li>
      <li>
        <a href="/contact">Contact</a>
      </li>
    </ul>
  </nav>
  <div class="user">
    <h2>{$userName}</h2>
    <input type="text" name="" id="" bind:value={$userName} />
  </div>
</header>

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

  a {
    text-decoration: none;
  }
</style>
