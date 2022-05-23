<script context="module">
	import { onMount } from "svelte";
	import {checkAuthed} from '../../auth/auth';
</script>

<script>
	import SignIn from '../../components/SignIn.svelte';
	import LoadingSpinner from '../../components/UI/LoadingSpinner.svelte';
	
	let checkingAuth = true;
	let authed;

	onMount(async () => {
		authed = await checkAuthed();
		checkingAuth = false;
	});

	const setAuthed = (val) => {
		checkingAuth = true;
		authed = val;
		checkingAuth = false;
	}
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


{#if checkingAuth}
	<LoadingSpinner />
{:else}
	{#if authed}
        <main class="content">
            <slot></slot>
        </main>
	{:else}
        <main class="content">
            <SignIn setAuthed={setAuthed} /> 
        </main>
	{/if}
{/if}
