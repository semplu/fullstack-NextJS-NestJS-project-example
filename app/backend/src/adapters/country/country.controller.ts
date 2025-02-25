import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCountryDto } from '../../core/use-cases/country/dto/create-country.dto';
import { UpdateCountryDto } from '../../core/use-cases/country/dto/update-country.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CountryServiceAdapter } from './country.service.adapter';

@ApiTags('countries')
@Controller('countries')
@UseGuards(JwtAuthGuard)
export class CountryController {
  constructor(private readonly countryService: CountryServiceAdapter) {}

  @Get()
  @ApiOperation({ summary: 'Get list of countries with pagination' })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number (default: 1)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Items per page (default: 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'List of countries',
    type: [Object],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(@Query('page') page = 1, @Query('limit') limit = 5) {
    return this.countryService.getCountries(page, limit);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new country' })
  @ApiBody({ type: CreateCountryDto })
  @ApiResponse({
    status: 201,
    description: 'Country created successfully',
    type: Object,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async create(@Request() req, @Body() createCountryDto: CreateCountryDto) {
    return this.countryService.createCountry(req.user, createCountryDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an existing country' })
  @ApiParam({ name: 'id', description: 'Country ID', type: String })
  @ApiBody({ type: UpdateCountryDto })
  @ApiResponse({
    status: 200,
    description: 'Country updated successfully',
    type: Object,
  })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    try {
      return await this.countryService.updateCountry(
        req.user.id,
        id,
        updateCountryDto,
      );
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a country' })
  @ApiParam({ name: 'id', description: 'Country ID', type: String })
  @ApiResponse({ status: 200, description: 'Country deleted successfully' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @ApiResponse({ status: 404, description: 'Not Found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async delete(@Request() req, @Param('id') id: string) {
    try {
      await this.countryService.deleteCountry(req.user.id, id);
      return { message: 'Country deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.FORBIDDEN);
    }
  }
}
