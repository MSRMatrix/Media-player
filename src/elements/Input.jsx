const Input = ({ text, classname, onChange, rangeValue, min, max, step, disabled, type, checked, onClick}) => {
  return (
    <div className={classname}>
      <label>{text || "N/A"}</label>
      <input
        type={type}
        checked={checked}
        onClick={onClick}
        name=""
        id=""
        min={min}
        max={max}
        step={step}
        value={rangeValue}
        disabled={disabled}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default Input;
