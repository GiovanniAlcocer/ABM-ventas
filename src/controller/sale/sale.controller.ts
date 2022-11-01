import { Body, Controller, Get, Post } from '@nestjs/common';
import { SaleDto } from 'src/dto/sale.dto';
import { SaleService } from 'src/service/sale/sale.service';
import { DetailIdDto } from '../../dto/detailId.dto';
import { IdDetailDto } from '../../dto/idDetail.dto';
import { SaleIdDto } from '../../dto/saleId.dto';

@Controller('sale')
export class SaleController {
  constructor(private saleService: SaleService) {}
  @Post()
  saveSale(@Body() saleData: SaleDto) {
    return this.saleService.saveSale(saleData);
  }
  @Get('allSales')
  public async getAllSales() {
    return await this.saleService.getAllSales();
  }
  @Get('detail')
  public async getAllDetails() {
    return await this.saleService.getAllDetails();
  }
  @Post('saleUpdate')
  updateSale(@Body() saleData: SaleIdDto) {
    return this.saleService.updateSale(saleData);
  }
  @Post('detailUpdate')
  updateDetail(@Body() detailData: DetailIdDto) {
    return this.saleService.updateDetail(detailData);
  }
  @Post('deleteDetail')
  deleteDetail(@Body() id: IdDetailDto) {
    return this.saleService.deleteDetail(id);
  }
  @Post('deleteSale')
  deleteSale(@Body() id: IdDetailDto) {
    return this.saleService.deleteSale(id);
  }
}
