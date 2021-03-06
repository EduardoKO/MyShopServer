import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  family: string;

  @Column()
  name: string;

  @Column()
  size: string;

  @Column()
  box: number;

  @Column()
  lote:number;

  @Column()
  amount: number;

  @Column()
  joint:string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Product;
