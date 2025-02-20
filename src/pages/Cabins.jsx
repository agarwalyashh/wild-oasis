import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
function Cabins() {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="bg-grey-100 w-[98%] h-full px-12 py-20 overflow-scroll">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-poppins font-bold">All Cabins</h1>
        <p className="italic font-bold">Filter / Sort</p>
      </div>
      <CabinTable showForm={showForm} setShowForm={setShowForm}/>
      
      {showForm && <CreateCabinForm />}
    </div>
  );
}

export default Cabins;
