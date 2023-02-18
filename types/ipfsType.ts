export interface IpfsType {
    name: string,
    external_url: string,
    description: string,
    content: [
        {
            name: string,
            hash: string,
            author: string,
            commit: string,
            timestamp: string
        }
    ] | [],
    commit: string,
    timestamp: string,
    commits_count: string
}