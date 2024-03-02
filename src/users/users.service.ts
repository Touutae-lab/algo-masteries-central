import { Inject, Injectable } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { DatabaseConnection } from 'src/db/db.module';
import {users} from './entities/user.entity';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  constructor(@Inject(DatabaseConnection ) private db: PostgresJsDatabase) {}
  findAll() {
    return this.db.select().from(users).execute();
  }

  findOne(id: number) {
    return this.db.select({id: users.id}).from(users).where(eq(users.id, id)).execute();
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
