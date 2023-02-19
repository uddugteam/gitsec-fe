import {ReactNode, useState} from "react";
import {RepositoryType} from "@/types/repositoryType";
import {IpfsType} from "@/types/ipfsType";

const RepositoryLayout = (
    {children, repository, ipfs, author}: {children: ReactNode, repository: RepositoryType, ipfs: IpfsType, author: string | null}
) => {
    const [show, setShow] = useState('hide');
    let date

    if (ipfs.timestamp === '' || Number(ipfs.timestamp) === 0) {
        date = '';
    } else {
        date = new Date(Number(ipfs.timestamp) * 1000).toISOString().split('T')[0];
    }
    const owner = repository.owner.slice(0, 5) + '...' + repository.owner.slice(repository.owner.length - 5, repository.owner.length)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(ipfs.external_url);
        setShow("show");
    }

    return (
        <>
            <h2>{repository.name}</h2>
            <div className={"container row"}>
                {ipfs.external_url &&
                    <div className={"col-12"}>
                        <div className={"input-group mt-3"}>
                            <span className={"input-group-text"}>Clone</span>
                            <samp className={"input-group-text user-select-all"}>git clone {ipfs.external_url}</samp>
                            <span className={"btn btn-primary"} id="liveToastBtn" onClick={handleCopy}>Copy</span>
                        </div>
                        <div className="toast-container position-fixed bottom-0 end-0 p-3">
                            <div id="liveToast" className={`toast fade ${show}`} role="alert" aria-live="assertive"
                                 aria-atomic="true">
                                <div className="toast-header bg-success">
                                    <strong className="me-auto text-light">Clone cmd copied!</strong>
                                    <button type="button" className="btn-close" onClick={() => setShow('hide')}/>
                                </div>
                            </div>
                        </div>
                    </div>

                }
                <div className={"col-9"}>
                    <div className={"row bg-secondary text-white mt-3 p-3 rounded-2"}>
                        {author ? <div className={"col"}>Author: {author}</div> : <div className={"col"}>Owner: {owner}</div>}
                        <div className={"col-auto"}>{ipfs.commit}</div>
                        <div className={"col-auto"}>{date}</div>
                        <div className={"col-auto"}>{ipfs.commits_count ? `${ipfs.commits_count} commits` : ''} </div>
                    </div>
                    <div className={"row"}>
                        {children}
                    </div>
                </div>
                <div className={"col-3"}>
                    <div className={"card m-3"}>
                        <div className={"card-header"}>
                            <h4>About</h4>
                        </div>
                        <div className={"card-body"}>
                            <p className={"card-text"}>{repository.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RepositoryLayout;