import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { isCnpj } from "../helper/document.validator";

@Entity()
export class Company {
  @PrimaryColumn({ name: "CNPJ", unique: true })
  @isCnpj({ message: "CNPJ inválido!" })
  CNPJ: string;

  @Column({ name: "nome", nullable: true })
  name?: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt?: Date;
}
