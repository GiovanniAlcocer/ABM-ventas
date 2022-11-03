import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { SaleDto } from 'src/dto/sale.dto';
import { SaleService } from 'src/service/sale/sale.service';
import { DetailIdDto } from '../../dto/detailId.dto';
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

  @Put('update')
  updateSale(@Body() saleData: SaleIdDto) {
    return this.saleService.updateSale(saleData);
  }

  @Put('detail/update')
  updateDetail(@Body() detailData: DetailIdDto) {
    return this.saleService.updateDetail(detailData);
  }

  @Put('detail/update2')
  updateDetail2(@Body() detailData: DetailIdDto) {
    return this.saleService.updateDetail2(detailData);
  }

  @Delete('detail/:id')
  public async deleteDetail(@Param('id', ParseUUIDPipe) id: string) {
    return await this.saleService.deleteDetail(id);
  }

  @Delete(':id')
  public async deleteSale(@Param('id', ParseUUIDPipe) id: string) {
    return await this.saleService.deleteSale(id);
  }
}
