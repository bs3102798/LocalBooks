"use server"

export async function createAd(formData: FormData) {
    const {files, location, ...data} = Object.fromEntries(formData)

    console.log({ files, location, data})
    return(true);
}