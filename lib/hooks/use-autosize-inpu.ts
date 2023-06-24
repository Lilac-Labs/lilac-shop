import { useEffect } from 'react'

// Updates the height of a <textarea> when the value changes.
const useAutosizeInput = (inputRef: HTMLInputElement | null, value: string) => {
  useEffect(() => {
    if (inputRef) {
      // We need to reset the height momentarily to get the correct scrollHeight for the textarea
      inputRef.style.height = '0px'
      const scrollHeight = inputRef.scrollHeight

      // We then set the height directly, outside of the render loop
      // Trying to set this with state or a ref will product an incorrect value.
      inputRef.style.height = scrollHeight + 'px'
    }
  }, [inputRef, value])
}

export default useAutosizeInput
