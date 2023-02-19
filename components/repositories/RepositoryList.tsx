import RepositoryTable from "@/components/repositories/RepositoryTable";
import Link from "next/link";
import {RepositoryType} from "@/types/repositoryType";
import {getTimeDifference} from "@/helpers/getTimeDifference";

const RepositoryList = (
    {handleDeleteRepository, allRepositories, signerAddress, setLoading, loading}:
        {handleDeleteRepository: Function, allRepositories: RepositoryType[] | [], signerAddress: string | null, setLoading: Function, loading: boolean}
) => {

    allRepositories.sort((a, b) => {return Number(b.lastUpdate) - Number(a.lastUpdate)})

    return (
        <>
            { allRepositories.length > 0
                ?
                <RepositoryTable>
                    <tbody>
                    {allRepositories.map(repo =>
                        <tr key={repo.id}>
                            <th scope="row"><Link onClick={() => setLoading(true)} href={`/repository/${repo.id}`}>{repo.name}</Link></th>
                            <td>{getTimeDifference(repo.lastUpdate)}</td>
                            <td className={"w-50"}><a href={repo.forkedFrom}>{repo.forkedFrom.split('https://')[1]}</a></td>
                            <td><button
                                className={"btn btn-danger"}
                                disabled={signerAddress !== repo.owner}
                                onClick={() => handleDeleteRepository(repo.id)}>Delete</button></td>
                        </tr>
                    )}
                    </tbody>
                </RepositoryTable>
                : loading ? null : <h4 className={"m-3"}>No repositories found...</h4>}
        </>
    );
};

export default RepositoryList;