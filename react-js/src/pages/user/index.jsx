/** @type {Account.User} */
const user = { id: 'u1', age: 35, name: 'Jone Doe', posts: ['p1'] };

/** @type {Blog.Post} */
const post = {
  id: 'p1',
  title: 'Using JSDoc and declare namespace to Simplify Types in React JS',
  author: 'Jone Doe',
  tag: ['react', 'jsdoc', 'typescript'],
  content: `
  Let's explore how to apply types to vanilla JS projects easily and concisely using tsconfig.json, declare namespace, and Triple-Slash Directives. 
  
  We will also automate the generation of Triple-Slash Directives comments inside the types folder at the project root by reading d.ts files inside the types folder using glob.
  `,
  likes: {
    count: 2,
    list: [
      { id: '1', postId: 'p1', userId: 'u98' },
      { id: '2', postId: 'p1', userId: 'u43' },
    ],
  },
};

function User() {
  return <div>User</div>;
}

export default User;
