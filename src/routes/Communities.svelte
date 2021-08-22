<script lang="ts">
	import { userSession } from '../lib/sessionStore';
	import { get } from '../lib/communityActions';

	import CommunityCard from '../components/CommunityCard.svelte';
</script>

<h1 class="title">My communities</h1>

<hr />

{#await get($userSession.id)}
	Wait...
{:then communities}
	<div class="columns is-multiline">
		{#each communities as name}
			<div class="column is-4">
				<CommunityCard {name} />
			</div>
		{/each}
	</div>
{:catch err}
	err: {err}
{/await}
