<script lang="ts">
  import { popupStore } from '../stores/popupStore';
  import { searchStore } from '../stores/searchStore';

  export let title: string = '';
  export let description: string = '';
  export let tags: string[] = [];
  export let devLink: string = '';
  export let prodLink: string = '';

  function showPopup(): void {
    popupStore.show(title, description);
  }

  function toggleTag(tag: string): void {
    searchStore.toggleTag(tag);
  }
</script>

<div class="card" on:click={showPopup}>
  <div class="card-content">
    <h2>{title}</h2>
    <p>{description}</p>
    <div class="tag-container">
      {#each tags as tag}
        <span class="tag" on:click|stopPropagation={() => toggleTag(tag)}>{tag}</span>
      {/each}
    </div>
  </div>
  <div class="card-links">
    <div class="card-link dev-link">
      <a href={devLink} target="_blank" on:click|stopPropagation>開発環境</a>
    </div>
    <div class="card-link prod-link">
      <a href={prodLink} target="_blank" on:click|stopPropagation>本番環境</a>
    </div>
  </div>
</div>

<style>
  .card {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    padding: 20px;
    transition: transform 0.3s ease;
    display: flex;
    flex-direction: column;
    cursor: pointer;
  }

  .card:hover {
    transform: translateY(-5px);
  }

  h2 {
    color: #2c3e50;
    margin-top: 0;
    font-size: 1.2em;
  }

  .card-content {
    flex-grow: 1;
  }

  .card-links {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    gap: 10px;
  }

  .card-link {
    flex: 0 0 calc(50% - 5px);
    max-width: calc(50% - 5px);
  }

  .card-link a {
    display: block;
    text-decoration: none;
    padding: 8px 15px;
    border-radius: 5px;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
    font-weight: bold;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
  }

  .dev-link a {
    background-color: #3498db;
    color: white;
  }

  .dev-link a:hover {
    background-color: #2980b9;
  }

  .prod-link a {
    background-color: #e74c3c;
    color: white;
    position: relative;
  }

  .prod-link a:hover {
    background-color: #c0392b;
  }

  .prod-link a::before {
    content: '⚠️';
    margin-right: 5px;
  }

  .tag-container {
    margin-top: 10px;
  }

  .tag {
    background-color: #95a5a6;
    color: white;
    padding: 2px 5px;
    border-radius: 3px;
    font-size: 0.8em;
    margin-right: 5px;
    display: inline-block;
    margin-bottom: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .tag:hover {
    background-color: #7f8c8d;
  }
</style>
