export type InventoryItemType = {
  id: number;
  attributes: {
    size: string; // 'XS', 'S', 'M', 'L', 'XL'
    quantity: number;
  };
};

export type InventoryTypes = {
  result: InventoryItemType[] | null;
  loading: boolean;
  error: string;
};
