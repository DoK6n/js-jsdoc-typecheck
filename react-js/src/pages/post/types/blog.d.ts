declare namespace Blog {
  interface Post {
    id: string;
    title: string;
    content: string;
    tag: string[];
    author: string;
    likes: { count: number; list: Like[] };
  }

  interface Like {
    id: string;
    userId: string;
    postId: Pick<Post, 'id'>['id'];
  }
}
