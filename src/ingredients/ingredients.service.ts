import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from './ingredients.entity';

@Injectable()
export class IngredientsService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientsRepository: Repository<Ingredient>,
  ) {}

  getIngredients() {
    return this.ingredientsRepository.find();
  }

  getIngredient(id) {
    return this.ingredientsRepository.findOne(id);
  }

  addIngredient({ ...args }) {
    const ingredient = new Ingredient();
    this.updateFieldsIfPresent(ingredient, args);
    return this.ingredientsRepository.save(ingredient);
  }

  async updateIngredient({ id, ...args }) {
    const ingredient = await this.ingredientsRepository.findOne(id);
    this.updateFieldsIfPresent(ingredient, args);
    return this.ingredientsRepository.save(ingredient);
  }

  deleteIngredient(id) {
    return this.ingredientsRepository.delete(id);
  }

  private updateFieldsIfPresent(ingredient, args) {
    ['text', 'completed'].forEach(field => {
      if (typeof args[field] !== 'undefined') {
        ingredient[field] = args[field];
      }
    });
  }
}
