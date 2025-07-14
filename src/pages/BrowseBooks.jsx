import { useState } from "react"
import BookCard from "../components/BookCard"
import { books } from "../utils/mockData"
import "../utils/style.css"
import { useParams, useNavigate } from "react-router-dom"
import SearchFilter from "../components/SearchFilter"
import { useSelector } from "react-redux"

function BrowseBooks() {
  const [categorySelected, setCategorySelected] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const { category } = useParams()
  const navigate = useNavigate()
  const reduxBooks = useSelector(store => store.addBook.books) || []
  const allBooks = [...books, ...reduxBooks]
  const categories = [...new Set(allBooks.map(book => book.category))]

  if (category && !categories.map(cat => cat.toLowerCase()).includes(category.toLowerCase())) {
    throw new Response("Not Found", { status: 404 });
  }

  let finalCat = categorySelected || category
  let filteredBooks = allBooks
    .filter(book => finalCat ? book.category.toLowerCase() === finalCat.toLowerCase() : true)
    .filter(book => searchTerm ? book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.category.toLowerCase().includes(searchTerm.toLowerCase()) : true)

  let formattedCategory = finalCat ? finalCat.charAt(0).toUpperCase() + finalCat.slice(1) : "All Books"
  return (
    <div className="browse-books">
      <h1>{formattedCategory}</h1>
      <SearchFilter
        categories={categories}
        category={category}
        categorySelected={categorySelected}
        setCategorySelected={setCategorySelected}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        navigate={navigate}
      />
      <div className="books">
        {
          filteredBooks.map(book => {
            return <BookCard key={book.id} book={book} />
          })
        }
      </div>
    </div>
  )
}

export default BrowseBooks