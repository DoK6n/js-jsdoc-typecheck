# react-jsdoc-typecheck

### JS 기반인 React에서 jsdoc과 ts파일을 통해 타입 체크하며 개발하는 방법을 소개합니다.

project 최상단에 [jsconfig.json](https://code.visualstudio.com/docs/languages/jsconfig) 파일을 생성합니다.

> 파일 범위 - jsconfig.json 없음 : 이 모드에서는 Visual Studio Code에서 열린 JavaScript 파일이 독립 단위로 처리됩니다. `a.js`파일이 파일을 명시적으로 참조하지 않는 한 `b.ts`( CommonJS 모듈 사용 import또는 CommonJS 모듈 사용 ) 두 파일 간에 공통 프로젝트 컨텍스트가 없습니다.
>
> 명시적 프로젝트 - jsconfig.json 포함 : JavaScript 프로젝트는 jsconfig.json파일을 통해 정의됩니다. 디렉토리에 이러한 파일이 있으면 해당 디렉토리가 JavaScript 프로젝트의 루트임을 나타냅니다.

`*.d.ts` 파일을 생성하여 타입을 지정합니다.

```ts
// project/src/types/account.d.ts
declare namespace Account {
  interface User {
    id: string;
    name: string;
    age: number;
    posts: string[];
  }
}

// project/src/pages/user/index.jsx
/** @type {Account.User} */
const user = { id: 'u1', age: 35, name: 'Jone Doe', posts: ['p1'] };

// project/jsconfig.json
{
}
```

`jsconfig.json` 파일을 사용하면, 해당 프로젝트에서 JavaScript 파일을 TypeScript와 같은 강력한 정적 타이핑 기능을 사용할 수 있습니다. `jsconfig.json` 파일을 작성하면, VS Code는 프로젝트 내의 JavaScript 파일에서 TypeScript와 동일한 구문 분석 규칙을 사용하여 코드를 분석합니다.

따라서, `jsconfig.json` 파일이 있으면, JSDoc 주석 내부의 TypeScript 타입 선언이 프로젝트 전체에서 사용 가능해집니다.

## jsconfig.json - checkJS

```json
{
  "compilerOptions": {
    "checkJs": true
  }
}
```

또, jsconfig.json 옵션에 `checkJs: true`옵션을 주면 프로젝트 파일 상단에 `// @ts-check` 를 추가한 것 같은 효과를 주어 전역에서 타입체크를 할 수 있습니다.
