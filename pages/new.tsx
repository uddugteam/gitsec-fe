import Layout from "@/components/Layout";
import Link from "next/link";
import {FormEvent, useState} from "react";
import {createRepo} from "@/helpers/contractHelpers";
import Alert from "@/components/alerts/Alert";
import Loading from "@/components/Loading";

const New = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertText, setAlertText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleCloseAlert = () => {
        setAlertText("");
        setAlertType("");
        setIsAlert(false);
    }

    const handleNewRepository = async (event: FormEvent) => {
        setLoading(true);
        event.preventDefault();

        const result = await createRepo(name, description);

        if (result.ok) {
            setAlertType("success");
            setAlertText("Repository created!");
            setIsAlert(true);
            setName("");
            setDescription("");
        } else {
            setAlertType("danger");
            setAlertText("Error, please try again");
            setIsAlert(true);
        }

        setLoading(false);
    }

    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className={"link-light"} href="/">Uddugteam</Link></li>
            <li className="breadcrumb-item active">New repository</li>
        </ol>;

    return (
        <>
            <Loading show={loading}/>
            <Layout links={links}>
                {isAlert && <Alert closeAlert={handleCloseAlert} type={alertType} text={alertText}/>}
                <h2 className={"mt-3"}>Create new repository</h2>
                <p className={"mt-3"}>A repository contains all project files, including the revision history. Already have a project
                    repository elsewhere? <Link href={"/fork"}>Fork a repository.</Link></p>
                <hr/>
                <form onSubmit={event => handleNewRepository(event)}>
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
                    <button className={"btn btn-success mt-4"} type={"submit"}>Create</button>
                </form>
            </Layout>
        </>
    );
};

export default New;