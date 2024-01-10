import { Provider, Auth } from "../conf/firebajse-config"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const navigator = useNavigate()

  const signIn = async () => {
    await signInWithPopup(Auth, Provider)
      .then((res) => {
        console.log(res)
        navigator("/")
      })
      .catch((err) => console.log(err))
  }
  return (
    <div className="login-page">
      <h2 className="text-2xl text-[#fff] my-9">Continuar con Google</h2>
      <button
        className="button hover:bg-black transition-all duration-500"
        onClick={signIn}
      >
        Sign In With Google
      </button>
    </div>
  )
}

export default Login
