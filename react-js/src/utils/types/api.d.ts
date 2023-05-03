declare namespace API {
  interface Response<T> {
    totalCount: number;
    items: T[];
  }
}
