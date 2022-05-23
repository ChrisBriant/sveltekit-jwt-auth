<script>
    import SignIn from '../components/SignIn.svelte'
    import { goto } from '$app/navigation';
    import { getContext } from 'svelte';
    
    let unsubscribe;

    let setNavBar$ = getContext('setAuthed')

    $: setNavBar = $setNavBar$

    const setAuthed = (val) => {
        setNavBar(true);
        goto('/');
	}


</script>

<SignIn setAuthed={setAuthed} />