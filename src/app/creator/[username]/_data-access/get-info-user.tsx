"use server"

import { prisma } from "@/lib/prisma"
import { z } from "zod"

interface getInfoUserProps {
  username: string
}

const createUsernameSchema = z.object({
  username: z.string({ message: "O usernamen é obrigatorio" })
})

type CreateUsernameInput = z.infer<typeof createUsernameSchema>
export async function getInfoUser(data: getInfoUserProps) {

  const schema = createUsernameSchema.safeParse(data)

  if (!schema.success) {
    return null
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: data.username
      },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        image: true,
      }
    })

    return user

  } catch (error) {

  }

}