import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <div className="bg-grey-100 p-18 h-screen">
      <div className="text-5xl font-bold font-poppins text-start">
        Update Hotel Settings
      </div>
      <UpdateSettingsForm/>
    </div>
  );
}

export default Settings;
