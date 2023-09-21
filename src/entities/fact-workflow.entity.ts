import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DimProcess } from "./dim-process.entity";
import { DimTransactionType } from "./dim-transaction-type.entity";

@Index("fact_workflow_pk", ["idWorkflow"], { unique: true })
@Entity("fact_workflow", { schema: "engine" })
export class FactWorkflow {
  @PrimaryGeneratedColumn({ type: "integer", name: "id_workflow" })
  idWorkflow: number;

  @Column("timestamp without time zone", {
    name: "creation_date",
    default: () => "now()",
  })
  creationDate: Date;

  @Column("inet", { name: "sender_ip", default: () => "inet_client_addr()" })
  senderIp: string;

  @Column("bigint", { name: "search_token", nullable: true })
  searchToken: string | null;

  @Column("json", { name: "request", nullable: true })
  request: object | null;

  @Column("json", { name: "response", nullable: true })
  response: object | null;

  @ManyToOne(() => DimProcess, (dimProcess) => dimProcess.factWorkflows)
  @JoinColumn([{ name: "id_process", referencedColumnName: "idProcess" }])
  idProcess: DimProcess;

  @ManyToOne(
    () => DimTransactionType,
    (dimTransactionType) => dimTransactionType.factWorkflows
  )
  @JoinColumn([
    { name: "id_transaction_type", referencedColumnName: "idTransactionType" },
  ])
  idTransactionType: DimTransactionType;
}
