import cookie from "cookie";
import {v4 as uuid} from "uuid";

export const post = async({params, request}) => {
    const user = await request.json();
    console.log("login.js post():", user);

    const sessoinId = uuid();
    const headers = {
        "Set-Cookie": cookie.serialize("sessoin_id", sessoinId,{
            httpOnly:true,
            sameSite:"lax",
            maxAge:60*60*24*1,
            path:"/"
        })
    };

    return {
        status: 200,
        headers,
        body:{
            user,
        }
    }
};