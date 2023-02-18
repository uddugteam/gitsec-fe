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
            {!loading ? <Layout links={links}>
            <RepositoryLayout repository={repository} ipfs={ipfs} author={null}>
                <>{ipfs.content.length > 0 ? <FilesList ipfs={ipfs} setLoading={setLoading}/> : <QuickSetup/>}</>
            </RepositoryLayout>
        </Layout> : <Loading/>}
        </>
    );
};

type Data = {
    repo: RepositoryType,
    ipfs: IpfsType
}

const zeroIpfs: IpfsType = {
    name: "",
    external_url: "",
    description: "",
    content: [],
    commit: "",
    timestamp: "",
    commits_count: ""
}

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async (context) => {
    const id = await context.query.repoId;

    const repo = await getRepository(id ? id.toString() : "0");
    if (repo.ipfs === '') {
        return {
            props: {
                data: {
                    ipfs: zeroIpfs,
                    repo: repo,
                }
            }
        }
    } else {
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
}

export default RepoId;