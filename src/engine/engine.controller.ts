import { Controller } from '@nestjs/common';
import { EngineService } from './engine.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateProductEvent } from 'src/events/create-product.event';

@Controller()
export class EngineController {
    constructor(private readonly engineService: EngineService) {}

    @EventPattern('event')
    handleProduct(payload: any) {
        this.engineService.persistEvent(payload);
    }
}
