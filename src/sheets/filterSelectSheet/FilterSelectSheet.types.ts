export interface FilterSelectOption {
  id: string;
  label: string;
}

export type FilterSelectVariant = "single-select" | "multi-select" | "height";

export interface FilterSelectSheetPayload {
  fieldKey: string;
  title: string;
  variant: FilterSelectVariant;
  options?: FilterSelectOption[];
  initialValue?: string | string[] | [number, number];
  onSubmit: (value: string | string[] | [number, number]) => void;
}
