"use client"
import { linkSchema } from '@/schema/link.schema';
import { redirect,useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

type UrlShortenerFormProps = {
}


const UrlShortenerForm: React.FC<UrlShortenerFormProps> = ({ }) => {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [error, setError] = useState<string | null>(null);

    const { pending } = useFormStatus()
    const router = useRouter()

    const validateUrl = (url: string) => {
        const res = linkSchema.safeParse({ original: url });
        if (!res.success) {
            const { errors } = res.error;
            setError(errors[0].message as string)
        } else {
            setError(null)
        }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const res = linkSchema.safeParse(Object.fromEntries(formData.entries()));
        if (!res.success) {
            const { errors } = res.error;
            setError(errors[0].message as string)
            return;
        }
        else {
            // here we make a post request to the backend to shorten the url
            setError(null)
            fetch('/api/links/', { method: 'POST', body: JSON.stringify({ original: formData.get('original') }),headers:{
                'Content-Type':'application/json'
            } }).then((res)=>res.json()).then(data=>{
                console.log("The shortend Url code")
                console.log(data)
                // redirect("/dashboard/links/")
                router.push("/dashboard/links/")
            }).catch((err)=>{
                console.log(err);
                setError(`Something went wrong : ${err.message}`)
            })

        }

    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <form method='post' onSubmit={handleSubmit}>
                <label className="text-gray-600">Enter URL to shorten:</label>
                <input
                    type="url"
                    name="original"
                    className="border rounded-md p-2 w-full"
                    placeholder="https://example.com"
                    value={originalUrl}
                    onChange={(e) => { setOriginalUrl(e.target.value); validateUrl(e.target.value) }}
                    onBlur={(e) => {
                        if (e.target.value) {
                            validateUrl(e.target.value)
                        } else {
                            setError("Url required!")
                        }
                    }}
                    required
                />
                {error && (

                    <span className="block font-bold text-red-400">{error}</span>
                )}
                <button
                    aria-disabled={pending}
                    disabled={Boolean(error)}
                    type="submit"
                    className="mt-2 bg-black disabled:bg-black/40 hover:bg-black/60 text-white font-bold py-2 px-4 rounded"
                >
                    Shorten URL
                </button>
            </form>
            {shortenedUrl && (
                <div className="mt-4">
                    <p className="text-gray-600">Shortened URL:</p>
                    <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                        {shortenedUrl}
                    </a>
                </div>
            )}
        </div>
    );
};

export default UrlShortenerForm;
