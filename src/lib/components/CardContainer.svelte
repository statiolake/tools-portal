<script lang="ts">
  import { searchStore, type SearchState } from '$lib/stores/searchStore';
  import type { Card as CardType } from '$lib/types';
  import Card from './Card.svelte';

  export let cards: CardType[] = [];

  $: filteredCards = filterCards($searchStore, cards);

  function filterCards(searchInput: SearchState, cards: CardType[]): CardType[] {
    const searchTerms = searchInput.query
      .toLowerCase()
      .split(' ')
      .filter((term) => term.length > 0);
    const tagFilters = searchTerms
      .filter((term) => term.startsWith('tag:'))
      .map((term) => term.slice(4));
    const textFilters = searchTerms.filter((term) => !term.startsWith('tag:'));

    return cards.filter((card) => {
      const cardText = `${card.title} ${card.description}`.toLowerCase();
      const cardTags = card.tags.map((tag) => tag.toLowerCase());

      const matchesTagFilters =
        tagFilters.length === 0 ||
        tagFilters.every((tag) => cardTags.some((cardTag) => isMatch(tag, cardTag)));
      const matchesTextFilters =
        textFilters.length === 0 ||
        textFilters.some((term) => cardText.split(' ').some((word) => isMatch(term, word)));

      return matchesTagFilters && matchesTextFilters;
    });
  }

  function isMatch(searchTerm: string, targetString: string): boolean {
    return isSubsequence(searchTerm, targetString) || isSimilar(searchTerm, targetString);
  }

  function isSubsequence(str1: string, str2: string): boolean {
    let i = 0,
      j = 0;
    while (i < str1.length && j < str2.length) {
      if (str1[i].toLowerCase() === str2[j].toLowerCase()) i++;
      j++;
    }
    return i === str1.length;
  }

  function isSimilar(str1: string, str2: string, threshold: number = 0.5): boolean {
    const distance = levenshteinDistance(str1, str2);
    const maxLength = Math.max(str1.length, str2.length);
    const similarity = 1 - distance / maxLength;
    return similarity >= threshold;
  }

  function levenshteinDistance(a: string, b: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }
</script>

<div class="card-container">
  {#each filteredCards as card}
    <Card {...card} />
  {/each}
</div>

<style>
  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
  }
</style>
