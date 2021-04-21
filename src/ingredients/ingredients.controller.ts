import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { IngredientsService } from './ingredients.service';

@Controller('tasks')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {}

  @Get()
  getIngredients() {
    return this.ingredientsService.getIngredients();
  }

  @Get('/:id')
  getIngredient(@Param('id') id: string) {
    return this.ingredientsService.getIngredient(id);
  }

  @Post()
  addIngredient(
    @Body('text') text: string,
    @Body('completed') completed: boolean,
  ) {
    return this.ingredientsService.addIngredient({ text, completed });
  }

  @Patch()
  updateIngredient(
    @Body('id') id: string,
    @Body('text') text: string,
    @Body('completed') completed: boolean,
  ) {
    return this.ingredientsService.updateIngredient({ id, text, completed });
  }

  @Delete()
  deleteIngredient(@Body('id') id: string) {
    return this.ingredientsService.deleteIngredient(id);
  }
}
