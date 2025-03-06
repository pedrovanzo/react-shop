import { Link } from "react-router-dom";
import { useFirebaseAuth, authSignout } from "../../contexts/auth";
export default function Navbar() {
  const user = useFirebaseAuth();
  console.log(user);
  return (
    <>
      <nav className="mb-4">
        <ul className="flex flex-row gap-4 flex-wrap text-default">
          <li>
            <Link to={{ pathname: "/" }}>home</Link>
          </li>
          <li>dashboard</li>
          <li>
            <Link to={{ pathname: "/products" }}>products</Link>
          </li>
          <li>cart</li>
          <li>checkout</li>
          <li>
            <Link to={{ pathname: "/options" }}>options</Link>
          </li>
          {user ? (
            <>
              <li>
                <button className="text-default" onClick={authSignout}>
                  sign out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={{ pathname: "/signin" }}>sign in</Link>
              </li>
              <li>
                <Link to={{ pathname: "/signup" }}>sign up</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </>
  );
}
