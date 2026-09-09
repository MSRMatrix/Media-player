const Input = ({ text, classname, onChange, rangeValue, min, max, step }) => {
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
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default Input;
