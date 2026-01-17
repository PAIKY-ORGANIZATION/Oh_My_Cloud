import UnlockShareableFileAccessClientComponent from "./unlock_shareable_file_access_client_component"

type Params = {
    params: Promise<{shareable_file_access_id: string}>
}

export default async function  UnlockShareableFileAccessPage({params}: Params) {
    const {shareable_file_access_id} = await params
    
    
    return (
        <UnlockShareableFileAccessClientComponent shareableFileAccessId={shareable_file_access_id} />
    )
}