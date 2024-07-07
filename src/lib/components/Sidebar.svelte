<script lang="ts">
  import { sidebarStore } from '../stores/sidebarStore';

  interface SidebarLink {
    href: string;
    text: string;
  }

  const links: SidebarLink[] = [
    { href: '#', text: 'ホーム' },
    { href: '#', text: 'ツール一覧' },
    { href: '#', text: '設定' },
    { href: '#', text: 'ヘルプ' }
  ];
</script>

<div class="sidebar" class:active={$sidebarStore.active}>
  <ul>
    {#each links as link}
      <li><a href={link.href}>{link.text}</a></li>
    {/each}
  </ul>
</div>

<style>
  .sidebar {
    position: fixed;
    top: 0;
    left: -250px;
    width: 250px;
    height: 100%;
    background-color: #2c3e50;
    transition: 0.3s;
    padding-top: 60px;
    z-index: 1000;
  }

  .sidebar.active {
    left: 0;
  }

  .sidebar ul {
    list-style-type: none;
    padding: 0;
  }

  .sidebar ul li {
    padding: 10px 20px;
  }

  .sidebar ul li a {
    color: white;
    text-decoration: none;
    font-size: 18px;
    display: block;
    transition: 0.3s;
  }

  .sidebar ul li a:hover {
    color: #ecf0f1;
    background-color: #34495e;
  }
</style>
