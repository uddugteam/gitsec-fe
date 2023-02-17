import {ReactNode} from "react";
import {RepositoryType} from "@/types/repositoryType";

const RepositoryLayout = (
    {children, repository}: {children: ReactNode, repository: RepositoryType}
) => {
    return (
        <>
            <h2>{repository.name}</h2>
            <div className={"container row"}>
                <div className={"col-9"}>
                    <div className={"row bg-secondary text-white mt-3 p-3 rounded-2"}>
                        <div className={"col"}>Author</div>
                        <div className={"col-auto"}>2bbea2c</div>
                        <div className={"col-auto"}>on Sep 7, 2022</div>
                        <div className={"col-auto"}>45 commits</div>
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