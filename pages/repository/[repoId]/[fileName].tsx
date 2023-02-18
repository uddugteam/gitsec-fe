import Layout from "@/components/Layout";
import Link from "next/link";
import RepositoryLayout from "@/components/repository/RepositoryLayout";
import CodeViewer from "@/components/repositories/CodeViewer";
import {useState} from "react";
import {RepositoryType} from "@/types/repositoryType";
import {getRepository} from "@/helpers/contractHelpers";
import {GetServerSideProps} from "next";
import {IpfsType} from "@/types/ipfsType";
import Loading from "@/components/Loading";

const FileName = ({data}: {data: Data}) => {
    const [ipfs] = useState(data.ipfs);
    const [repo] = useState(data.repo);
    const [name] = useState(data.name);
    const [author] = useState(data.author);
    const [fileIpfs] = useState(data.fileIpfs);
    const [loading, setLoading] = useState(false);

    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className={"link-light"} href="/">Uddugteam</Link></li>
            <li className="breadcrumb-item" onClick={() => setLoading(true)}><Link className={"link-light"} href={`/repository/${repo.id}`}>{repo.name}</Link></li>
            <li className="breadcrumb-item active">{name}</li>
        </ol>;

    return (
        <>
            {loading ? <Loading/> : <Layout links={links}>
                <RepositoryLayout repository={repo} ipfs={fileIpfs} author={author}>
                    {ipfs ? <CodeViewer code={ipfs} name={name}/> : <p>Loading...</p>}
                </RepositoryLayout>
            </Layout>}
        </>
    );
};

type Data = {
    repo: RepositoryType,
    ipfs: string
    name: string,
    fileIpfs: IpfsType,
    author: string
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => {
    const hash = await context.query.fileName;
    const id = await context.query.repoId;

    const repo = await getRepository(id ? id.toString() : "0");
    const res = await fetch(`https://gateway.pinata.cloud/ipfs/${hash}`);
    const resJson = await JSON.parse(await res.text());
    const name = resJson.name;
    const author = resJson.author;
    const res2 = await fetch(`https://gateway.pinata.cloud/ipfs/${resJson.hash}`);
    const ipfs = await res2.text();
    return {
        props: {
            data: {
                fileIpfs: resJson,
                ipfs: ipfs,
                repo: repo,
                name: name,
                author: author,
            },
        },
    }
}

export default FileName;