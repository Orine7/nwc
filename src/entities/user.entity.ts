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

  @Column({ name: "PRIVADO" })
  private: boolean;

  @Column({ name: "INCOMPLETO" })
  unfinished: boolean;

  @Column({ name: "TICKET_MEDIO", nullable: true })
  lastPurchaseValue?: number;

  @Column({ name: "TICKET_DA_ULTIMA_COMPRA", nullable: true })
  meanPurchaseValue?: number;

  @Column({ name: "DATA_DA_ULTIMA_COMPRA", nullable: true })
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
