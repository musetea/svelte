import { writable } from 'svelte/store';

export const userName = writable(localStorage.getItem("userName") || "Web Jeda..");
userName.subscribe((val) => localStorage.setItem("userName", val));