import Layout from "@/components/Layout";
import Link from "next/link";
import RepositoryLayout from "@/components/repository/RepositoryLayout";
import CodeViewer from "@/components/repositories/CodeViewer";
import {useEffect, useState} from "react";
import {RepositoryType} from "@/types/repositoryType";
import {getRepository} from "@/helpers/contractHelpers";
import {GetServerSideProps} from "next";
import {IpfsType} from "@/types/ipfsType";
import Loading from "@/components/Loading";
import Alert from "@/components/alerts/Alert";

const FileName = ({data}: {data: Data}) => {
    const [fileContent] = useState(data.fileContent);
    const [repo] = useState(data.repo);
    const [name] = useState(data.name);
    const [author] = useState(data.author);
    const [fileIpfs] = useState(data.fileIpfs);
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
            <li className="breadcrumb-item" onClick={() => setLoading(true)}><Link className={"link-light"} href={`/repository/${repo.id}`}>{repo.name}</Link></li>
            <li className="breadcrumb-item active">{name}</li>
        </ol>;

    return (
        <>
            <Loading show={loading}/>
            <Layout links={links}>
                {isAlert && <Alert closeAlert={handleCloseAlert} type={alertType} text={alertText}/>}
                {fileIpfs && name ?
                    <RepositoryLayout repository={repo} ipfs={fileIpfs} author={author}>
                        {fileContent ? <CodeViewer code={fileContent} name={name}/> : <p>Loading...</p>}
                    </RepositoryLayout>
                    : null
                }
            </Layout>
        </>
    );
};

type Data = {
    repo: RepositoryType,
    fileContent: string | null,
    name: string | null,
    fileIpfs: IpfsType | null,
    author: string | null,
    error: string | null
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => {
    const hash = await context.query.fileName;
    const id = await context.query.repoId;

    if (!id) return { notFound: true };

    const repo = await getRepository(id.toString());

    const res = await fetch(`${process.env.IPFS_PROVIDER}/${hash}`);

    if (!res.ok) {
        return {
            props: {
                data: {
                    fileIpfs: null,
                    fileContent: null,
                    repo: repo,
                    name: null,
                    author: null,
                    error: `Error fetching file description: ${res.statusText}`
                },
            },
        }
    }

    const fileDescription = await JSON.parse(await res.text());
    const name = fileDescription.name;
    const author = fileDescription.author;

    const res2 = await fetch(`${process.env.IPFS_PROVIDER}/${fileDescription.hash}`);

    if (!res2.ok) {
        return {
            props: {
                data: {
                    fileIpfs: fileDescription,
                    fileContent: null,
                    repo: repo,
                    name: name,
                    author: author,
                    error: `Error fetching file content: ${res.statusText}`
                },
            },
        }
    }

    const fileContent = await res2.text();

    return {
        props: {
            data: {
                fileIpfs: fileDescription,
                fileContent: fileContent,
                repo: repo,
                name: name,
                author: author,
                error: null
            },
        },
    }
}

export default FileName;