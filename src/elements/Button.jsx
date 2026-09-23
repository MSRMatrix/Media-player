const Button = ({text, classname, onClick, disabled, children}) => {
    return <button className={classname} disabled={disabled} onClick={onClick}>{children || text || "N/A"}</button>
};

export default Button;