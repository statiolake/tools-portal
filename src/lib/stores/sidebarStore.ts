import { writable } from 'svelte/store';

export interface SidebarState {
  active: boolean;
}

function createSidebarStore() {
  const { subscribe, set, update } = writable<SidebarState>({
    active: false
  });

  return {
    subscribe,
    toggle: () => update((state) => ({ active: !state.active })),
    open: () => set({ active: true }),
    close: () => set({ active: false }),
    update
  };
}

export const sidebarStore = createSidebarStore();
