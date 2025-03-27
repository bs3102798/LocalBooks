export default function AdTextInputs() {
    return (
        <>
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

        </>
    );
}