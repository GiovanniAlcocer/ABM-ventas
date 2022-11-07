import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginAuthDto } from 'src/dto/login-auth.dto';
import { RegisterAuthDto } from 'src/dto/register-auth.dto';
import { UserEntity } from 'src/persistence/entities/user.entity';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { AppDataSource } from 'src/data-source';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity, 'postgres')
    private userRepository: Repository<UserEntity>,
    private jwtSevice: JwtService,
  ) {}

  public async register(data: RegisterAuthDto) {
    const { password } = data;
    const passHashed = await hash(password, 10);
    const newUser: UserEntity = new UserEntity();
    newUser.name = data.name;
    newUser.username = data.username;
    newUser.password = passHashed;
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const response = await queryRunner.manager.save(newUser);
      await queryRunner.commitTransaction();
      return response;
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        'Hubo un problema',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  public async login(data: LoginAuthDto) {
    const { username, password } = data;
    const findUser = await this.userRepository.findOneBy({
      username: username,
    });
    if (!findUser) throw new HttpException('USER_NOT_FOUND', 404);
    const checkPassword = await compare(password, findUser.password);
    if (!checkPassword) throw new HttpException('PASSWORD_INCORRECT', 403);
    const payload = { id: findUser.id, username: findUser.username };
    const token = await this.jwtSevice.sign(payload);
    return { message: 'Login successful', user: findUser, token };
  }
}
