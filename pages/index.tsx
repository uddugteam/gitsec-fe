import Layout from "@/components/Layout";
import Link from "next/link";
import RepositoryList from "@/components/repositories/RepositoryList";
import Alert from "@/components/alerts/Alert";
import {useState} from "react";
import {deleteRepository} from "@/helpers/contractHelpers";

export default function Home() {
    const [isAlert, setIsAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertText, setAlertText] = useState("");

    const handleCloseAlert = () => {
        setAlertText("");
        setAlertType("");
        setIsAlert(false);
    }

    const handleDeleteRepository = async (id: string) => {
        const result = await deleteRepository(id);

        if (result.ok) {
            setAlertType("success");
            setAlertText("Repository created!");
            setIsAlert(true);
        } else {
            setAlertType("danger");
            setAlertText("Error, please try again");
            setIsAlert(true);
        }
    }

    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item active">Uddugteam</li>
        </ol>;

    return (
        <Layout links={links}>
            {isAlert && <Alert closeAlert={handleCloseAlert} type={alertType} text={alertText}/>}
            <h2 className={"mt-3"}>All Repositories</h2>
            <Link className={"btn btn-success mt-3"} href={"/new"}>New repository</Link><br/>
            <RepositoryList handleDeleteRepository={handleDeleteRepository}/>
        </Layout>
    )
}
