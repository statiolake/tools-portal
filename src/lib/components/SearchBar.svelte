<script lang="ts">
  import { searchStore } from '../stores/searchStore';

  function handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    searchStore.set(target.value);
  }

  $: query = $searchStore.query;
</script>

<input
  type="text"
  value={query}
  on:input={handleInput}
  placeholder="検索... (例: tag:デプロイ Jenkins)"
/>

<style>
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
  }
</style>
