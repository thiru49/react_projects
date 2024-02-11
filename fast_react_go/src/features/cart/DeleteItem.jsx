import React from "react";
import Button from "../../ui/Button";
import { deleteItem } from "./cartSlice";
import { useDispatch } from "react-redux";
function DeleteItem({ pizzaId }) {
  const dispach = useDispatch();
  return (
    <Button type="small" onClick={() => dispach(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}

export default DeleteItem;
