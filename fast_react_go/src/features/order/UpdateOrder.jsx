import React from "react";
import { Form, useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder() {
  const fetcher = useFetcher();
  return (
    <fetcher.Form method="PATCH" className="text-end">
      <Button type="primary">Make a Priortity</Button>
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const data = {
    priority: true,
  };
  await updateOrder(params.orderId, data);
  return null;
}

export default UpdateOrder;
