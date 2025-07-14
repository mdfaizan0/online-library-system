import { Link } from "react-router-dom"

function BookCard({ book }) {
  const { id, title, author, cover_image, price, rating } = book
  const dummyImg = "https://dummyimage.com/200x300/cccccc/000000&text=Cover+Not+Found"
  return (
    <div className="book-card">
      <img className="book-card-img" src={`${cover_image}`} onError={(e) => { e.target.onError = null; e.target.src = dummyImg }} alt="book-cover" />
      <div className="book-card-details">
        <div className="title-author">
          <h3 className="title">{title}</h3>
          <small className="author">By: {author}</small>
        </div>
        <div className="price-rating">
          <h4 className="price">₹{price.toFixed(2)}</h4>
          <div className="rating">
            <img src="https://img.icons8.com/?size=100&id=qdQpy48X3Rjv&format=png&color=000000" alt="yellow-star-icon" />
            <p>{rating || "4.5"}</p>
          </div>
        </div>
        <Link to={`/books/details/${id}`} className="view-link">
          <button>View Details</button>
        </Link>
      </div>
    </div>
  )
}

export default BookCard