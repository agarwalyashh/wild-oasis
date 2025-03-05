import SignupForm from "../features/authentication/SignupForm"

function Users() {
  return (
    <div className="p-20 grid gap-6 bg-grey-100">
      <h1 className="text-5xl font-bold font-poppins text-start">Create a New User</h1>
      <SignupForm/>
    </div>
  )
}

export default Users
