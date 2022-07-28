// import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { DataSource, DeleteResult, Repository } from 'typeorm';
// import { CreateTaskDto } from './dto/create-task.dto';
// import { TaskStatus } from './task-status.enum';
// import { Task } from './task.entity';

// @Injectable()
// export abstract class TasksRepository<T> extends Repository<T> {
//   // protected readonly tasksRepository: Repository<Task>;

//   // constructor(@InjectRepository(Task) private readonly tasksRepository: Repository<Task>) {
//   // }

//   constructor(private dataSource: DataSource) {
//     super(deadjoke, dataSource.createEntityManager());
//   }
// }
