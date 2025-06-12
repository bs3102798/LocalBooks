'use client'
import { faCartShopping, faPlus, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
//import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { CartContext } from "./CartProvider";

export default function Header({ session }: { session: Session | null }) {
    const [showDropDown, setShowDropdown] = useState(false);
    const router = useRouter();
    //const {cartProducts} = useContext(CartContext)

    const cart = useContext(CartContext);

    if (!cart) {
        throw new Error("CartContext is undefined. Make sure you are using the CartProvider.");
    }

    const { cartProducts } = cart;


    return (
        <header className="border-b p-4 flex items-center justify-between h-14">
            <Link className="text-[#3F2E56] font-bold text-2xl inline-flex items-center gap-1 px-2" href="/">
                <FontAwesomeIcon icon={faBook} className="h-6" />
                <span>LocalBook</span>
            </Link>
            <nav className="flex gap-2 items-center  *:rounded  *:py-1">
                <Link href='/new' className="border border-[#3F2E56] text-[#3F2E56] inline-flex items-center gap-1 px-2">
                    <FontAwesomeIcon icon={faPlus} className="h-4" />
                    <span>
                        Post book
                    </span>
                </Link>





                {/* need the data for  */}
                {/* {cartProducts?.length > 0 && (
                    <Link href={'/cart'} className="relative text-[#3F2E56]">cart

                        <span className=" absolute -top-1 -right-2  bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                            ({cartProducts.length})



                        </span>
                        <FontAwesomeIcon icon={faCartShopping} className="h-5" />

                    </Link>






                )} */}








                <span className="text-[#3F2E56] text-2xl">|</span>
                {!session?.user && (
                    <>
                        <button className="border-0 ">Sign up</button>
                        <button
                            onClick={() => signIn('google')}
                            className="bg-[#3F2E56] text-white border-0 px-6 py-1"
                        >Login</button>


                    </>
                )}

                {session?.user && (
                    <>
                        <div className=" gap-6 relative flex items-center">

                            <button
                                onClick={() => setShowDropdown(prev => !prev)}
                                className="inline-flex items-center gap-1 px-2">
                                <div className="mx-4 text-[#3F2E56] font-bold">
                                    Welcome, {session.user.name}
                                </div>
                                <Image
                                    src={session.user.image as string} alt={'avatar'} width={33} height={33}
                                    className={"rounded-md relative " + (showDropDown ? 'z-50' : '')} />
                            </button>


                            {showDropDown && (
                                <>
                                    <div
                                        onClick={() => setShowDropdown(false)}
                                        className="bg-black/90 fixed inset-0 z-40 mt-3">
                                        <div className="absolute z-50 right-6 top-9 bg-white rounded-md w-24 border ">

                                            {/* <Link className="p-2 block text-center" href={'/my-ads'}>My Ads</Link> */}
                                            <button
                                                onClick={() => {
                                                    setShowDropdown(false)
                                                    router.push('/my-ads')
                                                }}
                                                className="p-2 block text-center" >My Ads</button>
                                            <button
                                                onClick={() => signOut()}
                                                className="p-2 block text-[#3F2E56] inline-flex items-center">

                                                {/* //border-0 mx-4 font-bold inline-flex items-center gap-1 px-2  */}
                                                <FontAwesomeIcon icon={faSignOut} className="h-4" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </div>


                                </>
                            )}




                        </div>
                    </>
                )}
                    {cartProducts?.length > 0 && (
                    <Link href={'/cart'} className="relative text-[#3F2E56]">cart

                        <span className=" absolute -top-1 -right-2  bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                            ({cartProducts.length})



                        </span>
                        <FontAwesomeIcon icon={faCartShopping} className="h-5" />

                    </Link>






                )}


            </nav>
        </header>
    )
}