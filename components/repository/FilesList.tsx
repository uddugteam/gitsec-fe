import Link from "next/link";
import {AiOutlineFileText, AiOutlineFolder} from "react-icons/ai";

const FilesList = () => {
    return (
        <table className="table mt-3">
            <tbody>
            <tr>
                <td><AiOutlineFolder className={"h4 text-muted"}/></td>
                <th scope="row"><Link href={"#"}>Folder</Link></th>
                <td className={"w-75 text-center text-muted"}>Commit info</td>
                <td className={"text-muted"}>5 minutes ago</td>
            </tr>
            <tr>
                <td><AiOutlineFileText className={"h4 text-muted"}/></td>
                <th scope="row"><Link href={"/repository/1/filename"}>File name</Link></th>
                <td className={"w-75 text-center text-muted"}>Commit info</td>
                <td className={"text-muted"}>5 minutes ago</td>
            </tr>
            </tbody>
        </table>
    );
};

export default FilesList;