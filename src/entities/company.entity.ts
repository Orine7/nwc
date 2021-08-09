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

  @Column({ nullable: true })
  name?: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt?: Date;

  constructor(data: { cnpj: string; name?: string }) {
    this.CNPJ = data?.cnpj;
    this.name = data?.name;
  }
}
