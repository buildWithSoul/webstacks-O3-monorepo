import { create } from 'zustand';

interface TOCStore {
  activeItem: number;
  previousActiveItem: number | null;
  headings: Array<{ id: string; element: Element }>;
}

export const setActiveItem = (index: number) => {
  tocStore.setState(state => ({
    activeItem: index,
    previousActiveItem: state.activeItem,
  }));
};

export const setHeadings = (headings: Array<{ id: string; element: Element }>) => {
  tocStore.setState({ headings });
};

const tocStore = create<TOCStore>(() => ({
  activeItem: 0,
  previousActiveItem: null,
  headings: [],
}));

export default tocStore;