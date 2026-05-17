import { ROLE_ENUM } from "@/core/constants";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ 
    type: "varchar", 
    length: 255, 
    nullable: false, 
    unique: true 
  })
  name: string;

  @Column({ 
    type: "varchar", 
    length: 255, 
    nullable: false, 
    unique: true 
  })
  email: string;

  @Column({ 
    type: "date", 
    nullable: false, 
    unique: false, 
  })
  birthDate: string;

  @Column({ 
    type: "varchar", 
    length: 14, 
    nullable: false, 
    unique: false 
  })
  phone: string;

  @Column({ 
    type: "text", 
    nullable: false, 
    unique: false 
  })
  password_hash: string;

  @Column({ 
    type: "text", 
    nullable: true, 
    unique: false, 
  })
  avatar_url?: string;

  @Column({
    type: "enum",
    enum: ROLE_ENUM,
    unique: false,
    nullable: false,
    default: ROLE_ENUM.SELLER
  })
  role: string;

  @Column({
    type: "boolean",
    nullable: false,
    unique: false,
    default: false,
  })
  isActived: boolean;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn({ nullable: true })
  updated_at?: string;

  @DeleteDateColumn({ nullable: true })
  deleted_at?: string;
}
