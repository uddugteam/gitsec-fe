import {IpfsType} from "@/types/ipfsType";
import FileRow from "@/components/repository/FileRow";

const FilesList = ({ipfs}: {ipfs: IpfsType}) => {
    return (
        <table className="table mt-3">
            <tbody>
            {ipfs.content.map((value, index) =>
                <FileRow hash={value.hash} name={value.name} key={index}/>
            )}
            </tbody>
        </table>
    );
};

export default FilesList;