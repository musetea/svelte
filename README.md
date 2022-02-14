# svelte
## 설치
    - npx degit sveltejs/template `my-app`
    


## life cycle
    - 컴포넌트가 연결되고 헤제되는 등의 컴포넌트의 생명주기
    - onMount
    - onDesttroy
    - beforeUpdate
    - afterUpdate
    - Tick

### 실행순서
    - 컴포넌트를 `연결`하면 
        1) beforeUpdate
            - DOM과 데이터를 동기화 (렌더링)
        2) onMount
        3) afterUpdate

    - 컴포넌트를 연결 `해제` 하면 
        1) onDestory
    - 컴포넌트의 `데이터를 갱신`하면
        1) befereUpdate
        2) afterUpdate 