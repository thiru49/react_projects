import React, { useState } from "react";

import Button from "../../ui/Button";
import Model from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";
const AddCabin = () => {
  const [isOpenModel, setIsOpenModel] = useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpenModel((pre) => !pre)}>
        Add new cabin
      </Button>
      {isOpenModel && (
        <Model onClose={() => setIsOpenModel((pre) => !pre)}>
          <CreateCabinForm onCloseModel={() => setIsOpenModel((pre) => !pre)} />
        </Model>
      )}
    </div>
  );
};

export default AddCabin;
