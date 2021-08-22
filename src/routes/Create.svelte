<script lang="ts">
	import { userSession } from '../lib/sessionStore';
	import { create } from '../lib/communityActions';
	import { slide } from 'svelte/transition';

	let loading: boolean = false;
	let communityName: string = null;
	let created: boolean = false;
	let err: boolean = false;
	let errName: string = null;

	async function createCommunity() {
		loading = true;
		try {
			await create($userSession.id, communityName.toLowerCase());
			created = true;
		} catch (error) {
			err = true;
			errName = communityName;
		}
	}

	$: err = communityName !== null && communityName === errName;
</script>

<h1 class="title">Create a community</h1>
{#if err}
	<div class="notification is-danger is-light" transition:slide>
		The community <tt>b/{communityName}</tt> Already exists! Use a different name
		or visit the community
	</div>
{/if}
{#if !created}
	<form on:submit|preventDefault={createCommunity}>
		<label class="label" for="communityName">Community name</label>
		<div class="field has-addons">
			<p class="control">
				<button class="button is-static">b/</button>
			</p>
			<p class="control">
				<input
					class="input is-lowercase"
					id="communityName"
					bind:value={communityName}
				/>
			</p>
		</div>
		<div class="field">
			<p class="control">
				<input
					type="submit"
					class="button is-primary"
					value="Create"
					disabled={loading || !communityName}
				/>
			</p>
		</div>
	</form>
{:else}
	<div class="notification is-success is-light">
		The community <tt>b/{communityName}</tt> has been created!
	</div>
{/if}
