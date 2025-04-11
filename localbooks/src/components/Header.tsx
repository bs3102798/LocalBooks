'use client'
import { faCartShopping, faPlus, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
//import { Session } from "next-auth/react";
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
                <span className="text-[#3F2E56] text-2xl">|</span>
                {!session?.user && (
                    <>
                        <button className="border-0 ">Sign up</button>
                        <button
                            onClick={() => signIn('google')}
                            className="bg-[#3F2E56] text-white border-0 px-6"
                        >Login</button>
                        <button className="text-[#3F2E56]">
                            <FontAwesomeIcon icon={faCartShopping} className="h-4" />
                        </button>

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
                            <button className="text-[#3F2E56]">
                                <FontAwesomeIcon icon={faCartShopping} className="h-4" />

                            </button>
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