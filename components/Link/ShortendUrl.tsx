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
    const [loading,setLoading] = useState(false)

    const { pending } = useFormStatus()
    const router = useRouter()
    console.log(loading)
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
            setLoading(true);
            // here we make a post request to the backend to shorten the url
            setError(null)
            fetch('/api/links/', { method: 'POST', body: JSON.stringify({ original: formData.get('original') }),headers:{
                'Content-Type':'application/json'
            } }).then((res)=>res.json()).then(data=>{
                console.log("The shortend Url code")
                console.log(data)
                router.push("/dashboard/links/")
            }).catch((err)=>{
                console.log(err);
                setError(`Something went wrong : ${err.message}`)
            }).finally(()=>setLoading(false))

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
                    className="flex items-center gap-1  mt-2 bg-black disabled:bg-black/40 hover:bg-black/60 text-white font-bold py-2 px-4 rounded"
                >
                    {loading && <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>}
                  
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
