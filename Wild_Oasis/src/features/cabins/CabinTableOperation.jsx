import { useSearchParams } from "react-router-dom";
import Filter from "../../ui/Filter";
import TablOperation from "../../ui/TableOperations";
import SortBy from "../../ui/SortBy";

function CabinTableOperation() {
  return (
    <TablOperation>
      <Filter
        filterfield="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No Discount" },
          { value: "with-discount", label: "With Discount" },
        ]}
      />
      <SortBy
        options={[
          {
            value: "name-asc",
            label: "Sort by name(A-Z)",
          },
          {
            value: "name-des",
            label: "Sort by name(Z-A)",
          },
          {
            value: "regularPrice-asc",
            label: "Sort by price(low first)",
          },
          {
            value: "regularPrice-des",
            label: "Sort by price(high first)",
          },
          {
            value: "maxCapacity-asc",
            label: "Sort by capacity(low first)",
          },
          { value: "maxCapacity-des", label: "Sort by capacity(high first)" },
        ]}
      />
    </TablOperation>
  );
}

export default CabinTableOperation;
