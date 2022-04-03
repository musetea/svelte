export const post = async ({params, request}) => {
    console.log(params);
    console.log(request);

    let name = '';
    let email = '';
    try{
        const jsonBody = await request.json();
        console.log(jsonBody);
        name = jsonBody.name; 
        email = jsonBody.email;
        console.log(name, email);

    }catch(err){
        console.error('======')
        console.log(err)
        console.error("======")
    }


    return{
        body:{
            name,
            email,
            
        }
    }
}