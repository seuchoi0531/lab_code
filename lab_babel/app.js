import { parse } from "@babel/parser";
import _traverse from "@babel/traverse";
const traverse = _traverse.default;
import { generate } from "@babel/generator";
import * as t from "@babel/types";

const tailwindPrefix = [
  "hover",
  "focus",
  "focus-within",
  "focus-visible",
  "active",
  "visited",
  "target",
  "*",
  "**",
  "inert",
  "first",
  "last",
  "only",
  "odd",
  "even",
  "first-of-type",
  "last-of-type",
  "only-of-type",
  "empty",
  "disabled",
  "enabled",
  "checked",
  "indeterminate",
  "default",
  "optional",
  "required",
  "valid",
  "invalid",
  "user-valid",
  "user-invalid",
  "in-range",
  "out-of-range",
  "placeholder-shown",
  "details-content",
  "autofill",
  "read-only",
  "before",
  "after",
  "first-letter",
  "first-line",
  "marker",
  "selection",
  "file",
  "backdrop",
  "placeholder",
  "sm",
  "md",
  "lg",
  "xl",
  "2xl",
  "max-sm",
  "max-md",
  "max-lg",
  "max-xl",
  "max-2xl",
  "@3xs",
  "@2xs",
  "@xs",
  "@sm",
  "@md",
  "@lg",
  "@xl",
  "@2xl",
  "@3xl",
  "@4xl",
  "@5xl",
  "@6xl",
  "@7xl",
  "@max-3xs",
  "@max-2xs",
  "@max-xs",
  "@max-sm",
  "@max-md",
  "@max-lg",
  "@max-xl",
  "@max-2xl",
  "@max-3xl",
  "@max-4xl",
  "@max-5xl",
  "@max-6xl",
  "@max-7xl",
  "dark",
  "motion-safe",
  "motion-reduce",
  "contrast-more",
  "contrast-less",
  "forced-colors",
  "inverted-colors",
  "pointer-fine",
  "pointer-coarse",
  "pointer-none",
  "any-pointer-fine",
  "any-pointer-coarse",
  "any-pointer-none",
  "portrait",
  "landscape",
  "noscpae",
  "print",
  "aria-busy",
  "aria-checked",
  "aria-disabled",
  "aria-expanded",
  "aria-hidden",
  "aria-pressed",
  "aria-readonly",
  "aria-required",
  "aria-selected",
  "rtl",
  "ltr",
  "open",
  "starting"
];

const tailwindPrefixSet = new Set(tailwindPrefix);

const code = `const stylesOnStates = {
  hover: "-translate-y-2 text-accent font-bold transition-all",
  focus: "-translate-y-2 text-accent font-bold transition-all ring-2 ring-blue-400",
  md: {
    active: "text-accent",
    "@3xl": "text-accent"
  }
};`;

const code1 = `
export default function InfoCard(
  { data, children }) {
  const infoCardBaseStyle = "flex flex-col gap-2 items-center text-2xl leading-none p-2 shadow-[0_2px_4px_0_#00000042] rounded-sm bg-transparent transition-all";
  const infoCardStyle = {
    hover: "shadow-[0_4px_4px_2px_#0000ff42] -translate-y-2 text-accent font-bold transition-all",
    focus: "shadow-[0_4px_4px_2px_#0000ff42] -translate-y-2 text-accent font-bold transition-all ring-2 ring-blue-400"
  }
  return (
    <Link className={\`\${infoCardBaseStyle} \${appendPrefix(infoCardStyle.hover, "hover")} \${appendPrefix(infoCardStyle.focus, "focus")}\`} href={data.link} target={\`\${data.type === "link" ? "_blank" : ""}\`} rel={\`\${data.type === "link" ? "noopener noreferrer" : ""}\`} download={\`\${data.type === "pdf" ? "최승균_이력서" : false}\`}>
      {children}
      <span>{data.content}</span>
      <span>{data.type === "pdf" ? "다운로드" : "바로가기"}</span>
    </Link>
  )
}`;
const ast = parse(code1);
traverse(ast, {
  VariableDeclarator: {
    enter(path) {
      if (path.container[0].init.type === "ObjectExpression") {
        const flag = path.container[0].init.properties.every(e => isValidProperty(e));
        if (!flag) return;
        appendPrefixToValue(path.container[0].init, []);
      }
    }
  },
})
// generate(ast);

