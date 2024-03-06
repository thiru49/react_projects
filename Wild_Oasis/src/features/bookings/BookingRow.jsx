import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import { HiArrowDownOnSquare, HiEye, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router";
import useCheckout from "../check-in-out/useCheckout";
import Model from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { deleteBooking } from "../../services/apiBookings";
import { useDeleteBooking } from "./useDeleteBooking";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { checkout, isCheckigOut } = useCheckout();
  const { deletebooking, isPending, data } = useDeleteBooking();
  console.log(data);
  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}{" "}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
          {format(new Date(endDate), "MMM dd yyyy")}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Model>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>
            {status === "unconfirmed" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check-in
              </Menus.Button>
            )}
            {status === "checked-in" && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => checkout(bookingId)}
                disabled={isCheckigOut}
              >
                Check-out
              </Menus.Button>
            )}
            <Model.Open opens="deleteBooking">
              <Menus.Button icon={<HiTrash />}>delete Booking</Menus.Button>
            </Model.Open>
          </Menus.List>
        </Menus.Menu>
        <Model.Window name="deleteBooking">
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => deletebooking(bookingId)}
            disabled={isPending}
          />
        </Model.Window>
      </Model>
    </Table.Row>
  );
}

export default BookingRow;
