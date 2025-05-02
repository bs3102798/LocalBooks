'use client'
import { faCartShopping, faPlus, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Header({ session }: { session: Session | null }) {
    return (
        <header className="border-b p-4 flex items-center justify-between h-14">
            <Link className="text-[#3F2E56] font-bold text-2xl inline-flex items-center gap-1 px-2" href="/">
                <FontAwesomeIcon icon={faBook} className="h-6" />
                <span>LocalBook</span>
            </Link>
            <nav className="flex gap-4  *:rounded  *:py-1">
                <Link href='/new' className="border border-[#3F2E56] text-[#3F2E56] inline-flex items-center gap-1 px-2">
                    <FontAwesomeIcon icon={faPlus} className="h-4" />
                    <span>
                        Post book
                    </span>
                </Link>
                <Link href='/cart' className="relative text-[#3F2E56]" >
                    <span className=" absolute -top-1 -right-2  bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">3</span>
                    <FontAwesomeIcon icon={faCartShopping} className="h-5" />
                </Link>
                <span className="text-[#3F2E56] text-2xl">|</span>
                {!session?.user && (
                    <>
                        <button className="border-0 ">Sign up</button>
                        <button
                            onClick={() => signIn('google')}
                            className="bg-[#3F2E56] text-white border-0 px-6"
                        >Login</button>


                    </>
                )}

                {session?.user && (
                    <>
                        <div className=" gap-6">

                            <Link href={'/account'} className="inline-flex items-center gap-1 px-2">
                                <div className="mx-4 text-[#3F2E56] font-bold">
                                    Welcome, {session.user.name}
                                </div>
                                <Image
                                    src={session.user.image as string} alt={'avatar'} width={33} height={33}
                                    className="rounded-md" />
                            </Link>


                            <button
                                onClick={() => signOut()}
                                className="border-0 mx-4 text-[#3F2E56] font-bold inline-flex items-center gap-1 px-2 ">
                                <FontAwesomeIcon icon={faSignOut} className="h-4" />
                                <span>Logout</span>
                            </button>

                        </div>
                    </>
                )}


            </nav>
        </header>
    )
}