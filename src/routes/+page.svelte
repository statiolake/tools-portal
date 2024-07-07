<script lang="ts">
  import CardContainer from '$lib/components/CardContainer.svelte';
  import Popup from '$lib/components/Popup.svelte';
  import SearchBar from '$lib/components/SearchBar.svelte';
  import Sidebar from '$lib/components/Sidebar.svelte';
  import { sidebarStore } from '$lib/stores/sidebarStore';
  import type { Card } from '$lib/types';
  import { loadToolsConfig } from '$lib/utils/yamlLoader';
  import { onMount } from 'svelte';

  let cards: Card[] = [];

  onMount(async () => {
    cards = await loadToolsConfig();
  });

  function toggleSidebar(): void {
    sidebarStore.toggle();
  }
</script>

<main>
  <div class="menu-toggle" class:active={$sidebarStore.active} on:click={toggleSidebar}>
    <span></span>
    <span></span>
    <span></span>
  </div>

  <Sidebar />

  <div class="container">
    <h1>開発チーム社内ツールポータル</h1>
    <SearchBar />
    <CardContainer {cards} />
  </div>

  <Popup />
</main>

<style>
  :global(body) {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
  }

  main {
    position: relative;
    min-height: 100vh;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  h1 {
    color: #333;
    text-align: center;
  }

  .menu-toggle {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1001;
    cursor: pointer;
    width: 30px;
    height: 25px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: all 0.3s ease;
  }

  .menu-toggle span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: #333;
    border-radius: 3px;
    transition: all 0.3s ease;
  }

  .menu-toggle.active span {
    background-color: white;
  }

  .menu-toggle.active span:nth-child(1) {
    transform: translateY(11px) rotate(45deg);
  }

  .menu-toggle.active span:nth-child(2) {
    opacity: 0;
  }

  .menu-toggle.active span:nth-child(3) {
    transform: translateY(-11px) rotate(-45deg);
  }
</style>
