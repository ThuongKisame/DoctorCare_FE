function MatterWrap({ children, propsClass = '' }) {
    return (
        <div className={`${propsClass}`}>
            <div className={`mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 `}>{children}</div>
        </div>
    );
}

export default MatterWrap;
