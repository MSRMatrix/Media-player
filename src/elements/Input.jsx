const Input = ({ text, classname, onChange, rangeValue, min, max, step, disabled}) => {
  return (
    <div className={classname}>
      <label htmlFor="">{text || "N/A"}</label>
      <input
        type="range"
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
