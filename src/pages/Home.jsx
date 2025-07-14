import { Link } from "react-router-dom"
import { books } from "../utils/mockData"
import BookCard from "../components/BookCard"
import { useSelector } from "react-redux"

function Home() {
  const reduxBooks = useSelector(store => store.addBook.books) || []
  const allBooks = [...books, ...reduxBooks]
  const categories = [...new Set(allBooks.map(book => book.category))]
  const popularBooks = allBooks.sort((a, b) => b.rating - a.rating).slice(0, 4)
  return (
    <div className="home-content">
      <div className="home-welcome">
        <h1>Welcome to the Online Library System</h1>
        <p>Discover, explore, and get lost in worlds across genres.</p>
      </div>
      <div className="home-categories">
        <h2>Browse by Categories</h2>
        <div className="category-grid">
          {categories.map((category, index) => {
            return <Link to={`/books/${category.toLowerCase()}`} key={index}>{category}</Link>
          })}
        </div>
      </div>
      <div className="home-popular">
        <h2>Popular Picks</h2>
        <div className="popular-grid">
          {popularBooks.map(book => {
            return <BookCard key={book.id} book={book} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Home