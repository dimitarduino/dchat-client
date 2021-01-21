import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";

export default function Loading() {
    
    return (
        <div className="loading">
            <div className="loading__content">
                <ClipLoader
                    size={50}
                    color={"#123abc"}
                    loading={true}
                />
            </div>
        </div>
    )
}
