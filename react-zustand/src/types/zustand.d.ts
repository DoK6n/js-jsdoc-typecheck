declare namespace Zustand {
  type MiddleSelector = {
    immer: ['zustand/immer', never];
    subscribe: ['zustand/subscribeWithSelector', never];
    devtools: ['zustand/devtools', never];
  };

  /**
   * zustand Slice Pattern에서 사용되는 Slice 함수에 미들웨어 타입을 추가하여 타입추론 할 수 있도록 만드는 베이스 타입
   *
   * ```
   *    interface StateCreatorSlice<M = []> extends StateCreatorSlice<M, SliceA, SliceB> {}
   *
   *    /**
   *     * @type {Zustand.StateCreatorSlice}
   *     * @type {Zustand.StateCreatorSlice<[Zustand.MiddleSelector['immer'], ...]>}
   * ```
   *
   * */
  type StateCreatorSlice<M = [], T, P> = import('zustand').StateCreator<T & P, M, [], T>;

  type CreateStore<T> = import('zustand').UseBoundStore<import('zustand').StoreApi<T>>;

  type MiddleWares<T> = import('zustand').StateCreator<T>;
}

declare namespace ButtonStore {
  interface State {
    isPressed: boolean;
    setPressed: () => void;
  }
}

declare namespace FishSlice {
  interface State {
    fishes: number;
    addFish: () => void;
  }
}

declare namespace BearSlice {
  interface State {
    bears: number;
    addBear: () => void;
    eatFish: () => void;
  }
}

declare namespace FishBearStore {
  interface BoundState extends FishSlice.State, BearSlice.State {}
}
