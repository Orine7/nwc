import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1628301791518 implements MigrationInterface {
  name = "createTables1628301791518";

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
                "PRIVADO" boolean NOT NULL,
                "INCOMPLETO" boolean NOT NULL,
                "TICKET_MEDIO" decimal,
                "TICKET_DA_ULTIMA_COMPRA" decimal,
                "DATA_DA_ULTIMA_COMPRA" TIMESTAMP,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "most_bought_company_cnpj" character varying,
                "last_bought_company_cnpj" character varying,
                CONSTRAINT "PK_25d6e5ed1cc5cb35df07cf4f84e" PRIMARY KEY ("CPF")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_611435dcd2f7052b879c9c902a2" FOREIGN KEY ("most_bought_company_cnpj") REFERENCES "company"("CNPJ") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "user"
            ADD CONSTRAINT "FK_9e28ab00cf6f2b75ddd02b8edad" FOREIGN KEY ("last_bought_company_cnpj") REFERENCES "company"("CNPJ") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_9e28ab00cf6f2b75ddd02b8edad"
        `);
    await queryRunner.query(`
            ALTER TABLE "user" DROP CONSTRAINT "FK_611435dcd2f7052b879c9c902a2"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TABLE "company"
        `);
  }
}
