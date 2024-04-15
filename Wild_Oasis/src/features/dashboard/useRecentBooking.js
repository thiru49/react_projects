import { useQuery } from "@tanstack/react-query"
import { getBookingsAfterDate } from "../../services/apiBookings"
import { useSearchParams } from "react-router-dom"
import { subDays } from "date-fns"


const useRecentBooking = () => {
    const [searchParams] = useSearchParams()
    const numDays = !searchParams.get('last') ? 7 : Number(searchParams.get('last'));
    console.log(typeof new Date(),new Date())
    const queryDate = subDays(new Date(),numDays).toISOString()
    const {isLoading,data:bookings}=useQuery({
        queryFn:()=>getBookingsAfterDate(queryDate),
        queryKey: ['bookings',`last-${numDays}`]
    })
  return {bookings,isLoading}
}

export default useRecentBooking;