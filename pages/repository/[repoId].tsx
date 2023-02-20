import Layout from "@/components/Layout";
import Link from "next/link";
import FilesList from "@/components/repository/FilesList";
import RepositoryLayout from "@/components/repository/RepositoryLayout";
import {useEffect, useState} from "react";
import {RepositoryType} from "@/types/repositoryType";
import {getRepository} from "@/helpers/contractHelpers";
import QuickSetup from "@/components/repository/QuickSetup";
import {GetServerSideProps} from "next";
import {IpfsType} from "@/types/ipfsType";
import Loading from "@/components/Loading";
import * as process from "process";
import Alert from "@/components/alerts/Alert";


const RepoId = ({data}: {data: Data}) => {
    const [repository] = useState(data.repo);
    const [ipfs] = useState(data.ipfs);
    const [error] = useState(data.error);
    const [loading, setLoading] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [alertType, setAlertType] = useState("");
    const [alertText, setAlertText] = useState("");

    useEffect(() => {
        if (error) {
            setAlertText(error);
            setAlertType("danger");
            setIsAlert(true)
            console.error(error);
        }
    }, [error])

    const handleCloseAlert = () => {
        setAlertText("");
        setAlertType("");
        setIsAlert(false);
    }

    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className={"link-light"} href="/">Uddugteam</Link></li>
            <li className="breadcrumb-item active">{repository ? repository.name : "-"}</li>
        </ol>;

    return (
        <>
            <Loading show={loading}/>
            <Layout links={links}>
                {isAlert && <Alert closeAlert={handleCloseAlert} type={alertType} text={alertText}/>}
                {repository && ipfs ?
                    <RepositoryLayout repository={repository} ipfs={ipfs} author={null}>
                        <>{ipfs.content.length > 0 ? <FilesList id={repository.id} ipfs={ipfs} setLoading={setLoading}/> : <QuickSetup url={ipfs.external_url}/>}</>
                    </RepositoryLayout>
                    : null
                }
            </Layout>
        </>
    );

};

type Data = {
    repo: RepositoryType | null,
    ipfs: IpfsType | null,
    error: string | null,
}


export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => {
    const id = await context.query.repoId;

    if (!id) return { notFound: true };

    let repo = await getRepository(id.toString());

    while (repo.ipfs === '') {
        repo = await getRepository(id.toString());
    }

    const res = await fetch(`${process.env.IPFS_PROVIDER}/${repo.ipfs}`);

    if (!res.ok) {
        return {
            props: {
                data: {
                    ipfs: null,
                    repo: null,
                    error: `Error fetching repository structure: ${res.statusText}`,
                }
            }
        }
    }

    const repositoryStructure = await JSON.parse(await res.text());

    return {
        props: {
            data: {
                ipfs: repositoryStructure,
                repo: repo,
                error: null,
            },
        },
    }
}

export default RepoId;