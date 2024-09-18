"use client"

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
    text: string
}

export const FormButton = ({ text }: FormButtonProps) => {
    const { pending } = useFormStatus();

    return <>
   
        <Button variant='outline' className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{pending ? <span className="loading loading-dots loading-sm"></span>: text}</Button>
    </>
}