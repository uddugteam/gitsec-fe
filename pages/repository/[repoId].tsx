import Layout from "@/components/Layout";
import Link from "next/link";
import FilesList from "@/components/repository/FilesList";
import RepositoryLayout from "@/components/repository/RepositoryLayout";
import {useState} from "react";
import {RepositoryType} from "@/types/repositoryType";
import {getRepository} from "@/helpers/contractHelpers";
import QuickSetup from "@/components/repository/QuickSetup";
import {GetServerSideProps} from "next";
import {IpfsType} from "@/types/ipfsType";
import Loading from "@/components/Loading";
import * as process from "process";


const RepoId = ({data}: {data: Data}) => {
    const [repository] = useState(data.repo);
    const [ipfs] = useState(data.ipfs);
    const [loading, setLoading] = useState(false);

    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className={"link-light"} href="/">Uddugteam</Link></li>
            <li className="breadcrumb-item active">{repository.name}</li>
        </ol>;

    return (
        <>
            <Loading show={loading}/>
            <Layout links={links}>
                <RepositoryLayout repository={repository} ipfs={ipfs} author={null}>
                    <>{ipfs.content.length > 0 ? <FilesList ipfs={ipfs} setLoading={setLoading}/> : <QuickSetup url={ipfs.external_url}/>}</>
                </RepositoryLayout>
            </Layout>
        </>
    );
};

type Data = {
    repo: RepositoryType,
    ipfs: IpfsType
}


export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => {
    const id = await context.query.repoId;

    if (id) {
        let repo = await getRepository(id.toString());

        while (repo.ipfs === '') {
            repo = await getRepository(id.toString());
        }

        const res = await fetch(`${process.env.IPFS_PROVIDER}/${repo.ipfs}`);
        const ipfs = await JSON.parse(await res.text());
        return {
            props: {
                data: {
                    ipfs: ipfs,
                    repo: repo,
                },
            },
        }
    } else {
        return {
            redirect: {
                destination: "/",
                permanent: false
            }
        }
    }
}

export default RepoId;