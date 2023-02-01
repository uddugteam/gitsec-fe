import RepositoryTable from "@/components/repositories/RepositoryTable";
import Link from "next/link";
import {RepositoryType} from "@/types/repositoryType";
import {useEffect, useState} from "react";
import {getAllRepositories} from "@/helpers/contractHelpers";
import {getSignerAddress} from "@/helpers/ethersHelpers";

const RepositoryList = () => {
    const [userRepositories, setUserRepositories] = useState<RepositoryType[] | []>([]);
    const [signerAddress, setSignerAddress] = useState<string | null>("");

    useEffect(() => {
        getSignerAddress().then(r => setSignerAddress(r))
        getAllRepositories().then(r => setUserRepositories(r))
    }, [setUserRepositories])

    return (
        <>
            {userRepositories.length > 0
                ?
                <RepositoryTable>
                    <tbody>
                    {userRepositories.map(repo =>
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
                }
        </>
    );
};

export default RepositoryList;