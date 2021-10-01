// 写一个函数实现把虚拟dom转化为真实dom(虚拟dom:{ tag: "div", props: {}, children: [] })

function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  };
}

function createHTMLElement({ tag, props, children }) {
  const nextDOM = document.createElement(tag);

  for (const key in props) {
    nextDOM.setAttribute(key, props[key]);
  }

  for (const child of [].concat(children)) {
    nextDOM.appendChild(
      typeof child !== "object"
        ? document.createTextNode(child)
        : createHTMLElement(child)
    );
  }

  return nextDOM;
}

// demo
const node = createHTMLElement(
  h("div", {}, [h("span", { style: "color: red" }, ["测试文本"])])
);
console.log(node);
