import { memo } from 'react';
import { BiHomeCircle } from 'react-icons/bi';
function Breadcrumbs({ path, arrButton = [] }) {
    const handleRefreshData = () => {
        const currentPathname = window.location.pathname;
        window.location.replace(currentPathname);
    };
    return (
        <div className="">
            <div className="flex items-center justify-between px-4 py-2 text-gray-600 shadow-sm">
                <div className="flex items-center">
                    <BiHomeCircle size={20} /> <span className="font-medium text-sm ml-1">{path}</span>
                </div>
                <div className="flex gap-2">
                    <button
                        className="inline-block rounded border border-current px-2 py-1 text-xs font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-primary"
                        onClick={handleRefreshData}
                    >
                        Refresh
                    </button>
                    {arrButton.map((e, index) => (
                        <button
                            className="inline-block rounded border border-current px-2 py-1 text-xs font-medium text-primary transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-primary"
                            key={index}
                            onClick={e?.handleClick}
                            type={e?.type || ''}
                        >
                            {e.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(Breadcrumbs);
