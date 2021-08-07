import { MigrationInterface, QueryRunner } from "typeorm";

export class createDB1628294529452 implements MigrationInterface {
  name = "createDB1628294529452";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "company" (
                "CNPJ" character varying NOT NULL,
                "NOME" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_5568805c9a2b6df7446c0b10035" PRIMARY KEY ("CNPJ")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "CPF" character varying NOT NULL,
                "INCOMPLETO" boolean NOT NULL,
                "TICKET_MEDIO" integer,
                "TICKET_DA_ULTIMA_COMPRA" integer,
                "DATA_DA_ULTIMA_COMPRA" TIMESTAMP,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_25d6e5ed1cc5cb35df07cf4f84e" PRIMARY KEY ("CPF")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "LOJA_MAIS_FREQUENTE" (
                "user_cpf" character varying NOT NULL,
                "company_cnpj" character varying NOT NULL,
                CONSTRAINT "PK_16f2d09a0f6e412b72d6bcad989" PRIMARY KEY ("user_cpf", "company_cnpj")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_da8c81a1bc102aa9d74303e25f" ON "LOJA_MAIS_FREQUENTE" ("user_cpf")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_b73aa1f9d43be70e1e1df17f3e" ON "LOJA_MAIS_FREQUENTE" ("company_cnpj")
        `);
    await queryRunner.query(`
            CREATE TABLE "LOJA_DA_ULTIMA_COMPRA" (
                "user_cpf" character varying NOT NULL,
                "company_cnpj" character varying NOT NULL,
                CONSTRAINT "PK_e337e11a624033d23325d2c3ea9" PRIMARY KEY ("user_cpf", "company_cnpj")
            )
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_f913217c1bbc5afdadc9d8ab53" ON "LOJA_DA_ULTIMA_COMPRA" ("user_cpf")
        `);
    await queryRunner.query(`
            CREATE INDEX "IDX_258a1c4972aa27933f415621f3" ON "LOJA_DA_ULTIMA_COMPRA" ("company_cnpj")
        `);
    await queryRunner.query(`
            ALTER TABLE "LOJA_MAIS_FREQUENTE"
            ADD CONSTRAINT "FK_da8c81a1bc102aa9d74303e25f8" FOREIGN KEY ("user_cpf") REFERENCES "user"("CPF") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "LOJA_MAIS_FREQUENTE"
            ADD CONSTRAINT "FK_b73aa1f9d43be70e1e1df17f3e7" FOREIGN KEY ("company_cnpj") REFERENCES "company"("CNPJ") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "LOJA_DA_ULTIMA_COMPRA"
            ADD CONSTRAINT "FK_f913217c1bbc5afdadc9d8ab53b" FOREIGN KEY ("user_cpf") REFERENCES "user"("CPF") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE "LOJA_DA_ULTIMA_COMPRA"
            ADD CONSTRAINT "FK_258a1c4972aa27933f415621f39" FOREIGN KEY ("company_cnpj") REFERENCES "company"("CNPJ") ON DELETE CASCADE ON UPDATE CASCADE
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "LOJA_DA_ULTIMA_COMPRA" DROP CONSTRAINT "FK_258a1c4972aa27933f415621f39"
        `);
    await queryRunner.query(`
            ALTER TABLE "LOJA_DA_ULTIMA_COMPRA" DROP CONSTRAINT "FK_f913217c1bbc5afdadc9d8ab53b"
        `);
    await queryRunner.query(`
            ALTER TABLE "LOJA_MAIS_FREQUENTE" DROP CONSTRAINT "FK_b73aa1f9d43be70e1e1df17f3e7"
        `);
    await queryRunner.query(`
            ALTER TABLE "LOJA_MAIS_FREQUENTE" DROP CONSTRAINT "FK_da8c81a1bc102aa9d74303e25f8"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_258a1c4972aa27933f415621f3"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_f913217c1bbc5afdadc9d8ab53"
        `);
    await queryRunner.query(`
            DROP TABLE "LOJA_DA_ULTIMA_COMPRA"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_b73aa1f9d43be70e1e1df17f3e"
        `);
    await queryRunner.query(`
            DROP INDEX "IDX_da8c81a1bc102aa9d74303e25f"
        `);
    await queryRunner.query(`
            DROP TABLE "LOJA_MAIS_FREQUENTE"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TABLE "company"
        `);
  }
}
