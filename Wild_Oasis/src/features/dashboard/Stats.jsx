import React from 'react'
import Stat from './Stat'
import { HiOutlineBanknotes, HiOutlineBriefcase, HiOutlineCalendar, HiOutlineCalendarDays, HiOutlineChartBar } from 'react-icons/hi2'


const Stats = ({bookings,confirmedStays,cabins,numDays}) => {
    const numBookings = bookings.length;
    console.log(bookings)
    const totalSales = bookings.reduce((acc,cur)=>(acc+cur.totalPrice),0);
    const totalCheckIn = confirmedStays.length;
    const occupancy = confirmedStays.reduce((acc,cur)=>(acc+cur.numNights),0)/(numDays*cabins.length)
    console.log(cabins)
  return (
    <>
    <Stat title="Bookings" color="blue" icon={<HiOutlineBriefcase/>} value={numBookings}/>
    <Stat title="Sales" color="green" icon={<HiOutlineBanknotes/>} value={totalSales}/>
    <Stat title="check ins" color="indigo" icon={<HiOutlineCalendarDays/>} value={totalCheckIn}/>
    <Stat title="Occupancy rate" color="yellow" icon={<HiOutlineChartBar/>} value={Math.round(occupancy*100)+ '%'}/>
    </>
  )
}

export default Stats