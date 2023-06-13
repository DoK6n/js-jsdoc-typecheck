/** @type {Zustand.StateCreatorSlice<[Zustand.MiddleSelector['subscribe'], Zustand.MiddleSelector['devtools']], BearSlice.State, FishSlice.State>} */
export const createBearSlice = (set, get) => ({
  bears: 0,
  addBear: () => set((state) => ({ bears: state.bears + 1 })),
  eatFish: () => set((state) => ({ fishes: state.fishes - 1 })),
});
