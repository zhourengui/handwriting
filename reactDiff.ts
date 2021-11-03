interface VNodeElement {
  tag?: string;
  key: string;
}

type EffectType = "update" | "add" | "move" | "delete";

interface Effect {
  type: EffectType;
  key?: string;
  from?: number;
  to?: number;
  index?: number;
  node?: VNodeElement;
}

function diff(oldElements: VNodeElement[], newElements: VNodeElement[]) {
  // 这个过程会使用一个列表记录新的位置
  // 1. 先删除
  // 2. 新增
  // 3. 在移动
  // 4. 在更新
  const changeList: Effect[] = [];
  const resList: string[] = [];
  const newMap = new Map(
    newElements.map((element, index) => [element.key, index])
  );
  const oldMap = new Map(
    oldElements.map((element, index) => [element.key, index])
  );

  for (let i = 0; i < oldElements.length; i++) {
    const { key } = oldElements[i];
    if (!newMap.has(key)) {
      changeList.push({
        type: "delete",
        key,
      });
    } else {
      resList.push(key);
    }
  }

  for (let i = 0; i < newElements.length; i++) {
    const curr = newElements[i];
    const { key } = curr;
    if (!oldMap.has(key)) {
      changeList.push({
        type: "add",
        key,
        index: i,
        node: curr,
      });
      resList.splice(i, 0, key);
    } else {
      if (resList.indexOf(key) !== i) {
        const from = resList.indexOf(key);
        const to = i;
        changeList.push({
          type: "move",
          to,
          from,
        });
        const tmp = resList[to];
        resList[to] = resList[from];
        resList[from] = tmp;
      }
    }
  }

  return changeList;
}

console.log(
  diff(
    [{ key: "A" }, { key: "B" }, { key: "C" }, { key: "D" }, { key: "E" }],
    [{ key: "F" }, { key: "D" }, { key: "B" }, { key: "C" }, { key: "E" }]
  )
);
