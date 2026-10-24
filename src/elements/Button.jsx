import Icon from "../components/Icon";

const Button = ({
  classname,
  onClick,
  disabled,
  iconName,
  onDragStart,
  draggable,
  isExpanded,
  text,
  value
}) => {
  return (
    <button
      className={classname}
      disabled={disabled}
      onClick={onClick}
      onDragStart={onDragStart}
      draggable={draggable}
      aria-expanded={isExpanded}
      value={value}
    >
     {iconName ? <Icon iconName={iconName} /> : text}
    </button>
  );
};

export default Button;
