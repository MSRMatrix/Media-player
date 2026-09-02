const Navigation = () => {
  const navArray = [
    {
      name: "",
    },

    {
      name: "",
    },
    {
      name: "",
    },
  ];
  return (
    <>
      <ol>
        {navArray.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ol>
    </>
  );
};

export default Navigation;
