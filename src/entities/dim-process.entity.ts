import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { FactWorkflow } from "./fact-workflow.entity";

@Index("dim_process_pk", ["idProcess"], { unique: true })
@Entity("dim_process", { schema: "engine" })
export class DimProcess {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_process" })
  idProcess: number;

  @Column("character varying", { name: "name" })
  name: string;

  @Column("integer", { name: "code" })
  code: number;

  @Column("character varying", { name: "url", nullable: true })
  url: string | null;

  @OneToMany(() => FactWorkflow, (factWorkflow) => factWorkflow.idProcess)
  factWorkflows: FactWorkflow[];
}
