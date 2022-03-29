<script>
  import { pain } from "./feelings";
</script>

<div class="legs">
  <span>{$pain}</span>
</div>

<style>
  .legs {
    position: relative;
    width: 130px;
    height: 100px;
    border-left: 10px solid blue;
    border-right: 10px solid blue;
  }

  span {
    position: absolute;
    bottom: 0;
  }
</style>
