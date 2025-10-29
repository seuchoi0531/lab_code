import { parse } from "@babel/parser";

const code = `const stylesOnStates = {
  hover: "-translate-y-2 text-accent font-bold transition-all",
  focus: "-translate-y-2 text-accent font-bold transition-all ring-2 ring-blue-400",
  md: {
    active: "text-accent",
    "@3xl": "text-accent"
  }
};`;

// 코드 조각을 파싱하여 AST로 분석
const ast = parse(code);

// 객체의 properties 중 필요 없는 속성 제거
const properties = ast.program.body[0].declarations[0].init.properties;
const newPropertiesArr = deleteUnnecessaryProperty(properties);

// md의 value 출력
const mdValue = newPropertiesArr[2].value.properties;
const newMdValue = deleteUnnecessaryProperty(mdValue);
console.log(newMdValue);

function deleteUnnecessaryProperty(property) {
  return property.map(e => {
    // properties를 구조 분해 할당을 이용하여 필요 없는 속성 제거
    let { start, end, loc, method, computed, shorthand, ...restProp } = e;
    return restProp;
  }).map(el => {
    // key 노드와 value 노드의 위치 속성 제거
    delete el.key.start; delete el.key.end; delete el.key.loc;
    delete el.value.start; delete el.value.end; delete el.value.loc;
    return el;
  });
}
