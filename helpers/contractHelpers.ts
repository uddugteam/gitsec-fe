import {getContractWithoutSigner} from "@/helpers/ethersHelpers";

export const getName = async () => {
    const contract = getContractWithoutSigner();

    const name = await contract.name();
    alert(`Contract name: ${name}`)
}