import { useMeal } from "@/store/food";
import IngredientInfo from "./IngredientInfo";

export default function IngredientsList(): React.JSX.Element {
  const { meal_analysis } = useMeal();

  return (
    <>
      {meal_analysis.items.map((ingredient, index) => (
        <IngredientInfo key={index} ingredient={ingredient} index={index} />
      ))}
    </>
  );
}
