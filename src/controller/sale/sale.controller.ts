import { Body, Controller, Get, Post } from '@nestjs/common';
import { SaleDto } from 'src/dto/sale.dto';
import { SaleService } from 'src/service/sale/sale.service';
import { AppDataSource } from "src/data-source"

@Controller('sale')
export class SaleController {

    constructor(private saleService: SaleService) {
    }

    @Post()
    saveSale(@Body() saleData: SaleDto){
        return this.saleService.saveSale(saleData)
    }


}
