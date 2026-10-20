import Icon from "../components/Icon";

const Button = ({
  classname,
  onClick,
  disabled,
  iconName,
  onDragStart,
  draggable,
}) => {
  return (
    <button
      className={classname}
      disabled={disabled}
      onClick={onClick}
      onDragStart={onDragStart}
      draggable={draggable}
    >
      <Icon iconName={iconName} />
    </button>
  );
};

export default Button;
