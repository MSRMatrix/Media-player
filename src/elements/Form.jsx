const Form = ({ text, id, classname, formArray }) => {
  return (
    <form className={classname} id={id}>
      {text && <h2>{text}</h2>}

      {formArray.map((item) => (
        <div key={item.id}>
          {item.element}
        </div>
      ))}
    </form>
  );
};

export default Form;