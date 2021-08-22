<script lang="ts">
	import { userData } from '../lib/sessionStore';
</script>

<header class="hero is-primary {$userData ? 'is-small' : 'is-medium'}">
	<div class="hero-body">
		<div class="container">
			<h1 class="title">&gt; Bleep</h1>
			<p class="subtitle">The community-driven platform</p>
		</div>
	</div>
</header>
