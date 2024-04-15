import styled from "styled-components";
import Header from "../../ui/Header";
import useRecentBooking from "./useRecentBooking";
import useRecentStays from "./useRecentStays";
import Spinner from "../../ui/Spinner";
import Stats from "./Stats";
import { useCabin } from "../cabins/useCabin";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;



const DashboardLayout = () => {
  const {isLoading,bookings} = useRecentBooking();
  const {isLoading:isLoading2,stays,confirmedStays,numDays} = useRecentStays()
  const {cabins} = useCabin()
  if(isLoading || isLoading2) return <Spinner/>
  console.log(stays)
  console.log(confirmedStays)
  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} cabins={cabins} numDays={numDays}/>
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  )
}

export default DashboardLayout