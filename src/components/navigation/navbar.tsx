import { Link } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <nav className="mb-4">
        <ul className="flex flex-row gap-4 flex-wrap text-default">
          <li>
            <Link to={{ pathname: "/" }}>home</Link>
          </li>
          <li>authentication</li>
          <li>dashboard</li>
          <li>
            <Link to={{ pathname: "/products" }}>products</Link>
          </li>
          <li>cart</li>
          <li>checkout</li>
          <li>
            <Link to={{ pathname: "/options" }}>options</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
