import React, { useState } from 'react'

export default function InputTracker() {
    const [inputValue, setInputValue] = useState('yyyy-mm-dd')
    const [position, setPosition] = useState(0)

    const handleChange = (value) => {
        const initialValue = 'yyyy-mm-dd'.split('')
        let valueArray = value.split('')
        if (value.length < 11) {
            // Input character is a backspace.
            const inputArray = inputValue.split('')
            inputArray[position] = initialValue[position]
            setInputValue(inputArray.join(''))
            if (position > 0) {
                setPosition(() => position - 1)
            } else {
                setPosition(0)
            }
            return
        }
        const inputLetter = valueArray.pop()
        valueArray[position] = inputLetter
        setInputValue(valueArray.join(''))
        setPosition(() => position + 1)
    }

    return (
        <input
            value={inputValue}
            onChange={e => handleChange(e.target.value)}
            className='w-22 h-8 border-solid border-2 ml-10 mt-10 cursor-none'
        />
    )
}
