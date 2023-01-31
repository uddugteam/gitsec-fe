import RepositoryTable from "@/components/repositories/RepositoryTable";
import Link from "next/link";

const RepositoryList = () => {
    return (
        <RepositoryTable>
            <tbody>
            <tr>
                <th scope="row"><Link href={"/repository/1"}>Repo name</Link></th>
                <td className={"w-75"}>5 minutes ago</td>
                <td><button className={"btn btn-danger"}>Delete</button></td>
            </tr>
            </tbody>
        </RepositoryTable>
    );
};

export default RepositoryList;