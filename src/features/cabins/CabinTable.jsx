import { getCabins } from "../../services/apiCabins";
import { useQuery } from 'react-query'
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow ";
import { useSearchParams } from "react-router-dom";
import Table from "../../ui/Table";
import Empty from "../../ui/Empty";

function CabinTable() {
  const { isLoading, data } = useQuery('cabins', getCabins);
  const [searchParams] = useSearchParams();
  if (isLoading) return <Spinner />
  if(!data.length)return <Empty resource="cabin"/>
  // filter
  const filter = searchParams.get("discount") || "all"
  let filterCabins;
  if (filter === "all") filterCabins = data;
  if (filter === "no-discount") filterCabins = data?.filter(data => data.discount === 0);
  if (filter === "with-discount") filterCabins = data?.filter(data => data.discount > 0)
  // sort
  const sort = searchParams.get("sortBy") || "name-asc"
  const [field, direction] = sort.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortCabins = filterCabins.sort((a, b) =>
    (a[field] - b[field]) * modifier)
  return (
    <Table columns="1fr 0.5fr 1.5fr 1fr 1fr 1fr 1fr ">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body data={sortCabins} render={data => (<CabinRow data={data} key={data.id} />)} />
    </Table>
  )
}

export default CabinTable