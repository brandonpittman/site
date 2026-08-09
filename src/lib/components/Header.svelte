<script lang="ts">
	import { resolve } from '$app/paths';
	import NavLink from './NavLink.svelte';
</script>

<header class="header wrapper repel w-full">
	<a href={resolve('/')} class="with-icon no-underline font-bold">
		<span class="icon">🏛</span>
		<span>Brandon Pittman</span>
	</a>

	<ul role="list" class="cluster font-bold gutter-s">
		<NavLink href={resolve('/about')}>About</NavLink>
		<NavLink href={resolve('/notes')}>Notes</NavLink>
		<NavLink href={resolve('/colophon')}>Colophon</NavLink>
	</ul>
</header>
