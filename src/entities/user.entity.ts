// CPF
// PRIVATE
// INCOMPLETO
// DATA DA ÚLTIMA COMPRA
// TICKET MÉDIO
// TICKET DA ÚLTIMA
// COMPRA LOJA MAIS FREQUÊNTE
// LOJA DA ÚLTIMA COMPRA

import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
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
  lastPurchaseValue: number;

  @Column({ name: "TICKET_DA_ULTIMA_COMPRA", nullable: true })
  meanPurchaseValue: number;

  @Column({ name: "DATA_DA_ULTIMA_COMPRA", nullable: true })
  lastPurchaseDate: Date;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  //Relations
  @ManyToMany(() => Company)
  @JoinTable({ name: "LOJA_MAIS_FREQUENTE" })
  mostBoughtCompany: Company[];

  @ManyToMany(() => Company)
  @JoinTable({ name: "LOJA_DA_ULTIMA_COMPRA" })
  lastBoughtCompany: Company[];

  constructor(
    CPF: string,
    isPrivate: boolean,
    unfinished: boolean,
    lastPurchaseValue: number,
    meanPurchaseValue: number,
    lastPurchaseDate: Date,
    mostBoughtCompany: Company[],
    lastBoughtCompany: Company[]
  ) {
    this.CPF = CPF;
    this.private = isPrivate;
    this.unfinished = unfinished;
    this.lastPurchaseValue = lastPurchaseValue;
    this.meanPurchaseValue = meanPurchaseValue;
    this.lastPurchaseDate = lastPurchaseDate;
    this.mostBoughtCompany = mostBoughtCompany;
    this.lastBoughtCompany = lastBoughtCompany;
  }
}
