const Button = ({text, classname}) => {
    return <button className={classname}>{text || "N/A"}</button>
};

export default Button;