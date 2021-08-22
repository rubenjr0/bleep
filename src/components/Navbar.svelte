<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { logOut } from '../lib/userActions';
	import { userData } from '../lib/sessionStore';

	const dispatch = createEventDispatcher();

	function nav(to: string) {
		dispatch('nav', {
			to,
		});
	}

	let open = false;

	function toggleNav() {
		open = !open;
	}
</script>

{#if $userData}
	<nav class="navbar is-black is-spaced">
		<div class="navbar-brand">
			<a
				href="#!"
				role="button"
				class="navbar-burger {open && 'is-active'}"
				aria-label="menu"
				aria-expanded="false"
				data-target="navMenu"
				on:click={toggleNav}
			>
				<span aria-hidden="true" />
				<span aria-hidden="true" />
				<span aria-hidden="true" />
			</a>
		</div>
		<div
			id="navMenu"
			class="navbar-menu {open && 'is-active'} has-background-black"
		>
			<div class="navbar-start">
				<div class="navbar-item">
					<button
						class="button is-black is-fullwidth"
						on:click={() => nav('communities')}
					>
						My communities
					</button>
				</div>
				<div class="navbar-item">
					<button
						class="button is-black is-fullwidth"
						on:click={() => nav('find')}
					>
						Find a community
					</button>
				</div>
				<div class="navbar-item">
					<button
						class="button is-black is-inverted is-fullwidth"
						on:click={() => nav('create')}
					>
						Create a community
					</button>
				</div>
			</div>
			<div class="navbar-end">
				<div class="navbar-item">
					<button
						class="button is-primary is-inverted is-fullwidth"
						on:click={() => nav('profile')}
					>
						My profile
					</button>
				</div>
				<div class="navbar-item">
					<button class="button is-danger is-fullwidth" on:click={logOut}>
						Log out
					</button>
				</div>
			</div>
		</div>
	</nav>
{/if}
