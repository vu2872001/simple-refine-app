export class PageOptionsDTO {
  readonly page?: number;
  readonly take?: number;
  // readonly where?: object;
  // readonly order?: object;

  constructor(
    page?: number,
    take?: number,
    // order?: object
    // where?: object
  ) {
    this.page = page | 1;
    this.take = take | 20;
    // this.where = where;
    // this.order = order;
  }
}
