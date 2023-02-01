const Alert = ({text, type, closeAlert}: {text: string, type: string, closeAlert: Function}) => {
    return (
        <div className={`alert alert-${type} alert-dismissible`} role="alert">
            {text}
            <button type="button" className="btn-close" onClick={closeAlert}/>
        </div>
    );
};

export default Alert;