import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FactWorkflow } from './entities/fact-workflow.entity';
import { Repository } from 'typeorm';
import { DimTransactionType } from './entities/dim-transaction-type.entity';
import { DimProcess } from './entities/dim-process.entity';

@Injectable()
export class AppService {

  getHello(): string {
      return 'Hello World!';
  }
}
