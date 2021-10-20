const modules = {
  user: {
    namespaced: true,
    state: {},
    getters: {},
    actions: {},
    mutations: {},
  },
  other: {
    namespaced: true,
    state: {},
    getters: {},
    actions: {},
    mutations: {},
  },
};
// 原始类型
// {
//   user: {
//     namespaced: true,
//     state: {},
//     getters: {},
//     actions: {},
//     mutations: {}
//   }
// }
// 目标类型
// {
//   "user/isLoading": string,
//   ...
// }

/**
 * {
 *    "user": {
 *        "isLoading": boolean
 *    },
 *    "other": {
 *      ...
 *    }
 * }
 */

type GetGetters<M> = {
  [K in keyof M]: M[K] extends { getters: infer G } ? G : unknown;
};

/**
 * {
 *   user: {
 *      isLoading: () => string
 *   }
 * }
 */
type MGetters = GetGetters<typeof modules>;

/**
 * {
 *   "user": "user/isLoading"
 * }
 */

type GetSpliceKey<K, M> = `${K & string}/${M & string}`;

type GetSpliceKeys<M> = {
  [K in keyof M]: GetSpliceKey<K, keyof M[K]>;
}[keyof M];

/**
 * {
 *   "user/isLoading": () => string
 * }
 *
 * [K in GetSpliceKeys<M>] === "user/isLoading" | ...
 *
 *
 * M === MGetters
 */

type GetFunc<M, A, B> = M[A & keyof M][B & keyof M[A & keyof M]];

type GetSpliceObj<M> = {
  [K in GetSpliceKeys<M>]: K extends `${infer A}/${infer B}`
    ? GetFunc<M, A, B>
    : unknown;
};

/**
 * {
 *   "user/isLoading": string
 * }
 */
type ModuleGetters = GetSpliceObj<MGetters>;

type Getters = {
  [K in keyof ModuleGetters]: ReturnType<ModuleGetters[K]>;
};

export { Getters };
