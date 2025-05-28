import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from "@hookform/resolvers/zod"
import { Link } from 'react-router-dom'
import {
    Code,
    Eye,
    EyeOff,
    Loader2,
    Lock,
    Mail,
} from "lucide-react" 

import { z } from 'zod'

const SignUpSchema = z.object({
    email:z.string().email("Enter a valid email"),
    password:z.string().min(8, "Password must be of 8 characters"),
    name:z.string().min(4, "Name must be of 4 characters")
})

const SignUpPage = () => {
    const [showPassword, setShowPassword] = useState(false)

    const {
        register,
        handleSubmit,
        formState:{errors}
        } = useForm({
            resolver:zodResolver(SignUpSchema)
        })

    const onSubmit = async (data) => {
        console.log(data)
    }    

    return (
        <div className='h-screen grid lg:grid-cols-2'>
            
        </div>
    )
}

export default SignUpPage