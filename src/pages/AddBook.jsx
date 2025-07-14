import { useState } from "react"
import { books } from "../utils/mockData"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addBook } from "../utils/addBookSlice";
import toast from "react-hot-toast";

function AddBook() {
  const [input, setInput] = useState({})
  const [categoryOption, setCategoryOption] = useState("");
  const [errors, setErrors] = useState({})
  const reduxBooks = useSelector(store => store.addBook.books) || []
  const allBooks = [...books, ...reduxBooks]
  const categories = [...new Set(allBooks.map(book => book.category))]
  const MAX_PRICE = 9999.99
  const navigate = useNavigate()
  const dispatch = useDispatch()

  function validateForm(input) {
    let errorObj = {}

    if (!input.title || input.title.trim().length < 2) {
      errorObj.title = "Title must be at least 2 characters long"
    }

    if (!input.author || input.author.trim().length < 2) {
      errorObj.author = "Author Name must be at least 2 characters long"
    }

    if (!input.category || input.category.trim().length < 2) {
      errorObj.category = "Category is required"
    }

    if (!input.isbn || !/^\d{10,13}$/.test(input.isbn)) {
      errorObj.isbn = "ISBN must be a 10-13 digit number"
    }

    if (!input.description || input.description.trim().length < 10) {
      errorObj.description = "Description must be at least 10 characters"
    }

    if (!input.cover_image || !/^https?:\/\/.+\.(jpg|jpeg|png|webp)(\?.*)?$/i.test(input.cover_image)) {
      errorObj.cover_image = "Must be a valid image URL (jpg, png, jpeg, webp)"
    }

    if (!input.price || parseFloat(input.price) <= 0) {
      errorObj.price = `Price cannot be less than ₹0`
    } else if (!input.price || parseFloat(input.price) > MAX_PRICE) {
      errorObj.price = `Price cannot exceed ₹${MAX_PRICE}`
    }
    return errorObj
  }

  function handleSubmit(e) {
    e.preventDefault()
    const newBook = { ...input, id: `${Date.now()}`, rating: input.rating ? input.rating : 4.5 }
    let foundErrors = validateForm(newBook)
    setErrors(foundErrors)
    if (Object.keys(foundErrors).length === 0) {
      dispatch(addBook(newBook))
      toast.success(`${input.title} Added`, {
        duration: 2500,
        style: {
          background: 'black',
          color: 'white',
          border: '1px solid #c9ada7',
          borderRadius: '12px'
        },
        icon: '🎉'
      })
      navigate("/books")
    }
  }

  return (
    <div className="add-book">
      <h1>Add a Book</h1>
      <p>Fill out the details below to add a book to our library</p>
      <form action="/" className="add-book-form" onSubmit={handleSubmit}>
        <div className="add-book-basic-info">
          <h3>Basic Info</h3>
          <div>
            <label htmlFor="title">Title: <span className="red-star">*</span></label>
            <input autoComplete="off" required type="text" id="title" value={input.title || ""} onChange={(e) => setInput(prev => ({ ...prev, [e.target.id]: e.target.value }))} />
            {errors.title && <p className="error-text">{errors.title}</p>}
          </div>
          <div>
            <label htmlFor="author">Author Name: <span className="red-star">*</span></label>
            <input autoComplete="off" required type="text" id="author" value={input.author || ""} onChange={(e) => setInput(prev => ({ ...prev, [e.target.id]: e.target.value }))} />
            {errors.author && <p className="error-text">{errors.author}</p>}
          </div>
          <div>
            <label htmlFor="category">Category: <span className="red-star">*</span></label>
            <select
              required
              id="category"
              value={categoryOption}
              onChange={(e) => {
                const value = e.target.value;
                setCategoryOption(value);
                if (value !== "other") {
                  setInput(prev => ({ ...prev, category: value }));
                } else {
                  setInput(prev => ({ ...prev, category: "" }));
                }
              }}
            >
              {categories.map((category, index) => {
                return <option key={index} value={`${category.charAt(0).toUpperCase() + category.slice(1)}`}>{category}</option>
              })}
              <option value="other">Other</option>
            </select>
            {categoryOption === "other" && (
              <input autoComplete="off" type="text" id="custom-category" placeholder="Enter category" onChange={(e) => setInput(prev => {
                const value = (e.target.value).trim()
                return { ...prev, category: value.charAt(0).toUpperCase() + value.slice(1) }
              })} />
            )}
            {errors.category && <p className="error-text">{errors.category}</p>}
          </div>
          <div>
            <label htmlFor="isbn">ISBN: (Without hyphens)<span className="red-star">*</span></label>
            <input autoComplete="off" required type="number" id="isbn" value={input.isbn || ""} onChange={(e) => setInput(prev => ({ ...prev, [e.target.id]: (e.target.value).trim() }))} />
            {errors.isbn && <p className="error-text">{errors.isbn}</p>}
          </div>
        </div>
        <div className="add-book-descrip-content">
          <h3>Descriptive Content</h3>
          <div>
            <label htmlFor="description">Description: <span className="red-star">*</span></label>
            <textarea required id="description" value={input.description || ""} onChange={(e) => setInput(prev => ({ ...prev, [e.target.id]: (e.target.value).trim() }))} />
            {errors.description && <p className="error-text">{errors.description}</p>}
          </div>
          <div>
            <label htmlFor="cover_image">Cover Image URL: <span className="red-star">*</span></label>
            <input autoComplete="off" required type="url" id="cover_image" value={input.cover_image || ""} onChange={(e) => setInput(prev => ({ ...prev, [e.target.id]: (e.target.value).trim() }))} />
            {errors.cover_image && <p className="error-text">{errors.cover_image}</p>}
          </div>
        </div>
        <div className="commercial">
          <h3>Commercial Data</h3>
          <div>
            <label htmlFor="price">Price: (In Rupees) <span className="red-star">*</span></label>
            <input
              autoComplete="off"
              type="number"
              id="price"
              min="0.01"
              max={MAX_PRICE}
              step="0.01"
              value={input.price || ""}
              onChange={(e) => setInput(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
            />
            {errors.price && <p className="error-text">{errors.price}</p>}
          </div>
          <div>
            <label htmlFor="rating">Rating: (Optional)</label>
            <input autoComplete="off" type="range" id="rating" min="0.1" max="5" step="0.1"
              value={input.rating || 4.5}
              onChange={(e) => setInput(prev => ({ ...prev, [e.target.id]: parseFloat(e.target.value) }))}
            />
            <div id="add-book-rating">
              {input.rating > 0 && <img src="https://img.icons8.com/?size=100&id=qdQpy48X3Rjv&format=png&color=000000" alt="yellow-star-icon" />}
              <span>{input.rating}</span>
            </div>
          </div>
        </div>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default AddBook