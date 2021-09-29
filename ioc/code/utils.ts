import { parseScript } from "esprima";
export function getParams(fn: Function) {
  const ast = parseScript(fn.toString(), {});
  const node = ast.body[0];
  let params: any[] = [];
  let validParams: string[] = [];

  if (node.type === "FunctionDeclaration") {
    params = node.params;
  }

  for (const item of params) {
    validParams.push(item.name);
  }

  return validParams;
}
