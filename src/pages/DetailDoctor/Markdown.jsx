function Markdown({ contentHTML }) {
    return <div className="py-4" dangerouslySetInnerHTML={{ __html: contentHTML }}></div>;
}

export default Markdown;
