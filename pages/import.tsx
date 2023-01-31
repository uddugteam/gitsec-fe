import Layout from "@/components/Layout";
import Link from "next/link";
import {useState} from "react";

const Import = () => {
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");

    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className={"link-light"} href="/">Uddugteam</Link></li>
            <li className="breadcrumb-item"><Link className={"link-light"} href="/new">New repository</Link></li>
            <li className="breadcrumb-item active">Import</li>
        </ol>;

    return (
        <Layout links={links}>
            <h2 className={"mt-3"}>Import your GitHub project</h2>
            <p>Import all files, including the revision history, from another version control system.</p>
            <hr/>
            <form>
                <label htmlFor="url" className="form-label mt-3">Your old repository’s clone URL</label>
                <input
                    type={"url"}
                    className={"form-control"}
                    id={"url"}
                    value={url}
                    onChange={event => setUrl(event.target.value)}
                    required={true}
                />
                <div className={"input-group mt-3"}>
                    <input type="text" className="form-control" disabled={true} value={"Uddugteam"}/>
                    <span className="input-group-text">/</span>
                    <input
                        type="text"
                        className="form-control w-75"
                        id={"name"}
                        value={name}
                        onChange={event => setName(event.target.value)}
                        placeholder={"Repository name"}
                        required={true}
                    />
                </div>
                <button className={"btn btn-success mt-4"} type={"submit"}>Import</button>
            </form>
        </Layout>
    );
};

export default Import;