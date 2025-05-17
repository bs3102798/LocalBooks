'use client'

import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { redirect } from "next/navigation";
;
import { useState } from "react";

export default function DeleteAdButton({id}:{id:string}) {
    const [showDeleteQuestion, setShowDeleteQuestion] = useState(false)

    function handleDelete() {
        fetch(`/api/ads?id=${id}`, {
            method: 'DELETE',
        }) .then(() => {
            setShowDeleteQuestion(false);
            redirect('/')
        })

    }

    if (showDeleteQuestion) {
        return (
            <div className="bg-black/90 fixed inset-0 z-50 flex items-center justify-center">
                <div className="bg-white p-4 rounded-md">
                    <h2 className="text-lg">Do you want to delete this book</h2>
                    <div className="flex justify-center gap-2 mt-2">
                        <button
                            onClick={() => setShowDeleteQuestion(false)}
                            className=" px-2 py-1 border rounded "
                        >no, cancle
                        </button>
                        <button className="py-1 px-2 bg-red-600 text-white rounded"
                            onClick= {
                                handleDelete
                                //setShowDeleteQuestion(false)
                            }>
                            yes, delete
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <>
            <button
                onClick={() => setShowDeleteQuestion(true)}
                className=" border border-red-500 rounded-md py-1 px-2 inline-flex gap-1 items-center"
            >
                <FontAwesomeIcon icon={faTrash} />
                <span>delete</span>
            </button>
        </>
    )
}