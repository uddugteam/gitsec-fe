import Layout from "@/components/Layout";
import Link from "next/link";
import RepositoryLayout from "@/components/repository/RepositoryLayout";
import CodeViewer from "@/components/repositories/CodeViewer";

const FileName = () => {
    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link className={"link-light"} href="/">Uddugteam</Link></li>
            <li className="breadcrumb-item"><Link className={"link-light"} href="/repository/1">Repo name</Link></li>
            <li className="breadcrumb-item active">File name</li>
        </ol>;

    return (
        <Layout links={links}>
            <RepositoryLayout>
                <CodeViewer/>
            </RepositoryLayout>
        </Layout>
    );
};

export default FileName;