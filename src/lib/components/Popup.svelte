<script lang="ts">
  import { popupStore } from '../stores/popupStore';

  function closePopup(): void {
    popupStore.hide();
  }
</script>

{#if $popupStore.show}
  <div class="popup">
    <span class="popup-close" on:click={closePopup}>&times;</span>
    <h2>{$popupStore.title}</h2>
    <p>{$popupStore.description}</p>
  </div>
  <div class="overlay" on:click={closePopup}></div>
{/if}

<style>
  .popup {
    display: block;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    z-index: 1002;
    max-width: 80%;
    width: 500px;
    max-height: 80vh;
    overflow-y: auto;
  }

  .popup-close {
    position: absolute;
    top: 15px;
    right: 20px;
    cursor: pointer;
    font-size: 28px;
    color: #666;
    line-height: 1;
    transition: color 0.3s ease;
  }

  .popup-close:hover {
    color: #333;
  }

  h2 {
    margin-top: 0;
    margin-bottom: 15px;
    padding-right: 30px;
    color: #2c3e50;
  }

  p {
    margin-bottom: 0;
    line-height: 1.6;
    color: #34495e;
  }

  .overlay {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1001;
  }
</style>
