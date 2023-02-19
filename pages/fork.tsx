import Layout from "@/components/Layout";
import Link from "next/link";
import React, {FormEvent, useState} from "react";
import {forkRepo} from "@/helpers/contractHelpers";
import Loading from "@/components/Loading";
import Alert from "@/components/alerts/Alert";

const Fork = () => {
    const [url, setUrl] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertText, setAlertText] = useState("");

    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className={"link-light"} href="/">Uddugteam</Link></li>
            <li className="breadcrumb-item"><Link className={"link-light"} href="/new">New repository</Link></li>
            <li className="breadcrumb-item active">Fork</li>
        </ol>;

    const handleForkRepository = async (event: FormEvent) => {
        setLoading(true);
        event.preventDefault();

        const result = await forkRepo(name, description, url);

        if (result.ok) {
            setAlertType("success");
            setAlertText("Repository forked!");
            setIsAlert(true);
            setName("");
            setDescription("");
            setUrl("");
        } else {
            setAlertType("danger");
            setAlertText("Error, please try again");
            setIsAlert(true);
        }

        setLoading(false);
    }

    const handleCloseAlert = () => {
        setAlertText("");
        setAlertType("");
        setIsAlert(false);
    }

    return (
        <Layout links={links}>
            <Loading show={loading}/>
            {isAlert && <Alert closeAlert={handleCloseAlert} type={alertType} text={alertText}/>}
            <h2 className={"mt-3"}>Fork GitHub project from any public repository</h2>
            <p>Import all files, including the revision history, from another git-based code hosting.</p>
            <hr/>
            <form onSubmit={event => handleForkRepository(event)}>
                <label htmlFor="url" className="form-label mt-3">Repository’s clone URL</label>
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
                <textarea
                    className={"form-control mt-3"}
                    rows={3}
                    id={"description"}
                    value={description}
                    onChange={event => setDescription(event.target.value)}
                    placeholder={"Repository description..."}
                />
                <button className={"btn btn-success mt-4"} type={"submit"}>Fork</button>
            </form>
        </Layout>
    );
};

export default Fork;