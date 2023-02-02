import Layout from "@/components/Layout";
import Link from "next/link";
import RepositoryLayout from "@/components/repository/RepositoryLayout";
import CodeViewer from "@/components/repositories/CodeViewer";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {RepositoryType} from "@/types/repositoryType";
import {getRepository} from "@/helpers/contractHelpers";

const initialRepo = {
    id: "-",
    owner: "-",
    name: "-",
    description: "-",
    ipfs: "-",
}

const FileName = () => {
    const router = useRouter();
    const [repository, setRepository] = useState<RepositoryType>(initialRepo);
    const [id, setId] = useState("#");
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
            <li className="breadcrumb-item"><Link className={"link-light"} href={`/repository/${id}`}>Repo name</Link></li>
            <li className="breadcrumb-item active">File name</li>
        </ol>;

    return (
        <Layout links={links}>
            <RepositoryLayout repository={repository}>
                {isRepositorySet ? <CodeViewer/> : <p>Loading...</p>}
            </RepositoryLayout>
        </Layout>
    );
};

export default FileName;