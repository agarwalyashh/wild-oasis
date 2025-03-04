import UpdatePassword from "../features/authentication/UpdatePassword";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";

function Account() {
  return (
    <div className="p-20 flex flex-col gap-10 bg-grey-100 h-screen">
      <h1 className="text-5xl font-bold text-start">Update your account</h1>
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-medium text-start">Update User Data</h1>
        <UpdateUserDataForm/>
        <h1 className="text-4xl font-medium text-start">Update Password</h1>
        <UpdatePassword/>
      </div>
    </div>
  );
}

export default Account;
