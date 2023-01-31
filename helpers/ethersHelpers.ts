import Gitsec from "@/contracts/GitsecContract.json";
import {ethers} from "ethers";
import * as process from "process";

export const connect = async () => {
    const {isInstalled, metamask} = _getMatamask();

    if (isInstalled) {
        if (await _isNetworkValid(metamask)) {
            await metamask.request({ method: 'eth_requestAccounts' });
            return metamask;
        }
    }

    return null;
}

export const getContractWithoutSigner = () => {
    const provider = new ethers.providers.JsonRpcProvider("https://rpc.chiadochain.net");
    return new ethers.Contract(
        process.env.NEXT_PUBLIC_GITSEC_ADDRESS as string,
        Gitsec.abi,
        provider
    );
}

export const getContractWithSigner = async () => {
    const metamask = await connect();

    if (metamask) {
        const provider = new ethers.providers.Web3Provider(metamask);
        const signer = await provider.getSigner();

        return new ethers.Contract(
            process.env.NEXT_PUBLIC_GITSEC_ADDRESS as string,
            Gitsec.abi,
            signer
        );
    }

    return null;
}

const _getMatamask = () => {
    // @ts-ignore
    const {ethereum} = window;

    if (!ethereum || !ethereum.isMetaMask) {
        alert("Please install metamask");
        console.error("Ethereum not found in browser or it is not Metamask");
        return {
            isInstalled: false,
            metamask: null
        }
    }

    return {
        isInstalled: true,
        metamask: ethereum
    }
}

const _isNetworkValid = async (metamask: any) => {
    const networkId = await metamask.networkVersion;

    if (networkId === "10200") {
        return true;
    }

    alert("Please connect to chiado test chain");
    console.error(`Connected to ${networkId}, need to connect to chiado chain`);
}