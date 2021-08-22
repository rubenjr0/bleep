<script lang="ts">
	import Navbar from './components/Navbar.svelte';
	import Hero from './components/Hero.svelte';
	import Footer from './components/Footer.svelte';

	import Auth from './routes/Auth.svelte';
	import Profile from './routes/Profile.svelte';
	import Communities from './routes/Communities.svelte';
	import Find from './routes/Find.svelte';
	import Create from './routes/Create.svelte';

	import { userSession, userData } from './lib/sessionStore';
	import { supabase } from './lib/supabaseClient';

	let link: string = process.env.isProd ? 'communities' : 'communities';

	function handleNav(to: string) {
		link = to;
		document.title = to[0].toUpperCase() + to.slice(1);
	}

	userSession.set(supabase.auth.user());

	supabase.auth.onAuthStateChange((_, session) => {
		userSession.set(session.user);
	});
</script>

<main>
	<Navbar on:nav={({ detail: { to } }) => handleNav(to)} />
	<Hero />
	<section class="section">
		<div class="container">
			{#if !$userSession}
				<Auth />
			{:else if !$userData || link === 'profile'}
				<Profile />
			{:else if link === 'communities'}
				<Communities />
			{:else if link === 'find'}
				<Find />
			{:else if link === 'create'}
				<Create />
			{/if}
		</div>
	</section>
	<Footer />
</main>
