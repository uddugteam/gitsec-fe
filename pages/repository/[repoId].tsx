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


const RepoId = ({data}: {data: Data}) => {
    const [repository] = useState(data.repo);
    const [ipfs] = useState(data.ipfs)

    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className={"link-light"} href="/">Uddugteam</Link></li>
            <li className="breadcrumb-item active">{repository.name}</li>
        </ol>;

    return (
        <Layout links={links}>
            <RepositoryLayout repository={repository}>
                <>{repository ? ipfs.content.length > 0 ? <FilesList ipfs={ipfs}/> : <QuickSetup/> : <p className={"mt-3"}>Loading...</p>}</>
            </RepositoryLayout>
        </Layout>
    );
};

type Data = {
    repo: RepositoryType,
    ipfs: IpfsType
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => {
    const id = await context.query.repoId;

    const repo = await getRepository(id ? id.toString() : "0");
    const res = await fetch(`https://gateway.pinata.cloud/ipfs/${repo.ipfs}`);
    const ipfs = await JSON.parse(await res.text());
    return {
        props: {
            data: {
                ipfs: ipfs,
                repo: repo,
            },
        },
    }
}

export default RepoId;