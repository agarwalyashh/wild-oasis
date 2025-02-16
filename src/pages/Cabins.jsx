import CabinTable from "../features/cabins/CabinTable";
function Cabins() {
  return (
    <div className="bg-slate-100 w-[98%] h-full px-12 py-20">
      <div className="flex justify-between items-center">
        <h1 className="text-5xl font-poppins font-bold">All Cabins</h1>
        <p className="italic font-bold">Filter / Sort</p>
      </div>
      <CabinTable />
    </div>
  );
}

export default Cabins;
