import { faImage, faMapPin, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function NewBookPage() {
    return (
        <form action='' className="max-w-xl mx-auto flex gap-12">
            <div className="grow pt-8">
                <div className="bg-gray-200 p-4 rounded">
                    <h2 className="text-center text-xs text-gray-400 uppercase font-bold">
                        Add photos of book:
                    </h2>
                    <div className="flex flex-col">
                        <FontAwesomeIcon icon={faImage} className="h-24 text-gray-400" />
                        <button className="mt-2 border border-[#3F2E56] text-[#3F2E56] px-4 py-2 rounded uppercase font-bold">
                            <FontAwesomeIcon icon={faPlus} />
                            Add photos
                        </button>
                    </div>
                </div>
                <div className="mt-6">
                    <label htmlFor="">Where is it located</label>
                    <button className="w-full flex items-center gap-2 py-1 justify-center border border-[#3F2E56] text-[#3F2E56] uppercase font-bold rounded">
                        <FontAwesomeIcon icon={faMapPin} />
                        <span>
                            add location
                        </span>
                    </button>
                    <div className="mt-2 bg-gray-200 p-4 min-h-12 rounded text-gray-400">
                        google maps here
                    </div>
                </div>
            </div>

            <div className="grow pt-2">
                <label htmlFor="titleIn">Title</label>
                <input id="titleIn" type='text' placeholder="Title" />
                <label htmlFor="priceIn">Price</label>
                <input id="priceIn" type='number' placeholder="Price" />
                <label htmlFor="categoryIn">Category</label>
                <select defaultValue="">
                    <option disabled value="">Select a genre</option>
                    {/* place font awsome images later */}
                    <option value="">action</option>
                    <option value="">historic</option>
                    <option value="">romance</option>
                    <option value="">comedy</option>
                </select>

                <label htmlFor="descriptionIn">description</label>
                <textarea name="" id="" placeholder="Descripiton"></textarea>
                <label htmlFor="contactIn">Phone</label>
                <textarea id="contactIn" name="" placeholder="Mobile + 34 363 869 2945"></textarea>
                <button className="mt-2 bg-[#3F2E56] text-white px-6 py-2 rounded font-bold">
                    POST BOOK
                </button>
            </div>
        </form>
    )

}