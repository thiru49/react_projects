import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export default function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckigOut } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`booking ${data.id} successfully checked out`);
      queryClient.invalidateQueries({ active: true });
    },
    onError: () => toast.error("there was an error while checking id"),
  });

  return { checkout, isCheckigOut };
}
