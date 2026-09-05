const Form = ({ text, className, formarray, submitFunction }) => {
  return (
    <form className={className} onSubmit={(e) => submitFunction(e)}>
      {text && <h2>{text}</h2>}

      {formarray.map((item) => (
        <fieldset key={item.id}>
          {item.element === "label" && <label>{item.text}</label>}

          {item.element === "input" && (
            <input type={item.type} name={item.name} placeholder={item.placeholder} />
          )}
        </fieldset>
      ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
