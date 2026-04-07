<script lang="ts">
	import { resolve } from '$app/paths';
	import MessageMe from '$lib/components/MessageMe.svelte';

	const traditionStoicism = 'https://traditionalstoicism.com/the-path-of-the-prokopton/';
	const github = 'https://github.com/brandonpittman';
	const coffee = 'https://buymeacoffee.com/blp';
</script>

<svelte:head>
	<title>Brandon Pittman</title>
	<meta name="description" content="Brandon Pittman's little corner of the Internet." />
</svelte:head>

<p>
	Welcome to my little corner of the Internet! This site is an attempt to get back to where we used
	to be in the 90's&mdash;everyone having their own personal site that told the world who they are
	and what they're interested in.
</p>
<p>
	My name is Brandon Pittman. I build web sites and apps, study
	<a href={traditionStoicism}>traditional Stoicism</a>, and I train Brazilian jiu-jitsu. I sometimes
	<a href="/notes">write</a>
	about programming, Stoic ideals, and managing time and attention. I don't use social media aside from
	<a href={github}>GitHub</a>. My backstory is on the <a href="/about">About</a> page. You may also
	find something interesting in the interested in what
	<a href={resolve('/unplayed')}>games I play</a>
	or
	<a href={resolve('/unread')}>books I read</a>.
</p>

<p>
	If you'd like to help support my continued work on open source software, or you'd like to say
	"thanks" for something of mine that you used or read that gave you some benefit, then consider
	<a href={coffee} target="_blank" rel="noopener noreferrer">buying me a coffee</a>.
</p>

<p>
	If you wanna listen to some music I've been digging lately-ish, here's my
	<a href="https://music.apple.com/us/playlist/hot-shit/pl.u-GgLNRT738Pa">Preferred Indifferents</a>
	playlist in Apple Music.
</p>

<MessageMe />
