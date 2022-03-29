<script>
  let value = [];
  $: console.log(typeof value);
</script>

<h1>{value}</h1>
<select name="" id="" multiple bind:value>
  <option value="car">Car</option>
  <option value="train">Train</option>
  <option value="aeroplane">Aeroplane</option>
</select>