function isValidProperty(propertyNode) {
  let flag = false;
  if (propertyNode.type !== "ObjectProperty") {
    console.log("Node Type is not a <ObjectProperty>.");
    return flag;
  }

  // 프로퍼티의 키의 타입 검사
  const propertyKeyType = propertyNode.key.type
  if (propertyKeyType !== "Identifier" && propertyKeyType !== "StringLiteral") {
    console.log("Key type of property is invalid.")
    return flag;
  }

  // 프로퍼티의 값의 타입 검사
  const propertyValueType = propertyNode.value.type;
  if (propertyValueType !== "StringLiteral" && propertyValueType !== "ObjectExpression" && propertyValueType !== "ArrayExpression") {
    console.log("Value type of property is invalid.")
    return flag;
  }
  // 키가 tailwindCSS의 접두사인지 검사
  flag = tailwindPrefixSet.has(propertyNode.key?.name ?? propertyNode.key.value);

  if (flag && propertyValueType === "ObjectExpression")
    flag = propertyNode.value.properties.every(e => isValidProperty(e));
  if (flag && propertyValueType === "ArrayExpression")
    flag = propertyNode.value.elements.every(e => e.type === "StringLiteral");
  return flag;
}

function appendPrefixToValue(node, prefixArray = []) {
  if (node.type === "ObjectExpression") {
    node.properties.forEach(e => appendPrefixToValue(e));
  } else if (node.type === "ObjectProperty") {
    if (node.value.type === "StringLiteral") {
      node.value = t.stringLiteral(appendPrefix([...prefixArray, node.key?.name ?? node.key.value], node.value.value));
    } else if (node.value.type === "ArrayExpression") {
      node.value = t.stringLiteral(appendPrefix([...prefixArray, node.key?.name ?? node.key.value], node.value.elements.map(e => e.value)));
    } else if (node.value.type === "ObjectExpression") {
      node.value.properties.forEach(e => appendPrefixToValue(e, [...prefixArray, node.key?.name ?? node.key.value]));
    }
  }
}

function appendPrefix(pre, value) {
  let prefix = '';
  if (typeof pre === "string") // 접두사가 문자열일 때
    prefix = pre + ":";
  else { // 접두사가 배열일 때
    prefix = pre.join(":") + ":";
  }

  let result = '';
  if (typeof value === "string") { // 값이 문자열일 때
    result = value.trim().split(" ").map(e => prefix + e).join(" ");
  } else { // 값이 배열일 때
    result = value.map(e => prefix + e).join(" ");
  }
  return result;
}
// console.log(appendPrefix(["a", "b"], "a b c d e f g h"));
// console.log(appendPrefix(["a", "b"], ["a", "b", "c", "d", "e", "f", "g", "h"]));
// console.log(appendPrefix("a", "a b c d e f g h"));
// console.log(appendPrefix("a", ["a", "b", "c", "d", "e", "f", "g", "h"]));


// // const code1 = `function add(a,b){
// //   return a + b;
// // }
// // const stylesOnStates = {
// //   hover: "-translate-y-2 text-accent font-bold transition-all",
// //   focus: "-translate-y-2 text-accent font-bold transition-all ring-2 ring-blue-400",
// //   md: {
// //     active: "text-accent",
// //     "@3xl": "text-accent"
// //   }
// // };
// // `
// // console.log(parser.parse(code1));
// const ast = parser.parse(code);
// // console.log(ast.program);

// traverse(ast, {
//   enter(path) {
//     console.log(path);
//   }
// })
// // const tokens = ast.tokens;
// // console.log(tokens);
// // const keyoftokens = tokens.filter((e, i) => {
// //   if (i < tokens.length) {
// //     if (tokens[i + 1]?.type?.label === ":") {
// //       return tailwindPrefixSet.has(e.value);
// //     }
// //   }
// //   return false;
// // }).map(el => el.value);
// // console.log(keyoftokens);



// // traverse(ast, {
// //   enter(path) {
// //     console.log(path.node.type);
// //   }
// // });
// // traverse(ast, {
// //   enter(path) {
// //     if (
// //       path.node.type === "Identifier" &&
// //       path.node.name === "n"
// //     ) {
// //       path.node.name = "x";
// //     }
// //   }
// // });

// import parser from "@babel/parser";
// import _traverse from "@babel/traverse";
// import { generate } from "@babel/generator";
// const traverse = _traverse.default;

// const code = `function square(n) {
//   return n * n;
// }`;

// const ast = parser.parse(code);

// traverse(ast, {
//   enter(path) {
//     if (
//       path.node.type === "Identifier" &&
//       path.node.name === "n"
//     ) {
//       path.node.name = "x";
//     }
//   }
// });
// const newCode = generate(ast);
// console.log(newCode);


// import { parse } from "@babel/parser";
// import { generate } from "@babel/generator";

// const code = "class Example {}";
// const ast = parse(code);

// const output = generate(
//   ast
// );
// console.log(output);