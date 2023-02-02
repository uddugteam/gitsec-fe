import Layout from "@/components/Layout";
import Link from "next/link";
import FilesList from "@/components/repository/FilesList";
import RepositoryLayout from "@/components/repository/RepositoryLayout";
import {useEffect, useState} from "react";
import {RepositoryType} from "@/types/repositoryType";
import {getRepository} from "@/helpers/contractHelpers";
import {useRouter} from "next/router";
import QuickSetup from "@/components/repository/QuickSetup";

const initialRepo = {
    id: "-",
    owner: "-",
    name: "-",
    description: "-",
    ipfs: "-",
}

const RepoId = () => {
    const router = useRouter();
    const [repository, setRepository] = useState<RepositoryType>(initialRepo);
    const [id, setId] = useState("");
    const [isRepositorySet, setIsRepositorySet] = useState(false);

    useEffect(() => {
        if (router.query.repoId) {
            setId(router.query.repoId.toString());
        }
    }, [router])

    useEffect(() => {
        if (id !== "") {
            getRepository(id.toString()).then(r => setRepository(r)).then(() => setIsRepositorySet(true))
        }
    }, [id, setRepository])

    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className={"link-light"} href="/">Uddugteam</Link></li>
            <li className="breadcrumb-item active">{repository.name}</li>
        </ol>;

    return (
        <Layout links={links}>
            <RepositoryLayout repository={repository}>
                <>{isRepositorySet ? repository.ipfs ? <FilesList/> : <QuickSetup/> : <p className={"mt-3"}>Loading...</p>}</>
            </RepositoryLayout>
        </Layout>
    );
};

export default RepoId;