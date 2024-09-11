import FilterTypeOfProduct from "./filter-types-of-product";

type FiltersControlsCategoryProps = {
  setFilterTypeOfProduct: (origin: string) => void;
};

const FiltersControlsCategory = (props: FiltersControlsCategoryProps) => {
  const { setFilterTypeOfProduct} = props;

  return (
    <div className="sm:w-[350px] sm:mt-5 p-6">
      <FilterTypeOfProduct setFilterTypeOfProduct={setFilterTypeOfProduct} />
    </div>
  );
};

export default FiltersControlsCategory;
