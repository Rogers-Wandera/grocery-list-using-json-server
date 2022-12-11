const apiRequest = async (url = '', reqObj = null, errMsg = null) => {
    try {
        const response = await fetch(url,reqObj);
        if(!response.ok) throw Error("Refresh the page");
    } catch (err) {
        errMsg = err.message;
    }finally{
        return errMsg;
    }
}

export default apiRequest;