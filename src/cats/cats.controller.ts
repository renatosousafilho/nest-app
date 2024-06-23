import { Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { CatsService } from './cats.service';
import { Public } from 'src/decoratos/public.decorator';

@Controller('cats')
export class CatsController {
  private catsService: CatsService;

  constructor(
    @Inject('CatsService')
    catsService: CatsService,
  ) {
    this.catsService = catsService;
  }

  @Get()
  // @Public()
  async findAll() {
    return this.catsService.findAll();
  }

  @Post()
  async create(@Res() res: Response, @Req() req: Request) {
    const { name, age, breed } = req.body;
    const cat = await this.catsService.create({ name, age, breed });
    res.status(201).send(cat);
  }
}
