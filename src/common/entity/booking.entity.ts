import { CreateDateColumn, ManyToOne, UpdateDateColumn } from 'typeorm';
// src/book/entities/stock.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookedByName: string;

  @Column()
  bookedByEmail: string;
  
  @Column()
  paymentAmount: number;
  
  @ManyToOne(() => Book) 
  @JoinColumn()
  book: Book;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

}
