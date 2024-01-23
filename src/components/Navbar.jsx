import { Link } from "react-router-dom"
import { useAuthState } from "react-firebase-hooks/auth"
import { Auth } from "../conf/firebajse-config"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const Navbar = () => {
  const [user] = useAuthState(Auth)
  const navigator = useNavigate()
  const logOut = async () => {
    await signOut(Auth)
    navigator("/")
  }
  return (
    <header className="flex items-center justify-between px-5 py-3 mb-20 bg-gray-800 ">
      <h3 className="text-3xl font-bold text-[#fff]">SPCODEV T2I</h3>

      <div className="flex items-center justify-between gap-5 text-white">
        <Link className="hover:text-gray-500" to="/">
          Inicio
        </Link>
        {user && (
          <>
            <Link className="hover:text-gray-500" to={"/generate"}>
              Generar
            </Link>
          </>
        )}
        {user ? (
          <div className="flex mx-7  ">
            <div className="flex items-center  gap-2">
              <button className="hover:text-gray-500" onClick={logOut}>
                Salir
              </button>
              <img
                className="border-2 border-white rounded-full w-10 h-10"
                src={user.photoURL}
                alt=""
              />{" "}
            </div>
          </div>
        ) : (
          <Link className="link " to={"/login"}>
            Ingresar
          </Link>
        )}
      </div>
    </header>
  )
}

export default Navbar
