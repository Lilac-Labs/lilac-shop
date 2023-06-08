"use client"
import { useEffect, useState } from 'react';
import { set } from 'zod';
declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: {
      init: (config: object) => void;
    };
  }
}

export default function IGConnect() {
    const [loggedIn, setLoggedIn] = useState(false)
    const [connected, setConnected] = useState(false)
    const [uuid, setUuid] = useState("")
    const [accessToken, setAccessToken] = useState("")

  useEffect(() => {
    // https://developers.facebook.com/docs/javascript/advanced-setup
    // wait for facebook sdk to load with fbAsyncInit event
    window.fbAsyncInit = function () {
        // https://developers.facebook.com/docs/javascript/reference/FB.init/v17.0
      window.FB.init({
        appId: '1437653880361215',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v17.0',
        status: true 
      });
      // If you set status to true in the FB.init() call, the SDK will attempt to get info about the current user immediately after init. Doing this can reduce the time it takes to check for the state of a logged in user if you're using Facebook Login, but isn't useful for pages that only have social plugins on them.
      FB.AppEvents.logPageView();  
      
      // TODO: if already connected, display "Disconnect" button!
      checkLoginState()
    };

    // https://developers.facebook.com/docs/reference/javascript/FB.getLoginStatus
    // Checking user status on page load While you can call FB.getLoginStatus any time (for example, when the user tries to take a social action), most social apps need to know the user's status as soon as possible after the page loads. In this case, rather than calling FB.getLoginStatus explicitly, it is possible to check the user's status by setting status: true when you call FB.init. To receive the response of this call, you must subscribe to the auth.statusChange event. The response object passed by this event is identical to that which would be returned by calling FB.getLoginStatus explicitly.

    // Load Facebook SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s) as HTMLScriptElement;
      js.id = id;
      //js.src = "https://connect.facebook.net/en_US/sdk.js";
      js.src="https://connect.facebook.net/en_US/sdk/debug.js"
      fjs.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  // Roundtrip maintain state!
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    }, true);
  }

  const statusChangeCallback = (response: fb.StatusResponse) => {
    console.log("in statusChangeCallback:",response);
    // If the person is logged into Facebook and your app, redirect them to your app's logged in experience. If the person isn't logged into your app, or isn't logged into Facebook, prompt them with the Login dialog with FB.login() or show them the Login Button.
    if (response.status === 'connected') {
        // The user is logged in and has authenticated your
        // app, and response.authResponse supplies
        // the user's ID, a valid access token, a signed
        // request, and the time the access token 
        // and signed request each expire.
        setLoggedIn(true)
        setConnected(true)
        setUuid(response.authResponse.userID)
        setAccessToken(response.authResponse.accessToken)
      } else if (response.status === 'not_authorized') {
        // The user has logged in, but hasn't authorized your application.
        setLoggedIn(true)
        setConnected(false)
        setUuid("")
        setAccessToken("")
      } else {
        // The user isn't logged in.
        setLoggedIn(false)
        setConnected(false)
        setUuid("")
        setAccessToken("")
      }
  }

  const handleConnectInstagram = () => {
    console.log("Initiate Facebook Login Dialogue")
    FB.login(function(response){
        console.log("Facebook Login Response", response)
        statusChangeCallback(response);
    });
  };

  const handleDisconnectInstagram = () => {
    console.log("Facebook Logout")
    FB.logout(function(response){
        console.log("Facebook Logout Response", response)
        statusChangeCallback(response);
    });
  };

  return (
    <div>
        <p> uuid: ${uuid}</p>
        <p> accessToken: ${accessToken}</p>
        {(!loggedIn) ? (
                <button
                onClick={handleConnectInstagram}
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                >
                Connect Instagram
                </button>
            ) : (
                <button
                onClick={handleDisconnectInstagram}
                className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                >
                Disconnect Instagram
                </button>
            )}
    </div>
    
  );
}