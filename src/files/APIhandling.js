const apiHandling = async (url='',methodObj=null,errorMessage=null) => {
    try{
        let response =await fetch(url,methodObj);
        if(!response.ok) throw Error("Something went wrong !!");
        else{
            console.log("Mission - ",methodObj.method,",Successfully executed")
        }
    }
    catch(err){
        errorMessage=err.message;
    }
    finally{
        return errorMessage;
    }
}
export default apiHandling;