import mongoose from "mongoose";

export async function connect() {
    return mongoose.connect(process.env.MONGODB_URL as string)
}

export const categories: Record <string, string> = {

// place font awsome images later

action  :"action",
historic:  "historic",
romance : "romance",
comedy:  "comedy" ,
               
};