'use client';
import Image from 'next/image';

const hero = () => {


    return (
        <>
            <div className="bg-slate-400 w-full flex items-center justify-center min-h-screen p-5">
                <div className=" max-w-7xl w-full flex ">
                    <div className="flex flex-col lg:flex-row-reverse p-20 w-full">
                        <Image
                            src='/pexels-pixabay-247819.jpg'
                            alt='Hero'
                            width={500}
                            height={500}
                            className='w-full h-auto 2xl max-w-md rounded'
                        />
                        <div>
                            <h1 className="text-3xl md:text-6xl font-bold">IMPARARE DA CASA 🚀</h1>
                            <p className="py-6 text-xl md:text-3xl">
                                Scopri tutti i corsi online disponibili.
                            </p>
                            <a
                                href="#"
                                className="mt-8 w-40 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Get start
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default hero
