import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngineModule } from './engine/engine.module';
import { EngineController } from './engine/engine.controller';
import { EngineService } from './engine/engine.service';
import { DimProcess } from './entities/dim-process.entity';
import { DimTransactionType } from './entities/dim-transaction-type.entity';
import { FactWorkflow } from './entities/fact-workflow.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'sale-management-system',
      schema: 'engine',
      synchronize: false,
      logging: true,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([FactWorkflow, DimProcess, DimTransactionType])
  ],
  controllers: [AppController, EngineController],
  providers: [AppService, EngineService],
})
export class AppModule { }
