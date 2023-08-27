function Loading() {
    const loading = process.env.PUBLIC_URL + '/loadingPikachu.gif';
    return (
        <div className="flex items-center justify-center fixed top-0 left-0 w-screen h-screen bg-slate-300 bg-opacity-75 z-50">
            <img className="w-20 h-20 object-contain " src={loading} alt="loading"/>
        </div>
    );
}

export default Loading;
