import { useState } from "react";
import CabinTable from "../features/cabins/CabinTable";
import CreateCabinForm from "../features/cabins/CreateCabinForm";
import CabinOperations from "../features/cabins/CabinOperations";
function Cabins() {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <div className="bg-grey-100 w-[98%] h-full px-12 py-20 overflow-scroll relative">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-poppins font-bold">All Cabins</h1>
        <CabinOperations/>
      </div>
      <CabinTable showForm={showForm} setShowForm={setShowForm}/>
      
      {showForm && <CreateCabinForm setShowForm={setShowForm} showForm={showForm}/>}
    </div>
  );
}

export default Cabins;
