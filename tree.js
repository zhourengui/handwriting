const tree = {
  value: "A",
  children: [
    {
      value: "B",
      children: [
        {
          value: "D",
          children: [],
        },
        {
          value: "E",
          children: [],
        },
      ],
    },
    {
      value: "C",
      children: [
        {
          value: "F",
          children: [],
        },
        {
          value: "G",
          children: [],
        },
      ],
    },
  ],
};

// 多叉树
// 树的深度优先遍历
// 步骤：
// 1. 访问根节点
// 2. 遍历
const dfs = (root) => {
  console.log(root.value);
  root.children.forEach((child) => dfs(child));
};

// 广度优先遍历

const bfs = (root) => {
  const queue = [root];
  while (queue.length > 0) {
    const top = queue.shift();
    console.log(top.value);
    top.children.forEach((child) => queue.push(child));
  }
};

const binaryTree = {
  value: "A",
  left: {
    value: "B",
    left: {
      value: "D",
      left: null,
      right: null,
    },
    right: {
      value: "E",
      left: null,
      right: null,
    },
  },
  right: {
    value: "C",
    left: {
      value: "F",
      left: null,
      right: null,
    },
    right: {
      value: "G",
      left: null,
      right: null,
    },
  },
};

// 二叉树
// 先中后续遍历

// 先序遍历 递归版
const preorder1 = (root) => {
  if (!root) return;
  console.log(root.value); // 访问根节点
  preorder1(root.left); // 遍历左子树
  preorder1(root.right); // 遍历右子树
};

// 先序遍历非递归版
const preorder2 = (root) => {
  if (!root) return;
  const stack = [root];
  while (stack.length > 0) {
    const p = stack.pop();
    if (p !== null) {
      console.log(p.value);
      stack.push(p.right);
      stack.push(p.left);
    }
  }
};

// 中序遍历 递归版
const inorder1 = (root) => {
  if (!root) return;
  inorder1(root.left); // 遍历左子树
  console.log(root.value); // 访问根节点
  inorder1(root.right); // 遍历右子树
};

// 中序遍历 非递归版
// 定义一个指针，将指针的左子树入栈，直到指针为空，访问根节点，将指针赋值右子树
const inorder2 = (root) => {
  if (!root) return;
  const stack = [];
  let p = root;
  while (stack.length || p) {
    while (p) {
      stack.push(p);
      p = p.left;
    }
    const t = stack.pop();
    console.log(t.value);
    p = t.right;
  }
};

// 后续遍历 递归版
const postorder1 = (root) => {
  if (!root) return;
  postorder1(root.left); // 遍历左子树
  postorder1(root.right); // 遍历右子树
  console.log(root.value); // 访问根节点
};

// 后续遍历 非递归版
const postorder2 = (root) => {
  if (!root) return;
  const stack = [root];
  const outputStack = [];
  while (stack.length) {
    const p = stack.pop();
    outputStack.push(p);
    if (p.left !== null) {
      stack.push(p.left);
    }
    if (p.right !== null) {
      stack.push(p.right);
    }
  }

  while (outputStack.length) {
    const t = outputStack.pop();
    console.log(t.value);
  }
};
