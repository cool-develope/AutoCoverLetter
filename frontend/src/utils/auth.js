
export const getUser = () => {
    let user_string = document.getElementsByName("request_user")[0].value;
    let users = user_string.split("@@@@");

    return {"name":users[0], "id":users[1]}
}

export const isLogin = () => {
    let user = getUser();
    if (user["id"] == "None") return false;
    return true;
}