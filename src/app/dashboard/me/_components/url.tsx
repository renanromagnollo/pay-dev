"use client"
import { Button } from "@/components/ui/button";
import { createUsername } from "../_action/create-username";
import { useState } from "react";

interface UrlPreviewProps {
  username: string | null
}
export function UrlPreview({ username: slug }: UrlPreviewProps) {

  const [error, setError] = useState<null | string>(null)
  const [username, setUsername] = useState(slug)

  async function submitAction(formData: FormData) {
    const username = formData.get("username") as string
    if (username === "") {
      return
    }

    const response = await createUsername({ username })

    if (response.error) {
      setError(response.error)
      return
    }

    if (response.data) {
      setUsername(response.data)
    }

  }

  if (!!username) {
    return (
      <div>
        <p
          className="w-fit h-9 rounded-md flex items-center font-semibold text-white"
        >
          {process.env.NEXT_PUBLIC_HOST_URL}/creator/{username}
        </p >
      </div >
    )

  }

  return (
    <div className="flex items-center flex-1 p-2 text-gray-100">

      <form className="flex flex-1 flex-col"
        action={submitAction}>
        <div>
          <p
            className="w-fit h-9 rounded-md flex items-center font-semibold text-white"
          >
            {process.env.NEXT_PUBLIC_HOST_URL}/creator/
          </p >
          <input type="text" className="flex-1 outline-none border h-9 border-gray-300 text-black" />
        </div >
        <Button type="submit" className="bg-blue-500 h-9 w-full md:w-fit text-white px-4 rounded-md">
          Salvar
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  )
}