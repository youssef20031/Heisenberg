import React from 'react'

import { z } from "zod";

export const formSchema = z.object({
    email: z.string().min(2,{message:'Too short'}),
    password: z.string().min(2,{message:'Too short'}),
})
