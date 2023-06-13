import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { createBearSlice } from './bearSlice';
import { createFishSlice } from './fishSlice';

/** @param {Zustand.MiddleWares<FishBearStore.BoundState>} f */
// const middlewares = (f) => subscribeWithSelector(f);
const middlewares = (f) => subscribeWithSelector(devtools(f));

/** @type {Zustand.CreateStore<FishBearStore.BoundState>} */
export const useBoundStore = create((...a) => ({
  ...createBearSlice(...a),
  ...createFishSlice(...a),
}));

const {} = useBoundStore();
