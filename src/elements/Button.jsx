const Button = ({text, id, classname}) => {
    return <button className={classname} key={id}>{text || "N/A"}</button>
};

export default Button;