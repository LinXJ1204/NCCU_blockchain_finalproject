import { useState } from "react"

export function Message(props: {message: string}) {

    const [isOpen, setisOpen] = useState<boolean>(true)

    return (
        <div className="max-w-0">
            {isOpen&&(
            <div id="alert-1" className="max-h-24 animate-bounce drop-shadow-xl absolute top-2/3 right-1/3 translate-x-2/4 flex items-center p-4 mb-4 text-blue-800 rounded-lg bg-white border-bgpink z-50" role="alert">
                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div className="ms-3 text-xl font-medium">
                {props.message}
                </div>
                <button onClick={()=>{setisOpen(false)}} type="button" className="ms-auto -mx-1.5 -my-1.5 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#alert-1" aria-label="Close">
                    <span className="sr-only">Close</span>
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                </button>
            </div>)}
      </div>
    )
}