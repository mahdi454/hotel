import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { getAllBooking } from "../../services/apiBookings";
import { useQuery } from 'react-query'
import Spinner from "../../ui/Spinner";
import Empty from "../../ui/Empty";
import { useSearchParams } from "react-router-dom";


function BookingTable() {
  const { isLoading, data } = useQuery('bookings', getAllBooking);
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />
  if(!data.length)return <Empty resource="booking"/>
  const bookings = data;
// filter
const filter = searchParams.get("status") || "all"


  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default BookingTable;
