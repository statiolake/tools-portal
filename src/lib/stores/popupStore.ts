import { writable } from 'svelte/store';

export interface PopupState {
  show: boolean;
  title: string;
  description: string;
}

function createPopupStore() {
  const { subscribe, set, update } = writable<PopupState>({
    show: false,
    title: '',
    description: ''
  });

  return {
    subscribe,
    show: (title: string, description: string) => set({ show: true, title, description }),
    hide: () => set({ show: false, title: '', description: '' }),
    update
  };
}

export const popupStore = createPopupStore();
