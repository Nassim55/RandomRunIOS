const forgotPasswordRequest = async (email) => {
    try {
        // Fetching csrftoken from server:
        const response = await fetch(`http://127.0.0.1:8000/account/useraccount/password_reset`);
        const cookieData = await response.headers.map['set-cookie']

        // Retrieving the csrftoken cookie value:
        const splitCookie = cookieData.split(';');
        let csrfmiddlewaretoken = ''

        for(let i = 0; i < splitCookie.length; i++) {
            const c = splitCookie[i];
            if (c.length >= 10) {
                const name = c.slice(0, 10);
                if (name === 'csrftoken=') {
                    csrfmiddlewaretoken = c.slice(10, c.length);
                    break;
                }
            };  
        };

        // Posting email and csrf token in order to recieve a reset email:
        try {
             // Defining the form data:
            const uploadData = new FormData();
            uploadData.append('email', email);
            uploadData.append('csrfmiddlewaretoken', csrfmiddlewaretoken);

            // Posting to the endpoint:
            const responsePOST = await fetch('http://127.0.0.1:8000/account/useraccount/password_reset', {
                method: 'POST',
                headers: {
                    'Cookie': 'csrftoken=NcUrC1cSoRgTH5KucNeDosQD953smTvZ3TvzRHj1Ot5jVoxMifCNkCFMqLRWgkMT',
                    'Content-Type': 'multipart/form-data'
                },
                body: uploadData,
            });
            const data = await responsePOST.text()
            console.log(data)
        } catch (err) { if (console) console.error(err) };

    } catch (err) { if (console) console.error(err) };
};

export default forgotPasswordRequest;





// function getCookie(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for(var i = 0; i <ca.length; i++) {
//       var c = ca[i];
//       while (c.charAt(0) == ' ') {
//         c = c.substring(1);
//       }
//       if (c.indexOf(name) == 0) {
//         return c.substring(name.length, c.length);
//       }
//     }
//     return "";
//   }