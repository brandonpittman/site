<script lang="ts">
	import NavLink from './NavLink.svelte';
</script>

<header class="header wrapper repel w-full">
	<a href="/" class="with-icon no-underline font-bold">
		<span class="icon">🏛</span>
		<span>Brandon Pittman</span>
	</a>

	<ul role="list" class="cluster font-bold gutter-s">
		<NavLink href="/about">About</NavLink>
		<NavLink href="/notes">Notes</NavLink>
		<NavLink href="/colophon">Colophon</NavLink>
	</ul>
</header>
