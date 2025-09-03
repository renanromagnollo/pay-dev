"use client"

import { useState, useRef } from "react"
import { debounce, set } from 'lodash'
import { changeName } from "../_action/change-name"
import { toast } from "sonner"
import { changeDescription } from "../_action/change-bio"

interface DescriptionProps {
  initialDescription: string
}
export function Description({ initialDescription }: DescriptionProps) {

  const [description, setDescription] = useState(initialDescription)
  const [originalDescription] = useState(initialDescription)

  const debouncedSaveDescription = useRef<ReturnType<typeof debounce>>(
    debounce(async (currentDescription: string) => {
      if (currentDescription.trim() === '') {
        setDescription(originalDescription)
        return
      }

      if (currentDescription !== description) {
        try {
          const response = await changeDescription({ description: currentDescription })

          if (response.error) {
            console.log(response.error)
            toast.error(response.error)
            setDescription(originalDescription)
            return
          }

          toast.success("Nome alterado com sucesso")

        } catch (error) {
          console.log(error)
          setDescription(originalDescription)
        }
      }
    }, 500)
  )



  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value
    setDescription(value)

    debouncedSaveDescription.current(value)
  }

  return (
    <textarea
      className="text-xl md:text-2xl font-bold bg-gray-100 rounded-md outline-none p-2 w-full max-w-2xl text-center"
      value={description}
      onChange={handleChange}
    />
  )
}