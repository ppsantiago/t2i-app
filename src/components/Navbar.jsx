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
    <header>
      <script src="https://cdn.tailwindcss.com"></script>
      <h3 className="text-3xl font-bold text-[#fff]">SPCODEV T2I</h3>

      <div className="menu">
        <Link className="link" to="/">
          Inicio
        </Link>
        {user && (
          <>
            <Link className="link" to={"/generate"}>
              Generar
            </Link>
          </>
        )}
        {user ? (
          <div className="link">
            <div className="d-flex">
              <button className="link" onClick={logOut}>
                Cerrar sesion
              </button>
              <img className="logo" src={user.photoURL} alt="" />{" "}
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
