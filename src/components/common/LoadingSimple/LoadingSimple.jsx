import { AiOutlineLoading3Quarters } from 'react-icons/ai';

function LoadingSimple() {
    return (
        <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-slate-300 bg-opacity-0 z-50">
            <AiOutlineLoading3Quarters className="animate-spin" size={20} />
        </div>
    );
}

export default LoadingSimple;
