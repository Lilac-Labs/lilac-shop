'use client'

export default function IGConnect() {

  const handleConnectInstagram = () => {
    // Construct the authorization URL
    const clientId = 'YOUR_CLIENT_ID'
    const redirectUri = 'YOUR_REDIRECT_URI'
    const scope = 'user_profile' // Add more scopes if needed
    const authorizationUrl = `https://api.instagram.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`

    // Redirect the user to the authorization URL
    window.location.href = authorizationUrl
  }

  return (
    <button
      onClick={handleConnectInstagram}
      className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
    >
      Connect Instagram
    </button>
  )
}
