
import { Link, useParams } from 'react-router-dom';
import { books } from '../utils/mockData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function BookDetails() {
  const [showSummary, setShowSummary] = useState(false)
  const [summary, setSummary] = useState("")
  const [APIFlag, setAPIFlag] = useState(false)
  const { id } = useParams()
  const reduxBooks = useSelector(store => store.addBook.books)
  const allBooks = [...books, ...reduxBooks]
  const heroBook = allBooks.filter(book => book.id === id)
  if (id && !allBooks.map(book => book.id.toLowerCase()).includes(id.toLowerCase())) {
    throw new Response("Not Found", { status: 404 });
  }

  useEffect(() => {
    if (heroBook[0]) {
      document.title = `${heroBook[0].title} | Online Library`;
    }
    return () => {
      document.title = "Online Library";
    };
  }, [heroBook]);

  useEffect(() => {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${heroBook[0].isbn}`)
      .then(response => response.json())
      .then(data => {
        const gSummary = data.items?.[0]?.volumeInfo?.description;
        if (gSummary) {
          setSummary(gSummary);
          setAPIFlag(!APIFlag)
        }
      })
      .catch(error => console.error("Summary fetch error:", error));
  }, [])

  return (
    <>
      <Link to="/books" className="back-to-home">
        <FontAwesomeIcon icon={faCaretLeft} />
        <p>Back to Browse</p>
      </Link>
      {heroBook.map(book => {
        return (
          <div key={book.id} className="book-details">
            <div className="book-cover">
              <img src={book.cover_image} alt="cover-image" className="book-img" />
            </div>
            <div className="book-info">
              <h1>{book.title}</h1>
              <small>By: {book.author}</small>
              <div className="rating rating-row">
                <img src="https://img.icons8.com/?size=100&id=qdQpy48X3Rjv&format=png&color=000000" alt="yellow-star-icon" />
                <span>{book.rating}</span>
              </div>
              <p className="price"><strong>Price: </strong>₹{book.price.toFixed(2)}</p>
              <p className="genre"><strong>Genre: </strong>{book.category}</p>

              <div className="book-meta">
                <p><strong>Pages:</strong> {book.pages || 328}</p>
                <p><strong>Language:</strong> {book.language || "English"}</p>
                <p><strong>Published:</strong> {book.published || "2020"}</p>
                <p><strong>ISBN:</strong> {book.isbn || "978-3-16-148410-0"}</p>
              </div>

              <p className="description">{book.description}</p>
              <div className="summary">
                <button
                  onClick={() => setShowSummary(!showSummary)}
                  className="summary-btn"
                  disabled={summary ? false : true}>
                  <span>{APIFlag ? `${showSummary ? "Hide" : "Show"} Overview` : "Overview not available"}</span>
                  <FontAwesomeIcon icon={faCaretDown} size="lg" rotation={showSummary && 180} />
                </button>
                {showSummary ? <p className="summary-text">{summary}</p> : null}
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default BookDetails