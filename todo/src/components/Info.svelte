<script>
  import Constant from '../constant';
  export let todoCount;
  export let handleChangeViewMode;
</script>



<div class="info">
  <span>할일: {todoCount}</span>

  <div>
    <button class="btn" on:click={()=>{ handleChangeViewMode() }}>모두보기</button>
    <button class="btn">진행</button>
    <button class="btn">완료</button>
  </div>
</div>
