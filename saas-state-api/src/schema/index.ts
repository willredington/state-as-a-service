export interface SchemaFactory<T = any> {
  generate(): T;
}
