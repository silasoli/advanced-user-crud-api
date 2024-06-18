import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Index({ unique: true })
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  access_token: string;

  @Column({ nullable: true })
  refresh_token: string;

  @Column({ nullable: true })
  role: string;

  @Column({ nullable: true })
  expires_at: Date;

  @Column({ default: false })
  active: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updated_at: Date;
}
