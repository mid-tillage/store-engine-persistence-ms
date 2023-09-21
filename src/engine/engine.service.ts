import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DimProcess } from 'src/entities/dim-process.entity';
import { DimTransactionType } from 'src/entities/dim-transaction-type.entity';
import { FactWorkflow } from 'src/entities/fact-workflow.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EngineService {
    private readonly logger = new Logger(EngineService.name);

    // public static processes: DimProcess[] = [];
    // public static transactionTypes: DimTransactionType[] = [];

    constructor(
        @InjectRepository(FactWorkflow) private workflowRepository: Repository<FactWorkflow>,
        @InjectRepository(DimTransactionType) private transactionTypeRepository: Repository<DimTransactionType>,
        @InjectRepository(DimProcess) private processRepository: Repository<DimProcess>
    ) { }

    async persistEvent(payload: any) {
        this.logger.debug({ payload });
        const transactionTypes = await this.transactionTypeRepository.find();
        const processes = await this.processRepository.find();
        this.logger.debug({
            transactionTypes,
            processes
        })
        const transactionType = transactionTypes.filter(transactionType => transactionType.code == 1)[0];
        const process = processes.filter(process => process.code == payload.processCode)[0];
        // const transactionType = EngineService.transactionTypes.filter(transactionType => transactionType.code == 1)[0];
        // const process = EngineService.processes.filter(process => process.code == payload.processCode)[0];
        this.logger.debug({
            transactionType,
            process
        });
        const workflow: FactWorkflow = {
            idWorkflow: undefined,
            creationDate: undefined,
            senderIp: undefined,
            searchToken: undefined,
            request: payload.request,
            response: payload.response,
            idProcess: process,
            idTransactionType: transactionType
        };
        this.workflowRepository.save(workflow);
    }

    // async loadProcessesAndTransactionTypes() {
    //     EngineService.processes = await this.processRepository.find();
    //     EngineService.transactionTypes = await this.transactionTypeRepository.find();
    // }
}
