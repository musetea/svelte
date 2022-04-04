import cookie from "cookie";

export const handle = async({event, resolve}) =>{
    const cookies = cookie.parse(event.request.headers.get('cookie') || "");
    event.locals.user = cookies || null;
    console.log(cookies);
    console.log(event.locals);
    
    if(!event.locals.user.session_id){
        event.locals.user.authenticated = false;
    }else{
        event.locals.user.authenticated = true;
    }
    
    const response = await resolve(event);

    // console.dir(response);
    // if(response.headers.get('content-type').startsWith('text/html')){
    //     const body = await response.text();
    //     if(body)
    //         return new Response(body.replace(/clound/g, 'butt'), response);
    // }
    // console.dir(response);
    return response;
};



export const getSession = (event) =>{
    // console.dir(request);
    const user  = event.locals.user;
    // console.log(user);

    // if(!user.session_id){
    //     return {}
    // }
        
    return {
        user: event.locals.user,
    }
};