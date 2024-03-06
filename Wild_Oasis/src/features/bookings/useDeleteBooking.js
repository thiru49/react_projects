import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useDeleteBooking() {
  const queryClient = useQueryClient();

  const {
    isPending,
    mutate: deletebooking,
    error,
    data,
  } = useMutation({
    mutationFn: (id) => deleteBookingApi(id),
    onSuccess: (data) => {
      toast.success("bookiing is successfully deleted ");
      console.log(data);
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
    onError: (er) => toast.error(er.message),
  });

  return { isPending, deletebooking, error, data };
}
