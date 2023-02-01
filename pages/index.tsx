import Layout from "@/components/Layout";
import Link from "next/link";
import RepositoryList from "@/components/repositories/RepositoryList";
import {getName} from "@/helpers/contractHelpers";

export default function Home() {
    const links =
        <ol className="breadcrumb">
            <li className="breadcrumb-item active">Uddugteam</li>
        </ol>;

    return (
        <Layout links={links}>
            <h2 className={"mt-3"}>All Repositories</h2>
            <Link className={"btn btn-success mt-3"} href={"/new"}>New repository</Link><br/>
            <RepositoryList/>
            <button className={"btn btn-primary"} onClick={() => getName()}>Get contract name (test)</button>
        </Layout>
    )
}
