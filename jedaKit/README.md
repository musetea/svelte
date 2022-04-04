### JSON DATA

![](https://jsonplaceholder.typicode.com/)
![](https://www.npmjs.com/package/svelte-paginate)

### 스벨트 SASS

```shell
    npm i -D svelte-preprocess
    npm i -D node-sass

    # svelte.config.js 수정

### svelte-tailwind
npx svelte-add@latest tailwindcss
```

### daisyUI

[](https://daisyui.com/)

```sh
    npm init svelte@next 
    npx svelte-add@lastest tailwindcss
    npm install -D daisyui
```

### LOGIN

npm i cookie
npm i uuid

### SSG

- Static Site Generation (adapter-static)
- SSR을 수행하기 위해 서버를 유지관리,비용을 지불필요 없음.
- 라우팅 : 클라이언트 라우팅.

### UNO CSS

<https://github.com/unocss/unocss>
import Unocss from 'unocss/vite'
vite:{
     plugins: [
        Unocss({ /*options*/ }),
  ],
}
npm i -D @unocss/preset-attributify
