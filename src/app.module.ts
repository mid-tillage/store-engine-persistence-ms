import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EngineController } from './engine/engine.controller';
import { EngineService } from './engine/engine.service';
import { DimProcess } from './entities/dim-process.entity';
import { DimTransactionType } from './entities/dim-transaction-type.entity';
import { FactWorkflow } from './entities/fact-workflow.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        schema: 'engine',
        synchronize: true,
        logging: true,
        autoLoadEntities: true,
      }),
    }),
    TypeOrmModule.forFeature([FactWorkflow, DimProcess, DimTransactionType])
  ],
  controllers: [AppController, EngineController],
  providers: [AppService, EngineService],
})
export class AppModule { }
