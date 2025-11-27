import { atom, selector } from "recoil";

export const draggedItemState = atom({
  key: "draggedItemState",
  default: null,
});

export const playAreaItemsState = atom({
  key: "playAreaItemsState",
  default: [],
});

export const selectedItemState = atom({
  key: "selectedItemState",
  default: null,
});

/* ------------------ UNDO / REDO HISTORY STACKS ------------------ */

export const historyState = atom({
  key: "historyState",
  default: [],
});

export const futureState = atom({
  key: "futureState",
  default: [],
});

/* ------------------ WRAPPED STATE SETTER WITH HISTORY  ------------------ */

export const playAreaItemsWithHistoryState = selector({
  key: "playAreaItemsWithHistoryState",
  get: ({ get }) => get(playAreaItemsState),

  set: ({ get, set }, newValue) => {
    const current = get(playAreaItemsState);

    // Push current state into history
    set(historyState, [...get(historyState), current]);

    // Clear redo stack
    set(futureState, []);

    // Update actual items
    set(playAreaItemsState, newValue);
  },
});

/* ------------------ UNDO ------------------ */

export const undoState = selector({
  key: "undoState",
  get: () => null,
  set: ({ get, set }) => {
    const history = get(historyState);
    if (history.length === 0) return;

    const current = get(playAreaItemsState);
    const previous = history[history.length - 1];

    // Move current → future stack
    set(futureState, [...get(futureState), current]);

    // Remove previous from history
    set(historyState, history.slice(0, history.length - 1));

    // Restore previous
    set(playAreaItemsState, previous);
  },
});

/* ------------------ REDO ------------------ */

export const redoState = selector({
  key: "redoState",
  get: () => null,
  set: ({ get, set }) => {
    const future = get(futureState);
    if (future.length === 0) return;

    const current = get(playAreaItemsState);
    const next = future[future.length - 1];

    // Move current → history
    set(historyState, [...get(historyState), current]);

    // Remove item from redo stack
    set(futureState, future.slice(0, future.length - 1));

    // Set forward state
    set(playAreaItemsState, next);
  },
});
