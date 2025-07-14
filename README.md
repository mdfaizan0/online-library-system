# Online Library System

This is a simple React-based online library application.

## 🔗 Features

- 📖 Browse all available books
- 🔍 Filter by category and search by title, author, or genre
- ➕ Add a new book with proper form validation
- 📘 View detailed information about each book
- ❌ Error page for invalid routes
- 🌐 Overview section powered by Google Books API
- 🎨 Fully responsive and styled with custom CSS

## ⚙️ Tech Stack

- React
- [React Router DOM](https://reactrouter.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- Toast Notifications ([react-hot-toast](https://react-hot-toast.com/))

## 🔥 How to run:

#### Clone the project:
```bash
git clone https://github.com/mdfaizan0/online-library-system.git
```

#### Go to the project directory:

```bash
cd online-library-system
```

#### Install dependencies:

```bash
npm install
```

#### Kickstart the server:

```bash
npm run dev
```

## 📌 Notes

- Redux is used to manage newly added books.
- Data is not persisted; refresh will reset Redux state.
- Book cover fallback added for invalid URLs.

---
