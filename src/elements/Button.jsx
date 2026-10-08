import Icon from "../components/Icon";

const Button = ({classname, onClick, disabled, iconName}) => {
    return <button className={classname} disabled={disabled} onClick={onClick}><Icon iconName={iconName} /></button>
};

export default Button;