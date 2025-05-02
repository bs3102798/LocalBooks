import { categories } from "@/libs/heplers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        {/* {categories.map(({ key, label, icon }) => (
                            <label className="rounded-md p-4 flex item-center gap-2 my-0 has-[:checked]:bg-gray-200"
                              id=""
                              key={key}
                            >
                              <FontAwesomeIcon icon={icon} />
                              <input
                              className="hidden"
                                type="radio"
                                name="category"
                                value={key} />
                              {label}
                            </label>
                          ))} */}
        {categories.map(({ key, label, icon }) => (
          <>
            <FontAwesomeIcon icon={icon} />
            <option
              key={key}
              value={key}>
              {label}

            </option>
          </>
        ))}
      </select>

      <label htmlFor="descriptionIn">description</label>
      <textarea name="description" id="" placeholder="Descripiton"></textarea>
      <label htmlFor="contactIn">Phone</label>
      <textarea id="contactIn" name="contact" placeholder="Mobile + 34 363 869 2945"></textarea>

    </>
  );
}