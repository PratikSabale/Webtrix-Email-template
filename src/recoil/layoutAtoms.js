import { atom, selector } from "recoil";

// Dragged item during drag & drop
export const draggedItemState = atom({
  key: "draggedItemState",
  default: null,
});

// PlayArea items
export const playAreaItemsState = atom({
  key: "playAreaItemsState",
  default: [],
});

// Selected item in PropertiesPanel
export const selectedItemState = atom({
  key: "selectedItemState",
  default: null,
});

// Undo/Redo history
export const historyState = atom({
  key: "historyState",
  default: [],
});

export const futureState = atom({
  key: "futureState",
  default: [],
});

// Selector with history support
export const playAreaItemsWithHistoryState = selector({
  key: "playAreaItemsWithHistoryState",
  get: ({ get }) => get(playAreaItemsState),
  set: ({ get, set }, newValue) => {
    const current = get(playAreaItemsState);
    set(historyState, [...get(historyState), current]);
    set(futureState, []);
    set(playAreaItemsState, newValue);
  },
});

// Undo
export const undoState = selector({
  key: "undoState",
  get: () => null,
  set: ({ get, set }) => {
    const history = get(historyState);
    if (!history.length) return;
    const current = get(playAreaItemsState);
    const previous = history[history.length - 1];
    set(futureState, [...get(futureState), current]);
    set(historyState, history.slice(0, -1));
    set(playAreaItemsState, previous);
  },
});

// Redo
export const redoState = selector({
  key: "redoState",
  get: () => null,
  set: ({ get, set }) => {
    const future = get(futureState);
    if (!future.length) return;
    const current = get(playAreaItemsState);
    const next = future[future.length - 1];
    set(historyState, [...get(historyState), current]);
    set(futureState, future.slice(0, -1));
    set(playAreaItemsState, next);
  },
});
