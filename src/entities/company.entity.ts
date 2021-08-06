import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Company {
  @PrimaryColumn()
  CNPJ: string;

  @Column({ nullable: true })
  name: string;

  @CreateDateColumn({ name: "created_at", type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp" })
  updatedAt: Date;

  constructor(CNPJ: string, name: string, createdAt: Date, updatedAt: Date) {
    this.CNPJ = CNPJ;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
