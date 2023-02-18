import {AiOutlineFileText} from "react-icons/ai";
import Link from "next/link";

const FileRow = (
    {hash, name, commit, timestamp, setLoading}: {hash: string, name: string, setLoading: Function, commit: string, timestamp: string}
) => {
    const date = new Date(Number(timestamp) * 1000).getTime();
    const nowDate = new Date().getTime();
    const difference = Math.abs(nowDate - date);
    const diffMinutes = Math.ceil(difference / (1000 * 60))
    const diffHours = Math.ceil(difference / ( 1000 * 60 * 60 ))
    const diffDays = Math.ceil(difference / ( 1000 * 60 * 60 * 24 ))

    let finalDifference;

    if (Number(timestamp) === 0) {
        finalDifference = ''
    } else if (diffHours >= 24) {
        finalDifference = `${diffDays} days ago`
    } else if (diffMinutes >= 60){
        finalDifference = `${diffHours} hours ago`
    } else {
        finalDifference = `${diffMinutes} minutes ago`
    }

    return (
        <tr>
            <td><AiOutlineFileText className={"h4 text-muted"}/></td>
            <td onClick={() => setLoading(true)}>
                <Link href={`/repository/1/${hash}`}>{name}</Link>
            </td>
            <td className={"w-50 text-center text-muted"}>{commit}</td>
            <td className={"text-muted"}>{finalDifference}</td>
        </tr>
    );
};

export default FileRow;