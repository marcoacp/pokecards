import { writable } from 'svelte/store';

export const page = writable('Home');
export const pokelist = writable([]);
export const favorites = writable([]);
