import { Link } from "react-router-dom"
import "../utils/style.css"
import logo from "../assets/library-logo.png"

function NavBar() {
  return (
    <nav className="navbar" id="navbar">
      <div className="navbar-title">
        <img src={logo} alt="library-logo" className="library-logo" />
        <Link to="/" className="brand-name">Online Library</Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/books">Browse Books</Link></li>
        <li><Link to="/add-book">Add Book</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar