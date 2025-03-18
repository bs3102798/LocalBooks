export default function NewBookPage() {
    return (
        <form action=''>
            <h1>Add Your Book</h1>
            <input type='text' placeholder="Title" />
            <input type='number' placeholder="Price" />
            <select>
                <option selected disabled value="">Select a genre</option>
                {/* place font awsome images later */}
                <option value="">action</option>
                <option value="">historic</option>
                <option value="">romance</option>
                <option value="">comedy</option>
            </select>
            <textarea name="" id="" placeholder="Descripiton"></textarea>
            <textarea name="" id="" placeholder="Mobile + 34 363 869 2945"></textarea>
        </form>
    )

}