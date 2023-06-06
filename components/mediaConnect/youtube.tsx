'use client'

export default function YoutubeConnect() {

  const handleConnectYoutube = () => {
    // https://accounts.google.com/signin/oauth/delegation?authuser=0&part=AJi8hAO2Dvr2IXzmXzsQf5RkQU2PxuuOvCqQwKw1VU46H4gdbc73dSVGmo_x5sEqCMfKO4fJUhEOFmkrct2mYfjEEPSMfQMmpBLV5F6gTlF_qzGSc5ybUUq5oFmTLz4mQjtEEeAhEYiwlx6H9CMTBPAv0b585bHOS7vDqC9_XhgDrZGOyGYFe0giUGy7ehufDnSW3GDXZUrj_l1qsvKyG5sOKR1XeXzxOnLAWyl6NlWgrcKU04bzqolLedBqfXbdS2LhJMEtmlLwDaS1QEUcoeeMKZdKw6wTWtLDVdHYURlYrp8s2EGroV9F0P_8PPq4t5fCld5EdndF5nJ9H9EL2OisnUJ4_5Al5daWwXKS6JPGz5TYMUSsWE4Gq3t1859uBRIxnW4k2OPahtIvNtSog2-RHX8jDQb6OWuOogDk_9Mr_WdonFD0azAEnZ-0extE8ueJ-swXrR61&as=S-100231457%3A1686028945720911&client_id=2436677786-22b3mr32s96nbtu9qj3e6uf26g1teoa3.apps.googleusercontent.com&allowAddAccount=1&pli=1&rapt=AEjHL4N3HJUYI43CE76VAoUj4p0wtRY4e2RDENuiRgCl-EJXZeXtB-mFzfS7qoAd3rhKwgRE_8fjVPj7I5T-rzM0k7AOZZ5Xpw&flowName=GeneralOAuthFlow

  }

  return (
    <button
      onClick={handleConnectYoutube}
      disabled
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white"
      // className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Connect Youtube
    </button>
  )
}
