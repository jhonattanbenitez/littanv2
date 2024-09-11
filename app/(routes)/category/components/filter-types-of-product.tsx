import { useGetProductField } from "@/api/getProductField";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FilterTypes } from "@/types/filters";

type FilterTypeOfProductProps = {
  setFilterTypeOfProduct: (typeOfSleeve: string) => void;
};

const FilterTypeOfProduct = (props: FilterTypeOfProductProps) => {
  const { setFilterTypeOfProduct } = props;
  const { result, loading }: FilterTypes = useGetProductField();

  return (
    <div className="my-5">
      <p className="mb-3 font-bold">Tipo de camisa</p>
      {loading && result === null && <p>Cargando tipos de camisa...</p>}

      <RadioGroup onValueChange={(value) => setFilterTypeOfProduct(value)}>
        {result !== null &&
          result.schema.attributes.typeOfSleeve.enum.map((typeOfSleeve: string) => (
            <div key={typeOfSleeve} className="flex items-center space-x-2">
              <RadioGroupItem value={typeOfSleeve} id={typeOfSleeve} />
              <Label htmlFor={typeOfSleeve}>{typeOfSleeve}</Label>
            </div>
          ))}
      </RadioGroup>
    </div>
  );
};

export default FilterTypeOfProduct;
