import { writable } from 'svelte/store';
import { browser} from '$app/env';


export const userName = writable(browser && (localStorage.getItem("userName") || "Web Jeda.."));
userName.subscribe((val) => browser && (localStorage.userName = val));

export const fruits = writable(browser && (JSON.parse(localStorage.getItem("fruits")) || ["apple", "orange", "graphs"]));
fruits.subscribe((val) => {
    // console.log(val);
    browser && localStorage.setItem("fruits",JSON.stringify(val));
});

const storedUser = browser && (JSON.parse(localStorage.getItem('user')) || {name:"뮤즈티", age:46, id:"t7730"});
export const user = writable(storedUser);
user.subscribe((val) => {
    browser && localStorage.setItem("user", JSON.stringify(val));
});

    