# react-jsdoc-typecheck

JS 기반인 React에서 jsdoc과 ts파일을 통해 타입 체크하며 개발하는 방법을 소개합니다.

## js-typecheck-example

tsconfig.json과 declare namespace 그리고 Triple-Slash Directives를 이용하면 간결하고 쉽게 바닐라 JS 프로젝트에 Type을 적용할 수 있습니다.

또, glob을 이용하여 프로젝트의 src 폴더 하위에 모든 types 폴더에 있는 d.ts 파일을 읽고,  
프로젝트 최상단에 types 폴더 내부에 Triple-Slash Directives 주석 생성을 자동화 하고,  
npm pre 명령어로 자동으로 자동화 함수를 생성하도록 구현할 수 있습니다.
