export default function AdTextInputs() {
    return (
        <>
            <label htmlFor="titleIn">Title</label>
            <input name="title" id="titleIn" type='text' placeholder="Title" />
            <label htmlFor="priceIn">Price</label>
            <input name="price" id="priceIn" type='number' placeholder="Price" />
            <label htmlFor="categoryIn">Category</label>
            <select name="category" id="categoryIn" defaultValue="0">
                <option disabled value="0">Select a genre</option>
                {/* place font awsome images later */}
                <option value="action">action</option>
                <option value="historic">historic</option>
                <option value="romance">romance</option>
                <option value="comedy">comedy</option>
            </select>

            <label htmlFor="descriptionIn">description</label>
            <textarea name="description" id="" placeholder="Descripiton"></textarea>
            <label htmlFor="contactIn">Phone</label>
            <textarea  id="contactIn" name="contact" placeholder="Mobile + 34 363 869 2945"></textarea>

        </>
    );
}