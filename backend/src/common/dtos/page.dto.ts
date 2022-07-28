import { PageMetaDTO } from './pageMeta.dto';

export class PageDTO<T> {
  readonly data: T[];
  readonly meta: PageMetaDTO;

  constructor(data: T[], meta: PageMetaDTO) {
    this.data = data;
    this.meta = meta;
  }
}
