import Layout from "@/components/Layout";
import Link from "next/link";
import RepositoryList from "@/components/repositories/RepositoryList";
import Alert from "@/components/alerts/Alert";
import {useEffect, useState} from "react";
import {deleteRepository, getAllRepositories} from "@/helpers/contractHelpers";
import {RepositoryType} from "@/types/repositoryType";
import {getSignerAddress} from "@/helpers/ethersHelpers";
import Loading from "@/components/Loading";

export default function Home() {
    const [isAlert, setIsAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertText, setAlertText] = useState("");
    const [loading, setLoading] = useState(true);
    const [allRepositories, setAllRepositories] = useState<RepositoryType[] | []>([]);
    const [signerAddress, setSignerAddress] = useState<string | null>("");

    useEffect(() => {
        getSignerAddress().then(r => setSignerAddress(r));
        getAllRepositories().then(r => setAllRepositories(r)).then(() => setLoading(false));
    }, [setAllRepositories, setLoading, setSignerAddress])

    const handleCloseAlert = () => {
        setAlertText("");
        setAlertType("");
        setIsAlert(false);
    }

    const handleDeleteRepository = async (id: string) => {
        setLoading(true);
        const result = await deleteRepository(id);

        if (result.ok) {
            setAlertType("success");
            setAlertText("Repository deleted!");
            setIsAlert(true);
            const repositories = await getAllRepositories();
            setAllRepositories(repositories);
        } else {
            setAlertType("danger");
            setAlertText("Error, please try again");
            setIsAlert(true);
        }

        setLoading(false);
    }

    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item active">Uddugteam</li>
        </ol>;

    return (
        <>
            <Loading show={loading}/>
            <Layout links={links}>
                {isAlert && <Alert closeAlert={handleCloseAlert} type={alertType} text={alertText}/>}
                <h2 className={"mt-3"}>All Repositories</h2>
                <div className="d-grid gap-2 d-md-block">
                    <Link className={"btn btn-success m-1"} href={"/new"}>New repository</Link>
                    <Link className={"btn btn-primary m-1"} href={"/import"}>Fork repository</Link>
                </div>
                <RepositoryList
                    handleDeleteRepository={handleDeleteRepository}
                    allRepositories={allRepositories}
                    signerAddress={signerAddress}
                    setLoading={setLoading}
                    loading={loading}
                />
            </Layout>
        </>
    )
}
