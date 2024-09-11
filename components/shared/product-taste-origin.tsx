interface ProductTasteOrigin {
  typeOfSleve: string;
}

const ProductTasteOrigin = (props: ProductTasteOrigin) => {
  const { typeOfSleve } = props;

  return (
    <div className="flex items-center justify-between gap-3">
    
      <p className="px-2 py-1 text-xs text-white bg-primary rounded-full w-fit">
        {typeOfSleve}
      </p>
    </div>
  );
};

export default ProductTasteOrigin;
