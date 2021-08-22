<script lang="ts">
	import { supabase } from '../lib/supabaseClient';

	let email: string = '';
	let loading: boolean = false;
	let sent: boolean = false;

	async function handleLogin() {
		try {
			loading = true;

			const { error } = await supabase.auth.signIn({ email });
			if (error) {
				throw error;
			}
			sent = true;
		} catch (error) {
			alert(error);
		} finally {
			loading = false;
		}
	}
</script>

{#if !sent}
	<form class="box" on:submit|preventDefault={handleLogin}>
		<div class="field ">
			<label class="label" for="email">Email</label>
			<p class="control">
				<input
					class="input"
					id="email"
					type="email"
					placeholder="hello@bleep.com"
					disabled={loading}
					bind:value={email}
				/>
			</p>
		</div>
		<div class="field">
			<p class="control">
				<input
					type="submit"
					class="button is-primary"
					value={loading ? 'Loading' : 'Send magic link'}
					disabled={loading}
				/>
			</p>
		</div>
	</form>
{:else}
	<div class="notification is-success is-light">
		Check your email for the login link!
	</div>
{/if}
