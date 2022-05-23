<script>
  export let href = null;
  export let className;
  export let disabled = false;
</script>

<style>
  .btn {
    border: none;
    border-radius: 10px;
    padding: 5px;
    margin: 2px 0;
  }

  .btn.btn-primary {
    color: #fff;
    background-color: var(--btn-primary);
    transition: all 1s;
  }

  .btn.btn-primary:hover {
    color: #efefef;
    background-color: var(--btn-primary-hov);
  }
</style>

{#if href}
  <a {href}>
    <slot />
  </a>
{:else}
  <button class="{className}" on:click {disabled}>
    <slot />
  </button>
{/if}