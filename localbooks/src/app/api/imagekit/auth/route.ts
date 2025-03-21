import { getServerSession } from "next-auth"
import { authOptions } from "../../auth/[...nextauth]/route"
import ImageKit from "imagekit";

export const GET = async() => {
    const session = await getServerSession(authOptions);
    if(!session) {
        return Response.json(false)
    }
    const ik = new ImageKit({
        urlEndpoint: process.env.NEXT_PUBLIC_IK_ENDPOINT,
        publicKey: process.env.NEXT_PUBLIK_IK_PUBLIC_KEY,
        privateKey: process.env.IK_PRIVATE_KEY,

    })
}