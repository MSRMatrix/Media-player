const Input = ({ text, classname, onChange, rangeValue }) => {
  return (
    <div className={classname}>
      <label htmlFor="">{text || "N/A"}</label>
      <input
        type="range"
        name=""
        id=""
        min={0}
        max={1}
        step={0.01}
        value={rangeValue}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};

export default Input;
