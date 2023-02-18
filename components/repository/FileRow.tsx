import {AiOutlineFileText} from "react-icons/ai";
import Link from "next/link";

const FileRow = ({hash, name, setLoading}: {hash: string, name: string, setLoading: Function}) => {

    return (
        <tr>
            <td><AiOutlineFileText className={"h4 text-muted"}/></td>
            <td onClick={() => setLoading(true)}>
                <Link href={`/repository/1/${hash}`}>{name}</Link>
            </td>
            <td className={"w-50 text-center text-muted"}>Commit info</td>
            <td className={"text-muted"}>5 minutes ago</td>
        </tr>
    );
};

export default FileRow;