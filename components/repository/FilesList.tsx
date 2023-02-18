import {IpfsType} from "@/types/ipfsType";
import FileRow from "@/components/repository/FileRow";

const FilesList = ({ipfs, setLoading}: {ipfs: IpfsType, setLoading: Function}) => {
    return (
        <table className="table mt-3">
            <tbody>
            {ipfs.content.map((value, index) =>
                <FileRow hash={value.hash} name={value.name} commit={value.commit} timestamp={value.timestamp} setLoading={setLoading} key={index}/>
            )}
            </tbody>
        </table>
    );
};

export default FilesList;