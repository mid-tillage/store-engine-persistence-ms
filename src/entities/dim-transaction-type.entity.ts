import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FactWorkflow } from "./fact-workflow.entity";

@Index("dim_transaction_type_pk", ["idTransactionType"], { unique: true })
@Entity("dim_transaction_type", { schema: "engine" })
export class DimTransactionType {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_transaction_type" })
  idTransactionType: number;

  @Column("integer", { name: "code" })
  code: number;

  @Column("character varying", { name: "name" })
  name: string;

  @OneToMany(
    () => FactWorkflow,
    (factWorkflow) => factWorkflow.idTransactionType
  )
  factWorkflows: FactWorkflow[];
}
