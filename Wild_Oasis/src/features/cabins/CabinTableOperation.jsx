import { useSearchParams } from "react-router-dom";
import Filter from "../../ui/Filter";
import TablOperation from "../../ui/TableOperations";

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
    </TablOperation>
  );
}

export default CabinTableOperation;
