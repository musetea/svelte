<script>
  let email = "";
  let pass = "";

  const login = async () => {
    console.log(email, pass);
    const res = await fetch("/api/login", {
      method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      body: JSON.stringify({
        email: email,
        password: pass,
      }),
    });
    const data = await res.json();
    console.log(data);
  };
</script>

<h1>Login</h1>
<label for="email">
  Email:
  <input type="email" name="" id="email" bind:value={email} />
</label>
<label for="password">
  Password:
  <input type="password" name="" id="password" bind:value={pass} />
</label>

<button class="btn" on:click={() => login()}>Login</button>

<style>
  label {
    display: block;
  }
</style>
