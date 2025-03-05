import { useNavigate } from "react-router-dom"

function PageNotFound() {
  const navigate=useNavigate()
  return (
    <div className="h-screen justify-center items-center flex flex-col gap-5 bg-grey-0 rounded-lg p-6">
      <h1 className="text-5xl">Something Went Wrong!</h1>
      <button className="p-4 bg-indigo-500 text-grey-0 rounded-md" onClick={()=>navigate("/dashboard",{replace:true})}>Go Back</button>
    </div>
  )
}

export default PageNotFound
