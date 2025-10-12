import { useGlobal } from "@/global-context";
import FilterSet from "./filter-set";


export default function FilterPages({ model, onModelChange }) {
  const { pages } = useGlobal();
  return (
    <FilterSet model={model} onModelChange={onModelChange} options={pages} />
  );
}
