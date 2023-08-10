
export  function getCurrentURL() {
    console.log("window.location:", window.location)
    console.log("window.location.host:", window.location.origin)
    let link = process.env.REACT_APP_APIURL
    if (window.location.origin !== "http://localhost:3000") {
        link = window.location.origin+'/';
        console.log("window.location.host x:", link)
    }
    console.log("getCurrentURL:", link)
    return link;
  }


