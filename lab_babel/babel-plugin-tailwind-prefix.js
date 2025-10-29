export default function tailwindPrefixPlugin() {
  return {
    visitor: {
      VariableDeclarator(path) {
        if (path.node.init?.type === "ObjectExpression") {
          const flag = path.node.init.properties.every(e => isValidProperty(e));
          if (!flag) return;
          appendPrefixToValue(path.node.init, []);
        }
      }
    }
  };
}