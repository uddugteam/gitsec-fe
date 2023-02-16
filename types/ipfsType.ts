export interface IpfsType {
    name: string,
    external_url: string,
    description: string,
    content: [
        {
            name: string,
            hash: string
        }
    ]
}