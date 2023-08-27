import { memo } from 'react';
import { MdLibraryAdd } from 'react-icons/md';

function TableController({ setShowAddUserModel = false }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 ">
                {setShowAddUserModel && (
                    <button
                        className="inline-block rounded border border-current px-1 py-1 text-xs font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-primary"
                        onClick={setShowAddUserModel}
                    >
                        <MdLibraryAdd size={20} />
                    </button>
                )}
            </div>
            <div className="relative w-2/6">
                <label htmlFor="Search" className="sr-only">
                    {' '}
                    Search{' '}
                </label>

                <input
                    type="text"
                    id="Search"
                    placeholder="Search for..."
                    className="w-full rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm px-2 border focus:outline-primary "
                />

                <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                    <button type="button" className="text-gray-600 font-medium hover:text-primary">
                        <span className="sr-only">Search</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    </button>
                </span>
            </div>
        </div>
    );
}

export default memo(TableController);
