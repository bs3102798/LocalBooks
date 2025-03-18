'use client'
import { faCartShopping, faPlus, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons/faBook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Session } from "next-auth";
//import { Session } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Header({ session }: { session: Session }) {
    return (
        <header className="border-b p-4 flex items-center justify-between">
            <Link className="text-[#3F2E56] font-bold text-2xl inline-flex items-center gap-1 px-2" href="/">
                <FontAwesomeIcon icon={faBook} className="h-6" />
                <span>LocalBook</span>
            </Link>
            <nav className="flex gap-4  *:rounded  *:py-1">
                <button className="border border-[#3F2E56] text-[#3F2E56] inline-flex items-center gap-1 px-2">
                    <FontAwesomeIcon icon={faPlus} className="h-4" />
                    <span>
                        Post book
                    </span>
                </button>
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
                    {session.user.name}
                    <Image src={session.user.image} alt={'avatar'} width={80} height={80} />
                        <button
                            onClick={() => signOut()}
                            className="border-0 mx-4 text-[#3F2E56] font-bold inline-flex items-center gap-1 px-2 ">
                            <FontAwesomeIcon icon={faSignOut} className="h-4" />
                            <span>Logout</span>
                        </button>
                        <button className="text-[#3F2E56]">
                            <FontAwesomeIcon icon={faCartShopping} className="h-4" />

                        </button>
                    </>
                )}

            </nav>
        </header>
    )
}