import { writable } from "svelte/store";
import {v4 as uuid} from 'uuid';

export const todoStore = writable([]);

todoStore.set([
    {
        id:uuid(),
        content:'첫번재 할일',
        done:false
    },
    {
        id:uuid(),
        content:'두번재 할일',
        done:true
    },
    {
        id:uuid(),
        content:'세번재 할일',
        done:false
    },
    {
        id:uuid(),
        content:'네번재 할일',
        done:false
    },

])