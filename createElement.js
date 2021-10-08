// 写一个函数实现把虚拟dom转化为真实dom(虚拟dom:{ tag: "div", props: {}, children: [] })

function h(tag, props, children) {
  return {
    tag,
    props,
    children,
  };
}

function createHTMLElement({ tag, props, children }) {
  const dom = document.createElement(tag);

  for (const key in props) {
    if (Object.hasOwnProperty.call(props, key)) {
      dom.setAttribute(key, props[key]);
    }
  }

  for (const child of children) {
    dom.appendChild(
      typeof child === "object"
        ? createHTMLElement(child)
        : document.createTextNode(child)
    );
  }

  return dom;
}

// demo
const node = createHTMLElement(
  h("div", {}, [h("span", { style: "color: red" }, ["测试文本"])])
);
console.log(node);
