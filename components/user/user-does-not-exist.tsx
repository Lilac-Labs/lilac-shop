'use client'

import { Button } from '../ui/button'

// Edit the user's profile
export default function UserDoesNotExist() {
  const handleClick = () => {
    console.log('clicked')
    window.location.href = `/`
  }

  return (
    <>
      <div className="flex flex-col items-center">
        <h1> Oops. This user does not exist. </h1>
        <Button onClick={handleClick} className="mt-5">
          <p>Return to Home</p>
        </Button>
      </div>
    </>
  )
}
