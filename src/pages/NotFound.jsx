import { Link, useRouteError, useLocation, useParams } from "react-router-dom"

function NotFound() {
  const error = useRouteError()
  const location = useLocation()
  const params = useParams()

  let errorObj = {
    errorMessage: "Sorry we couldn't find this page.",
    errorFlag: 0
  }

  if (error.status === 404 && location.pathname.includes("/books/") && params.category) {
    errorObj.errorMessage = `Oops! We do not have the "${params.category}" category 😄.`
    errorObj.errorFlag = 1
  }

  if (error.status === 404 && location.pathname.includes("/books/details/") && params.id) {
    errorObj.errorMessage = `We do not have a book with that ID, but if you want, you can add a book in our library 😉.`
    errorObj.errorFlag = 2
  }

  return (
    <div className="error">
      <h1 className="error-code">{error.status || "404"}</h1>
      <p className="error-info" style={errorObj.errorFlag === 2 ? {fontSize: "26px"} : {fontSize: "32px"}}>{errorObj.errorMessage}</p>
      <div className="error-action-buttons">
        <Link className="error-back-to-home" to="/">Back to Home</Link>
        {errorObj.errorFlag === 2 && <Link to="/add-book" className="error-add-book">Add Book</Link>}
      </div>
    </div>
  )
}

export default NotFound