import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { HiArrowDownOnSquare, HiTrash } from "react-icons/hi2";
import { useNavigate } from "react-router";

import useCheckout from "../check-in-out/useCheckout";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Model from "../../ui/Modal";
import { useDeleteBooking } from "./useDeleteBooking";
const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking, isLoading } = useBooking();
  const { id, status } = booking;
  const moveBack = useMoveBack();
  const navigate = useNavigate();

  const { checkout, isCheckigOut } = useCheckout();
  const { deletebooking, isPending } = useDeleteBooking();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };
  if (isLoading) return <Spinner />;
  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking {id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => navigate(`/checkin/${id}`)}
          >
            Check-in
          </Button>
        )}
        {status === "checked-in" && (
          <Button
            icon={<HiArrowDownOnSquare />}
            onClick={() => checkout(id)}
            disabled={isCheckigOut}
          >
            Check-out
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
        <Model>
          <Model.Open opens="deleteBooking">
            <Button icon={<HiTrash />}>delete Booking</Button>
          </Model.Open>
          <Model.Window name="deleteBooking">
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() =>
                deletebooking(id, {
                  onSettled: () => navigate(-1),
                })
              }
              disabled={isPending}
            />
          </Model.Window>
        </Model>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
