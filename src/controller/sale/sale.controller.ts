import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { SaleDto } from 'src/dto/sale.dto';
import { SaleService } from 'src/service/sale/sale.service';
import { DetailIdDto } from '../../dto/detailId.dto';
import { IdDetailDto } from '../../dto/idDetail.dto';
import { SaleIdDto } from '../../dto/saleId.dto';

@Controller('sales')
export class SaleController {
  constructor(private saleService: SaleService) {}
  @Post()
  saveSale(@Body() saleData: SaleDto) {
    return this.saleService.saveSale(saleData);
  }

  @Get()
  public async getAllSales() {
    return await this.saleService.getAllSales();
  }
  
  @Get('details')
  public async getAllDetails() {
    return await this.saleService.getAllDetails();
  }

  @Get(':id/detail')
  public async getDetailsBySale(@Param('id', ParseUUIDPipe) id: string) {
    return await this.saleService.getDetailsBySale(id);
  }

  @Post('saleUpdate')
  updateSale(@Body() saleData: SaleIdDto) {
    return this.saleService.updateSale(saleData);
  }

  @Post('detailUpdate')
  updateDetail(@Body() detailData: DetailIdDto) {
    return this.saleService.updateDetail(detailData);
  }

  @Post('detailUpdate2')
  updateDetail2(@Body() detailData: DetailIdDto) {
    return this.saleService.updateDetail2(detailData);
  }

  @Delete()
  deleteDetail(@Body() id: IdDetailDto) {
    return this.saleService.deleteDetail(id);
  }

  @Delete()
  deleteSale(@Body() id: IdDetailDto) {
    return this.saleService.deleteSale(id);
  }
}
