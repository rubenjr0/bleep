<script lang="ts">
	import { get, update } from '../lib/userActions';
	import { userData } from '../lib/sessionStore';
	import { slide } from 'svelte/transition';

	let loading: boolean = true;
	let userName: string = null;
	let displayName: string = null;

	async function getProfile() {
		loading = true;
		await get();
		loading = false;
	}

	async function updateProfile() {
		loading = true;
		await update(userName);
		loading = false;
	}

	userData.subscribe((newData) => {
		if (newData) {
			displayName = newData.userName;
		}
	});
</script>

{#if displayName}
	<h1 class="title" transition:slide>{displayName}'s profile</h1>
{/if}

<form use:getProfile on:submit|preventDefault={updateProfile}>
	<div class="field">
		<label class="label" for="username">What's your name?</label>
		<p class="control">
			<input class="input" id="username" bind:value={userName} />
		</p>
	</div>
	<div class="field">
		<p class="control">
			<input
				type="submit"
				class="button is-primary"
				value={loading ? 'Loading' : 'Update'}
				disabled={loading}
			/>
		</p>
	</div>
</form>
