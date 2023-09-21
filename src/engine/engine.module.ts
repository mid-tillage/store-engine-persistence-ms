import { Module } from '@nestjs/common';
import { EngineController } from './engine.controller';
import { EngineService } from './engine.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DimProcess } from 'src/entities/dim-process.entity';
import { DimTransactionType } from 'src/entities/dim-transaction-type.entity';
import { FactWorkflow } from 'src/entities/fact-workflow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FactWorkflow, DimProcess, DimTransactionType])],
  controllers: [EngineController],
  providers: [EngineService]
})
export class EngineModule {}
