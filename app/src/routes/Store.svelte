<!-- HTML  -->
<Parent />




<!-- SCRIPT -->
<script>
    import Parent from './store/Parent.svelte'; 
    import { storeName } from './store/store';

    let name = 'world';
    console.log(storeName)
    // 오토서브스크립트, 스토어 객체 ($) 실제 데이터
    console.log($storeName)
    $storeName = name;
</script>