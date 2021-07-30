const container = document.querySelector("#root")

let element = (
  <div id="A1">
    <div id="B1">
      <div id="C1"></div>
      <div id="C2"></div>
    </div>
    <div id="B2"></div>
  </div>
)

// 下一个工作单元
// Fiber
let workingInProgressFiber = {
  stateNode: container,
  props: { children: [element] },
  child: null,
  return: null,
  sibling: null,
  type: null,
  effectTag: null,
  firstEffect: null,
  lastEffect: null,
}

let nextUnitOfWork = workingInProgressFiber

function workLoop(deadline) {
  while (nextUnitOfWork && deadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
  }

  if (!nextUnitOfWork) {
    commitRoot()
  }
}

function commitRoot() {
  let currentFiber = workingInProgressFiber.firstEffect
  while (currentFiber) {
    if (currentFiber.effectTag === "PLACEMENT") {
      currentFiber.return.stateNode.appendChild(currentFiber.stateNode)
    }

    currentFiber = currentFiber.nextEffect
  }
  workingInProgressFiber = null
}

function performUnitOfWork(workingInProgressFiber) {
  // 1.beginWork, 创建fiber的真实DOM 通过虚拟DOM创建Fiber树结构,不挂载
  beginWork(workingInProgressFiber)
  // 有子元素
  if (workingInProgressFiber.child) {
    return workingInProgressFiber.child
  }
  while (workingInProgressFiber) {
    if (workingInProgressFiber.sibling) {
      return workingInProgressFiber.sibling
    }
    completeUnitOfWork(workingInProgressFiber)
    // 没有兄弟元素的时候设置为父节点，指向父节点之后又进入while循环，这时候的sibling就是父节点的兄弟
    workingInProgressFiber = workingInProgressFiber.return
  }
}

function completeUnitOfWork(workingInProgressFiber) {
  // 构建父作用于链effectList,只有有副作用的节点
  let returnFiber = workingInProgressFiber.return
  if (returnFiber) {
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = workingInProgressFiber.firstEffect
    }

    if (workingInProgressFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = workingInProgressFiber.firstEffect
      }
      returnFiber.lastEffect = workingInProgressFiber.lastEffect
    }

    if (workingInProgressFiber.effectTag) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = workingInProgressFiber
      } else {
        returnFiber.firstEffect = workingInProgressFiber
      }

      returnFiber.lastEffect = workingInProgressFiber
    }
  }
}

// beginWork, 创建fiber的真实DOM 通过虚拟DOM创建Fiber树结构,不挂载
function beginWork(workingInProgressFiber) {
  if (!workingInProgressFiber.stateNode) {
    workingInProgressFiber.stateNode = document.createElement(
      workingInProgressFiber.type
    )
    for (let key in workingInProgressFiber.props) {
      if (key !== "children") {
        workingInProgressFiber.stateNode[key] =
          workingInProgressFiber.props[key]
      }
    }
  }

  // 创建子fiber
  let previousFiber
  workingInProgressFiber.props.children.forEach((child, index) => {
    let childFilber = {
      type: child.type,
      props: child.props,
      return: workingInProgressFiber,
      effectTag: "PLACEMENT", // 插入标记
      nextEffect: null, // 下一个有副作用节点
    }
    if (index === 0) {
      workingInProgressFiber.child = childFilber
    } else {
      previousFiber.sibling = childFilber
    }
    previousFiber = childFilber
  })
}

requestIdleCallback(workLoop)
