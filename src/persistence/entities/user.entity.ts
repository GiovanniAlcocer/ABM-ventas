import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'password' })
  password: string;
}
