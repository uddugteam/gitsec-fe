import RepositoryTable from "@/components/repositories/RepositoryTable";
import Link from "next/link";
import {RepositoryType} from "@/types/repositoryType";
import {getTimeDifference} from "@/helpers/getTimeDifference";

const RepositoryList = (
    {handleDeleteRepository, allRepositories, signerAddress, setLoading}:
        {handleDeleteRepository: Function, allRepositories: RepositoryType[] | [], signerAddress: string | null, setLoading: Function}
) => {
    return (
        <>
            { allRepositories.length > 0
                ?
                <RepositoryTable>
                    <tbody>
                    {allRepositories.map(repo =>
                        <tr key={repo.id}>
                            <th scope="row"><Link onClick={() => setLoading(true)} href={`/repository/${repo.id}`}>{repo.name}</Link></th>
                            <td className={"w-75"}>{getTimeDifference(repo.lastUpdate)}</td>
                            <td><button
                                className={"btn btn-danger"}
                                disabled={signerAddress !== repo.owner}
                                onClick={() => handleDeleteRepository(repo.id)}>Delete</button></td>
                        </tr>
                    )}
                    </tbody>
                </RepositoryTable>
                : <h4 className={"m-3"}>No repositories found...</h4>}
        </>
    );
};

export default RepositoryList;