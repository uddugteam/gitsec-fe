const QuickSetup = ({url}: {url: string }) => {
    return (
        <div className={"container mt-3"}>
            <h3>Quick Setup</h3>
            <div className={"input-group mt-3"}>
                <span className={"input-group-text"}>HTTP</span>
                <span className={"input-group-text w-50 user-select-all"}>{url}</span>
            </div>
            <h4 className={"mt-3"}>Create new repository on the command line</h4>
            <div className={"card mt-3"}>
                <div className={"card-body"}>
                    <samp className={"card-text"}>echo &quot;# qqq&quot; &gt;&gt; README.md</samp><br/>
                    <samp className={"card-text"}>git init</samp><br/>
                    <samp className={"card-text"}>git add README.md</samp><br/>
                    <samp className={"card-text"}>git commit -m &quot;first commit&quot;</samp><br/>
                    <samp className={"card-text"}>git branch -M main</samp><br/>
                    <samp className={"card-text"}>git remote add origin {url}</samp><br/>
                    <samp className={"card-text"}>git push -u origin main</samp>
                </div>
            </div>
            <h4 className={"mt-3"}>Push an existing repository form the command line</h4>
            <div className={"card mt-3"}>
                <div className={"card-body"}>
                    <samp className={"card-text"}>git remote add origin {url}</samp><br/>
                    <samp className={"card-text"}>git branch -M main</samp><br/>
                    <samp className={"card-text"}>git push -u origin main</samp>
                </div>
            </div>
        </div>
    );
};

export default QuickSetup;