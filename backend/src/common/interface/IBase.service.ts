import { PageDTO } from '../dtos/page.dto';
import { PageOptionsDTO } from '../dtos/pageOption.dto';

export interface IBaseService<T, CreateData, UpdateData> {
  getAllData(pageOptionsDto: PageOptionsDTO): Promise<PageDTO<T>>;
  delete(id: number): Promise<boolean>;
  getDataById(id: number): Promise<T>;
  create(createData: CreateData): Promise<T>;
  update(id: number, updateData: UpdateData): Promise<T>;
}
