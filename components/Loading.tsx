import React from 'react';

const Loading = () => {
    return (
        <div className={"px-5 py-5 my-5 text-center"}>
            <div className="m-5 spinner-border text-primary" role="status" style={{width: "10rem", height: "10rem", fontWeight: "bold"}}>
                <span className="visually-hidden">Loading...</span>
            </div>
            <h1 className={"text-primary"}>Loading...</h1>
        </div>
    );
};

export default Loading;