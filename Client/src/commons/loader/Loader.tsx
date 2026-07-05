import { useHideScroller } from "../../hooks/useLoadingError"

export default function Loader() { 
    useHideScroller();
    
    return (
        <div className="loader-modal">
            <span className="loader"></span>
        </div>
    )
}