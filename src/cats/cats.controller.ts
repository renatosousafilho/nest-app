import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  private catsService: CatsService;

  constructor(catsService: CatsService) {
    this.catsService = catsService;
  }

  @Get()
  async findAll(@Res() response: Response) {
    const cats = await this.catsService.findAll();
    response.status(200).json(cats);
  }

  @Post()
  async create(@Res() res: Response, @Req() req: Request) {
    const { name, age, breed } = req.body;
    const cat = await this.catsService.create({ name, age, breed });
    res.status(201).send(cat);
  }
}