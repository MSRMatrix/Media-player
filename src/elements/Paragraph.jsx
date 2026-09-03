const Paragraph = ({text, id, classname}) => {
    return <p className={classname} key={id}>{text || "N/A"}</p>
};

export default Paragraph;