const Button = ({text, classname, onClick}) => {
    return <button className={classname} onClick={onClick}>{text || "N/A"}</button>
};

export default Button;