"use client"

import { useState, useRef } from "react"
import { debounce, set } from 'lodash'
import { changeName } from "../_action/change-name"
import { toast } from "sonner"

interface NameProps {
  initialName: string
}
export function Name({ initialName }: NameProps) {

  const [name, setName] = useState(initialName)
  const [originalName] = useState(initialName)

  const debouncedSaveName = useRef<ReturnType<typeof debounce>>(
    debounce(async (currentName: string) => {
      if (currentName.trim() === '') {
        setName(originalName)
        return
      }

      if (currentName !== name) {
        try {
          const response = await changeName({ name: currentName })

          if (response.error) {
            console.log(response.error)
            toast.error(response.error)
            setName(originalName)
            return
          }

          toast.success("Nome alterado com sucesso")

        } catch (error) {
          console.log(error)
          setName(originalName)
        }
      }
    }, 500)
  )



  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setName(value)

    debouncedSaveName.current(value)
  }

  return (
    <input
      className="text-xl md:text-2xl font-bold bg-gray-100 rounded-md outline-none p-2 w-full max-w-2xl text-center"
      value={name}
      onChange={handleChangeName}
    />
  )
}