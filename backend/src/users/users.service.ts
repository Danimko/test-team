import { Injectable } from '@nestjs/common';
import { database } from '../db/db';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  findAll() {
    return database;
  }

  async findByData(userDto: UserDto) {
    return new Promise((resolve) => {
      setTimeout(() => {
        for (let i = 0; i < database.length; i++) {
          if (
            (database[i].email === userDto?.email &&
              +database[i].number === +userDto?.number) ||
            database[i].email === userDto?.email
          ) {
            resolve(database[i]);
          }
        }
        resolve('не найдено');
      }, 5000);
    });
  }
}
