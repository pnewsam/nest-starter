import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  text: string;

  @Column({
    default: false,
  })
  completed: boolean;
}
