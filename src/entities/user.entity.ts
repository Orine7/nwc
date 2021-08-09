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

  @Column()
  private: boolean;

  @Column()
  unfinished: boolean;

  @Column({ nullable: true, type: "float" })
  lastPurchaseValue?: number;

  @Column({ nullable: true, type: "float" })
  meanPurchaseValue?: number;

  @Column({ nullable: true, type: "timestamp" })
  lastPurchaseDate?: Date;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt?: Date;

  //Relations
  @ManyToOne(() => Company, (company) => company.CNPJ)
  mostBoughtCompany?: string;

  @ManyToOne(() => Company, (company) => company.CNPJ)
  lastBoughtCompany?: string;

  constructor(data: {
    CPF: string;
    isPrivate: string;
    unfinished: string;
    lastPurchaseValue: string;
    meanPurchaseValue: string;
    lastPurchaseDate: string;
    mostBoughtCompany: string;
    lastBoughtCompany: string;
  }) {
    this.CPF = data?.CPF;
    this.private = toBool(data?.isPrivate);
    this.unfinished = toBool(data?.unfinished);

    this.lastPurchaseValue = data?.lastPurchaseValue
      ? parseFloat(data.lastPurchaseValue)
      : undefined;
    this.meanPurchaseValue = data?.meanPurchaseValue
      ? parseFloat(data.meanPurchaseValue)
      : undefined;
    this.lastPurchaseDate = data?.lastPurchaseDate
      ? new Date(data.lastPurchaseDate)
      : undefined;

    this.mostBoughtCompany = data?.mostBoughtCompany;
    this.lastBoughtCompany = data?.lastBoughtCompany;
  }
}

// Helper functions

function toBool(value: string | number | null): boolean {
  return !!parseInt(value?.toString() ?? "0");
}
