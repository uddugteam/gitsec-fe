import Layout from "@/components/Layout";
import Link from "next/link";
import FilesList from "@/components/repository/FilesList";
import RepositoryLayout from "@/components/repository/RepositoryLayout";

const RepoId = () => {
    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className={"link-light"} href="/">Uddugteam</Link></li>
            <li className="breadcrumb-item active">Repo name</li>
        </ol>;

    return (
        <Layout links={links}>
            <RepositoryLayout>
                <FilesList/>
            </RepositoryLayout>
        </Layout>
    );
};

export default RepoId;