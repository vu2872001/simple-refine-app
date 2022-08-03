import { PageDTO } from '../dtos/page.dto';
import { PageOptionsDTO } from '../dtos/pageOption.dto';

export interface IBaseService<T, CreateData, UpdateData> {
  getAllData(pageOptionsDto: PageOptionsDTO);
  delete(id: number);
  getDataById(id: number);
  create(createData: CreateData);
  update(id: number, updateData: UpdateData);
}
