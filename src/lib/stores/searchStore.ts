import { writable } from 'svelte/store';

export interface SearchState {
  query: string;
}

function createSearchStore() {
  const { subscribe, set, update } = writable<SearchState>({ query: '' });

  return {
    subscribe,
    set: (query: string) => set({ query }),
    update,
    clear: () => set({ query: '' }),
    toggleTag: (tag: string) =>
      update((state) => {
        const tagTerm = `tag:${tag.toLowerCase()}`;
        const currentTerms = state.query.toLowerCase().split(' ');

        if (currentTerms.includes(tagTerm)) {
          return {
            query: currentTerms
              .filter((term) => term !== tagTerm)
              .join(' ')
              .trim()
          };
        } else {
          return { query: [...currentTerms, tagTerm].join(' ').trim() };
        }
      })
  };
}

export const searchStore = createSearchStore();
