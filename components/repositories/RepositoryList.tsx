import RepositoryTable from "@/components/repositories/RepositoryTable";
import Link from "next/link";
import {RepositoryType} from "@/types/repositoryType";
import {useEffect, useState} from "react";
import {getAllRepositories} from "@/helpers/contractHelpers";
import {getSignerAddress} from "@/helpers/ethersHelpers";

const RepositoryList = () => {
    const [allRepositories, setAllRepositories] = useState<RepositoryType[] | []>([]);
    const [signerAddress, setSignerAddress] = useState<string | null>("");
    const [isAllRepositoriesSet, setIsAllRepositoriesSet] = useState(false);

    useEffect(() => {
        getSignerAddress().then(r => setSignerAddress(r));
        getAllRepositories().then(r => setAllRepositories(r)).then(() => setIsAllRepositoriesSet(true));
    }, [setAllRepositories, setSignerAddress])

    return (
        <>
            {isAllRepositoriesSet
                ? allRepositories.length > 0
                    ?
                    <RepositoryTable>
                        <tbody>
                        {allRepositories.map(repo =>
                            <tr key={repo.id}>
                                <th scope="row"><Link href={`/repository/${repo.id}`}>{repo.name}</Link></th>
                                <td className={"w-75"}>5 minutes ago</td>
                                {signerAddress === repo.owner && <td><button className={"btn btn-danger"}>Delete</button></td>
                                }
                            </tr>
                        )}
                        </tbody>
                    </RepositoryTable>
                    : <h4 className={"m-3"}>No repositories found...</h4>
                : <p className={"mt-3"}>Loading...</p>}
        </>
    );
};

export default RepositoryList;