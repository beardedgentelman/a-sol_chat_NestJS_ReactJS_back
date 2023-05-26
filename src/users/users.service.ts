import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: CreateUserDto) {
    return this.userRepository.save(dto);
  }

  async updateOne(id: number, dto: UserEntity) {
    return this.userRepository.update(id, dto);
  }

  async uploadFile(file: Express.Multer.File, id: number) {
    const user = await this.userRepository.findOneBy({ id: id });

    user.userAvatar = `data:image/png;base64,${file.buffer.toString('base64')}`;
    await this.userRepository.save(user);

    return user;
  }
}
