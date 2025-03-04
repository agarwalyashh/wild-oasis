import LoginForm from "../features/authentication/LoginForm";
import logo from "../data/img/logo-light.png"
function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-grey-100">
      <img src={logo} className="w-50"/>
      <h1 className="text-5xl font-bold">Log in to your Account</h1>
      <LoginForm/>
    </div>
  )
}

export default Login
