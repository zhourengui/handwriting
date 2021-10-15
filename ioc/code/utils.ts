import { parseScript } from "esprima";

export const getParams = <T extends new (...args: any[]) => any>(
  constructor: T
) => {
  const ast = parseScript(String(constructor));
  const node = ast.body[0];
  const params = [];
  if (node.type === "FunctionDeclaration") {
    for (const param of node.params) {
      params.push((param as any).name);
    }
  }
  return params;
};
