import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { MdFileCopy, MdOutlineEdit, MdDeleteOutline } from 'react-icons/md'
import { useCreateCabin } from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ data }) {
  const { isDeleting, deleteCabin } = useDeleteCabin()
  const { isCreating, createCabin } = useCreateCabin();
  const { id:cabId, name, image, regularPrice, discount, description, maxCapacity } = data;
  function copyCabin() {
    createCabin({ name: `copy of ${name}`, image, regularPrice, discount, description, maxCapacity })
  }
  return (
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <p>Fits up to {maxCapacity} guests</p>
        <Price>{formatCurrency(regularPrice)}</Price>
        <Discount>{discount === 0 ? "_   _" : formatCurrency(discount)}</Discount>
        <div>
          <button disabled={isCreating} onClick={copyCabin}><MdFileCopy /></button>
          <Modal>
            <Modal.Open opens='delete'>
          <button><MdDeleteOutline /></button>
            </Modal.Open>
            <Modal.Window name='delete'>
              <ConfirmDelete disabled={isDeleting} resource='cabins' onConfirm={() => deleteCabin(cabId)}/>
            </Modal.Window>
            <Modal.Open opens='edit'>
              <button><MdOutlineEdit /></button>
            </Modal.Open>
            <Modal.Window name='edit'>
              <CreateCabinForm cabin={data} />
            </Modal.Window>
          </Modal>
   
        </div>
      </Table.Row>  
  )
}

export default CabinRow