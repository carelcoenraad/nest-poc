import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) {}

  public async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  public async findOne(id: User['id']): Promise<User> {
    return this.userRepository.findOne(id);
  }

  public async updateUser(id: User['id'], user: User): Promise<UpdateResult> {
    // TODO: Optimize find and update queries
    const existingUser = await this.userRepository.findOne(id);

    if (!existingUser) {
      return null;
    }

    return this.userRepository.update(id, user);
  }

  public async deleteUser(id: User['id']): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if (!user) {
      return null;
    }

    return this.userRepository.remove(user);
  }
}
