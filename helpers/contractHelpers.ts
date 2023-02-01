import {getContractWithoutSigner, getContractWithSigner, getSignerAddress} from "@/helpers/ethersHelpers";
import {RepositoryType} from "@/types/repositoryType";

export const createRepo = async (name: string, description: string) => {
    const contract = await getContractWithSigner();

    if (contract) {
        try {
            const tx = await contract.createRepository(name, description);
            await tx.wait();
            return {ok: true};
        } catch (error) {
            console.error(`Create new repo error: ${error}`);
        }
    }

    return {ok: false};
}

export const getAllRepositories = async () => {
    const contract = getContractWithoutSigner();
    let allRepo: RepositoryType[] = [];

    if (contract) {
        const repos = await contract.getAllRepositories();

        if (repos) {
            for (const repo of repos) {
                allRepo.push({
                    id: repo.id.toString(),
                    owner: repo.owner,
                    name: repo.name,
                    description: repo.description,
                    ipfs: repo.ipfs,
                })
            }
        }
    }

    return allRepo;
}

export const getUserRepositories = async () => {
    const contract = getContractWithoutSigner();
    let userRepos: RepositoryType[] = [];

    if (contract) {
        const signer = await getSignerAddress();

        if (signer) {
            const repos = await contract.getUserRepositories(signer);

            if (repos) {
                for (const repo of repos) {
                    userRepos.push({
                        id: repo.id.toString(),
                        owner: repo.owner,
                        name: repo.name,
                        description: repo.description,
                        ipfs: repo.ipfs,
                    })
                }
            }
        }
    }

    return userRepos;
}