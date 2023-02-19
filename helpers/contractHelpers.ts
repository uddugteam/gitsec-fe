import {getContractWithoutSigner, getContractWithSigner, getSignerAddress} from "@/helpers/ethersHelpers";
import {RepositoryType} from "@/types/repositoryType";

export const deleteRepository = async (id: string) => {
    const contract = await getContractWithSigner();

    if (contract) {
        try {
            const tx = await contract.deleteRepository(id);
            await tx.wait();
            return {ok: true}
        } catch (error) {
            console.error(`Delete repo error: ${error}`)
        }
    }

    return {ok: false}
}

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

export const forkRepo = async (name: string, description: string, url: string) => {
    const contract = await getContractWithSigner();

    if (contract) {
        try {
            const tx = await contract.forkRepository(name, description, url);
            await tx.wait();
            return {ok: true};
        } catch (error) {
            console.error(`Fork repo error: ${error}`);
        }
    }

    return {ok: false};
}

export const getRepository = async (id: string) => {
    const contract = getContractWithoutSigner();
    if (contract) {
        const repo = await contract.getRepository(id);
        return {
            id: repo.id.toString(),
            owner: repo.owner,
            name: repo.name,
            description: repo.description,
            ipfs: repo.IPFS,
            lastUpdate: repo.lastUpdate.toString(),
            forkedFrom: repo.forkedFrom
        }
    }

    return {
        id: "-",
        owner: "-",
        name: "-",
        description: "-",
        ipfs: "-",
        lastUpdate: '-',
        forkedFrom: "-"
    };
}

export const getAllRepositories = async () => {
    const contract = getContractWithoutSigner();

    if (contract) {
        const repos = await contract.getAllRepositories();

        if (repos) {
            return _createRepoArr(repos);
        }
    }

    return [];
}

export const getUserRepositories = async () => {
    const contract = getContractWithoutSigner();

    if (contract) {
        const signer = await getSignerAddress();

        if (signer) {
            const repos = await contract.getUserRepositories(signer);

            if (repos) {
                return _createRepoArr(repos);
            }
        }
    }

    return [];
}

const _createRepoArr = (repos: RepositoryType[]) => {
    let userRepos: RepositoryType[] = [];

    for (const repo of repos) {
        userRepos.push({
            id: repo.id.toString(),
            owner: repo.owner,
            name: repo.name,
            description: repo.description,
            ipfs: repo.ipfs,
            lastUpdate: repo.lastUpdate.toString(),
            forkedFrom: repo.forkedFrom
        })
    }

    return userRepos;
}