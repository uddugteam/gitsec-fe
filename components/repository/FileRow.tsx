import {AiOutlineFileText} from "react-icons/ai";
import Link from "next/link";
import {useState} from "react";

const FileRow = ({hash, name}: {hash: string, name: string}) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <tr>
            <td><AiOutlineFileText className={"h4 text-muted"}/></td>
            <td onClick={() => setIsLoading(true)}>
                <Link href={`/repository/1/${hash}`}>{name}</Link> {isLoading && <span
                className="spinner-border spinner-border-sm text-primary" role="status" aria-hidden="true">

                    </span>}
            </td>
            <td className={"w-50 text-center text-muted"}>Commit info</td>
            <td className={"text-muted"}>5 minutes ago</td>
        </tr>
    );
};

export default FileRow;