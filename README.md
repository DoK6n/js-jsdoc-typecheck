# js-jsdoc-typecheck

## JS 기반인 React에서 jsdoc과 ts파일을 통해 타입 체크하며 개발하는 방법을 소개합니다.

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

<br>

---

<br>

## TS에서 `any`, `unknown`, `never` Type 차이

### `any`

- 타입검사 항상 만족
- 의도치 않은 사이드 이펙트 발생할 수 있음 _(의도치 않은 형 변환이나 전혀 예상하지 못한 의도되지 않은 타입의 값이 대입되는 등)_

> ```ts
> let a: any;
> a = 123; // a에 숫자 할당
>
> let str: string = a; // string = any 이므로 에러 발생하지 않음.
>
> a = {}; //na에 object 할당
> const b = a - 1; // 에러 발생하지 않음
> ```

### `unknown`

- unknown 타입엔 모든 자료 다 집어넣을 수 있음
- 자료집어넣어도 타입은 그대로 unknown이다.
- 모든 타입의 공통적인 연산밖에 할 수 없음

> ```ts
> let a: unknown;
> a = 123;
>
> let str: string = a; // 🚨Error. 타입이 지정된 변수에 할당 못함
> const b = a - 1; // 🚨Error. - 는 number에 대한 연산이므로 안됨.
>
> // 할당하기 위해서는 아래와 같이 타입을 명시필요.
> let str2: string = a as string;
> ```

### `never`

- 모든 타입의 하위 타입
- never 타입에는 할당 못함.

> _**특정 타입 값을 할당 받지 못하게 할때**_
>
> - T가 string이면 never를 반환해서 NonString 타입을 사용하는 변수에 string타입이 올 경우 문제를 발생시킴
>
> ```ts
> type NonString<T> = T extends string ? never : T;
>
> const a: NonString<number> = 1; //ok
> const b: NonString<boolean> = true; // ok
> const c: NonString<string> = '1'; //🚨Error.
> ```

<br>

---

<br>

# Reference

> - [벨로그 @jiseon-han.log - 타입스크립트 간단 정리 - `any`, `unknown`, `never`](https://velog.io/@jiseon-han/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EA%B0%84%EB%8B%A8-%EC%A0%95%EB%A6%AC-any-unknown-never)
> - ChatGPT
> - [VScode Docs](https://code.visualstudio.com/docs/languages/jsconfig)
