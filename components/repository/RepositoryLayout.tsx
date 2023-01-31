import {ReactNode} from "react";

const RepositoryLayout = (
    {children}: {children: ReactNode}
) => {
    return (
        <>
            <h2>Repo 1</h2>
            <div className={"container"}>
                <div className={"row"}>
                    <button className={"col-lg-1 btn btn-secondary mt-3"}>Main</button>
                </div>
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
        </>
    );
};

export default RepositoryLayout;