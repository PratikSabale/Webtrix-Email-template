import { atom } from "recoil";

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

