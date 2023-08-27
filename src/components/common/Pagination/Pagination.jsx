function Pagination({ currentPage, setCurrentPage, totalPages }) {
    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (value) => {
        setCurrentPage(value);
    };

    return (
        <ol className="flex  gap-1 text-xs font-medium">
            <li>
                <div
                    className={`inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${
                        currentPage === 1
                            ? 'pointer-events-none opacity-60 hover:cursor-default'
                            : 'hover:scale-110 duration-300 hover:cursor-pointer'
                    }`}
                    onClick={handlePrevClick}
                >
                    <span className="sr-only">Prev Page</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </li>

            {Array.from({ length: totalPages }).map((_, index) => (
                <li key={index}>
                    <div
                        className={`block h-8 w-8 rounded border border-gray-100  text-center leading-8 text-gray-900 ${
                            currentPage === index + 1
                                ? 'bg-primary text-white  hover:cursor-default pointer-events-none '
                                : 'bg-white hover:cursor-pointer hover:scale-110   duration-300'
                        }`}
                        onClick={() => handlePageClick(index + 1)}
                    >
                        {index + 1}
                    </div>
                </li>
            ))}

            <li>
                <div
                    className={`inline-flex h-8 w-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180 ${
                        currentPage === totalPages
                            ? 'pointer-events-none opacity-60 hover:cursor-default'
                            : 'hover:scale-110 duration-300 hover:cursor-pointer'
                    }`}
                    onClick={handleNextClick}
                >
                    <span className="sr-only">Next Page</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </li>
        </ol>
    );
}

export default Pagination;
