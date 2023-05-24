const { ERROR } = require('./constants');
const { ReadonlyException } = require('./exception');

function readonly(obj) {
  // 객체가 null이거나 기본 타입인 경우는 더 이상 처리할 필요가 없음
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 프록시를 사용하여 읽기 전용으로 만든 객체 또는 배열을 반환
  return new Proxy(obj, {
    get: (target, prop, receiver) => {
      // 프록시 객체의 속성에 접근할 때 호출
      const value = Reflect.get(target, prop, receiver);
      return readonly(value); // 재귀적으로 객체의 속성들을 읽기 전용으로 만듦
    },
    set: () => {
      new ReadonlyException(ERROR.READ_ONLY.NOT_ALLOW_MODIFY);
    }, // 프록시 객체의 속성에 값을 할당할 때 호출
    defineProperty: () => {
      new ReadonlyException(ERROR.READ_ONLY.NOT_ALLOW_DEFINE_PROPERTY);
    }, // 프록시 객체의 속성에 대한 정의를 변경할때 호출
    deleteProperty: () => {
      new ReadonlyException(ERROR.READ_ONLY.NOT_ALLOW_DELETE_PROPERTY);
    }, // 프록시 객체의 속성을 삭제할 때 호출
    preventExtensions: () => {
      new ReadonlyException(ERROR.READ_ONLY.NOT_ALLOW_PREVENT_EXTENSIONS);
    }, // 프록시 객체에 대한 확장을 막을 때 호출
    setPrototypeOf: () => {
      new ReadonlyException(ERROR.READ_ONLY.NOT_ALLOW_MODIFY_PROTOTYPE);
    }, // 프록시 객체의 프로토타입을 설정할때 호출
  });
}

module.exports = {
  readonly,
};
