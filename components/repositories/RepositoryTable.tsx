import {ReactNode} from "react";

const RepositoryTable = ({children}: {children: ReactNode}) => {
    return (
        <table className="table mt-3">
            <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Last update</th>
                <th scope="col"></th>
            </tr>
            </thead>
            {children}
        </table>
    );
};

export default RepositoryTable;