type Props = {
    adressProps: AddressProps;
    setAddressProp: (field: keyof AddressProps, value: string) => void;
  };

export default function AddressInputs({ adressProps ={}, setAddressProp }: Props) {
   // if (!adressProps) return null;
    const { phone, streetAddress, postalCode, city , conunty} = adressProps;

    return (
        <>
            <div className="mb-4">

                <div>
                    <label>Phone</label>
                    <input type="text" placeholder="Phone number"
                        value={phone} onChange={ev => setAddressProp('phone', ev.target.value)} />
                </div>

                <div>
                    <label>Street address</label>
                    <input type="text" placeholder="Street Address"
                        value={streetAddress} onChange={ev => setAddressProp('streetAddress', ev.target.value)} />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label> Postal code </label>
                        <input type="text" placeholder="Postal code"
                            value={postalCode} onChange={ev => setAddressProp('postalCode', ev.target.value)} />
                    </div>

                    <div>
                        <label> City</label>
                        <input type="text" placeholder="City"
                            value={city} onChange={ev => setAddressProp('city', ev.target.value)} />
                    </div>

                </div>

                <div>
                    <label>country</label>
                    <input type="text" placeholder=""
                        value={conunty} onChange={ev => setAddressProp('country', ev.target.value)} />
                </div>

            </div>
        </>
    )
}