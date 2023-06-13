/** @type {Zustand.StateCreatorSlice<[Zustand.MiddleSelector['subscribe'], Zustand.MiddleSelector['devtools']], FishSlice.State, BearSlice.State>} */
export const createFishSlice = (set, get) => ({
  fishes: 0,
  addFish: () => set((state) => ({ fishes: state.fishes + 1 })),
});
