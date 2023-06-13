/** @type {Zustand.CreateStore<ButtonStore.State>} */
export const useButtonStore = create((set, get) => ({
  isPressed: false,
  setPressed: () => set({ isPressed: !get().isPressed }),
}));
