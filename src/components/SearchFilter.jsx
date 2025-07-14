function SearchFilter({categories, category, categorySelected, setCategorySelected, setSearchTerm, navigate}) {
    return (
        <div className="search-filter">
            <div className="search">
                <input type="text" placeholder="Search for title, author or category" onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <div className="category-select">
                <label htmlFor="category-select">Filter by Category: </label>
                <select id="category-select" value={categorySelected || category || ""}
                    onChange={(e) => {
                        const value = e.target.value
                        setCategorySelected(value)
                        navigate(value ? `/books/${value}` : "/books")
                    }}>
                    <option value="">All Categories</option>
                    {categories.map((category, index) => {
                        return <option key={index} value={`${category.toLowerCase()}`}>{category}</option>
                    })}
                </select>
            </div>
        </div>
    )
}

export default SearchFilter