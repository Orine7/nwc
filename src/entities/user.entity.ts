import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { isCpf } from "../helper/document.validator";
import { Company } from "./company.entity";

@Entity()
export class User {
  @PrimaryColumn({ name: "CPF", unique: true })
  @isCpf({ message: "CPF inválido!" })
  CPF: string;

  @Column({ name: "privado" })
  private: boolean;

  @Column({ name: "incompleto" })
  unfinished: boolean;

  @Column({ name: "ticket_medio", nullable: true })
  lastPurchaseValue?: number;

  @Column({ name: "ticket_da_ultima_compra", nullable: true })
  meanPurchaseValue?: number;

  @Column({ name: "data_da_ultima_compra", nullable: true })
  lastPurchaseDate?: Date;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt?: Date;

  //Relations
  @ManyToOne(() => Company, (company) => company.CNPJ)
  mostBoughtCompany?: Company;

  @ManyToOne(() => Company, (company) => company.CNPJ)
  lastBoughtCompany?: Company;
}
