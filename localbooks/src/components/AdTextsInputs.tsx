import { categories } from "@/libs/heplers";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

//export type AdTextField = 'title' | 'price' | 'category' | 'description' | 'contact'
export type AdText = {
  title?: string;
  price?: string|number;
  category?: string;
  description?: string;
  contact?: string;
}

type Props = { 
  defaultValues: AdText
}

export default function AdTextInputs({ defaultValues }: Props) {
  return (
    <>
      <label htmlFor="titleIn">Title</label>
      <input name="title" id="titleIn" type='text' placeholder="Title" defaultValue={defaultValues.title} />
      <label htmlFor="priceIn">Price</label>
      <input name="price" id="priceIn" type='number' placeholder="Price" defaultValue={defaultValues.price} />
      <label htmlFor="categoryIn">Category</label>
      <select name="category" id="categoryIn" defaultValue={defaultValues.category || '0'}  >
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
        {categories.map(({ key, label }) => (
          <React.Fragment 
            key={key}
          >
            {/* <FontAwesomeIcon icon={icon} /> */}
            <option
              value={key}>
              {label}

            </option>
          </React.Fragment>
        ))}
      </select>

      <label htmlFor="descriptionIn">description</label>
      <textarea name="description" id="" placeholder="Descripiton" defaultValue={defaultValues.description}></textarea>
      <label htmlFor="contactIn">Phone</label>
      <textarea id="contactIn" name="contact" placeholder="Mobile + 34 363 869 2945" defaultValue={defaultValues.contact}></textarea>

    </>
  );
}