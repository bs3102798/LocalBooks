'use server';
type Props = {
    params: {
        id:string;
    };
    searchParams: {[key: string] : string} ;
}
export default async function SingleBookPage(args: Props) {
    return(
        <div>{JSON.stringify(args)}</div>
    )
}