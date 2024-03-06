import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import useCheckin from "./useCheckin";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import Spinner from "../../ui/Spinner";
import CheckBox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);

  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const moveBack = useMoveBack();

  useEffect(() => {
    setConfirmPaid(booking.isPaid);
  }, [booking]);

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
  } = booking;
  const optionalBreakFast =
    settings.breakfastPrice * numGuests * numNights || 0;
  function handleCheckin() {
    if (!confirmPaid) return;
    addBreakfast
      ? checkin({
          bookingId,
          breakFast: {
            hasBreakfast: true,
            extrasPrice: optionalBreakFast,
            totalPrice: totalPrice + optionalBreakFast,
          },
        })
      : checkin({ bookingId, breakFast: {} });
  }

  if (isLoading || isLoadingSettings) return <Spinner />;

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      <Box>
        <CheckBox
          id="breakfast"
          checked={addBreakfast}
          onChange={() => {
            setAddBreakfast((add) => !add);
            setConfirmPaid(false);
          }}
        >
          want to add breakfast for {settings.breakfastPrice}?
        </CheckBox>
      </Box>
      <Box>
        <CheckBox
          id="confirm"
          checked={confirmPaid}
          onChange={() => {
            setConfirmPaid((confirm) => !confirm);
          }}
          disabled={confirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid total amount{" "}
          {!addBreakfast
            ? `${formatCurrency(totalPrice)}`
            : `${formatCurrency(
                optionalBreakFast + totalPrice
              )} ($${totalPrice} + $${optionalBreakFast})`}
        </CheckBox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmPaid || isCheckingIn}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
