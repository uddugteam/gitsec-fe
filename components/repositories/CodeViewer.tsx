import SyntaxHighlighter from 'react-syntax-highlighter';

const languages = {
    md: "markdown",
    ts: "typescript",
    js: "javascript",
    json: "json",
}

const CodeViewer = ({code, name}: {code: string, name: string}) => {
    const extension = name.split('.').slice(-1)[0];
    // @ts-ignore
    let lang = languages[extension];
    lang = lang ? lang : "javascript";

    return (
        <SyntaxHighlighter language={lang} showLineNumbers={true}>
            {code}
        </SyntaxHighlighter>
    );
};

export default CodeViewer;