<script lang="ts">
export let isAnimated = false

export let onClick = () => {
  navigator.clipboard.writeText("hey@brandonpittman.com").then(() => {
    isAnimated = true
  })}
</script>

<button
  on:click={onClick}
  on:animationend={() => {
    isAnimated = false
  }}
  style={isAnimated
    ? "animation: var(--animation-blink); animation-iteration-count: 1"
    : undefined
  }
  class="cta"
>
  Copy
</button>
