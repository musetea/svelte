<script>
  let name = "abc";
  let email = "abc@email.com";
  let message = "";
  let error = "";

  const submitForm = async () => {
    console.log("submit");
    try {
      const submit = await fetch("/api", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });
      console.dir(submit);
      const data = await submit.json();
      message = data;
    } catch (err) {
      //console.error(err);
      error = err;
    }
  };

  //   $: console.log(name, email);
</script>

<h1>Contact</h1>

{#if !message && !error}
  <!-- action="/api/contact" method="POST" -->
  <form on:submit|preventDefault={submitForm}>
    <label for="name">
      Name:
      <input type="text" name="name" id="name" bind:value={name} />
    </label>
    <label for="email">
      Email:
      <input type="email" name="email" id="email" bind:value={email} />
    </label>
    <input type="submit" value="submit" />
  </form>
{:else if message}
  <p>Hi {message.name}, your submissin has been received.</p>
{:else if error}
  <pre>{error}</pre>
{/if}

<style>
  label {
    display: block;
    margin-bottom: 1rem;
  }
</style>
