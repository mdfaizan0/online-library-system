import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from "./pages/Home.jsx"
import NotFound from './pages/NotFound.jsx'
import BrowseBooks from './pages/BrowseBooks.jsx'
import BookDetails from './pages/BookDetails.jsx'
import AddBook from './pages/AddBook.jsx'
import appStore from './utils/appStore.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />
      }, {
        path: "/books",
        element: <BrowseBooks />
      }, {
        path: "/books/:category",
        element: <BrowseBooks />
      }, {
        path: "/books/details/:id",
        element: <BookDetails />
      }, {
        path: "/add-book",
        element: <AddBook />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <Provider store={appStore}>
    <RouterProvider router={appRouter} />
    <Toaster
      position="top-right"
      reverseOrder={true}
    />
  </Provider>
)
