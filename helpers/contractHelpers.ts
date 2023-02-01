import {getContractWithoutSigner, getContractWithSigner} from "@/helpers/ethersHelpers";

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


export const getName = async () => {
    const contract = getContractWithoutSigner();

    const name = await contract.name();
    alert(`Contract name: ${name}`)
}