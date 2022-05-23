<script context="module">
	import {checkAuthed} from '../auth/auth';
	//import uiStore from '../stores/ui-store';
</script>

<script>
	import Nav from '../components/Nav.svelte';
	import '../styles/global.css';
	import { onMount } from "svelte";
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	

    let unsubscribe;
	let authed = true;

    // onMount(() => {
    //   unsubscribe = uiStore.subscribe(items => {
    //     console.log('STORE ITEMS', items);
	// 	authed = items.authed;
    //   });
    // });


    // onDestroy(() => {
    //   if(unsubscribe) {
    //     unsubscribe();
    //   }
    // });

	export let segment;

	//$: authed = console.log(segment,authed);

	export const setAuthed = (val) => {
		authed = val;
	}

	onMount(async () => {
		authed = await checkAuthed();
	});


	const setAuthed$ = writable(setAuthed);

	// this updates the store's value when `segment` changes
	// syntactic sugar for: segment$.set(segment)
	$: $setAuthed$ = setAuthed;

	setContext('setAuthed', setAuthed$);
</script>

<style>
	main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	}
</style>

<Nav {segment} {authed}/>

<main class="content">
	<slot></slot>
</main>