import type { DrinkType, IngredientType } from '../types';
import type { RequestHandler } from '@sveltejs/kit'

const url: string = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';

export const get: RequestHandler = async (): Promise<{ body: DrinkType }> => {
    const result = await (
        await fetch(url)
    ).json();
    //console.log(result);
    const drinks = result.drinks;
    const ingredients: IngredientType[] = [...Array(15)]
        .map((_value, i) => ({
            name: drinks[0][`strIngredient${i + 1}`],
            amount: drinks[0][`strMeasure${i + 1}`]
        }))
        .filter((ingredient) => ingredient.name);

    // console.log(ingredients);


    return {
        body: {
            name: drinks[0].strDrink,
            instructions: drinks[0].strInstructions,
            thumbUrl: drinks[0].strDrinkThumb,
            ingredients: ingredients
        }
    }
}