function ModelWrapper({ children }) {
    return (
        <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-slate-300 bg-opacity-75">
            {children}
        </div>
    );
}

export default ModelWrapper;
