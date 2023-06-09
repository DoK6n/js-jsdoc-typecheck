/** @type {Database.Users[]} */
export const users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' },
  { id: 3, name: 'John Smith' },
];

export const asyncUsers = () =>
  new Promise(function (resolve, reject) {
    const data = users;
    resolve(data);
  });
