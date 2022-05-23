import { writable } from 'svelte/store';

const uiData = writable({ authed: false});

console.log('INITIALIZING AUTH STORE');

const uiStore = {
  setAuthed: (val) => {
    console.log(val);
    uiData.set({authed: val});
  },
  subscribe: uiData.subscribe,
};

export default uiStore;