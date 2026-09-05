import Paragraph from "../../elements/Paragraph";
import Topic from "../../elements/Topic";

const Messenger = ({topic, text}) => {
    // Muss mit den anderen bei layout sein mit display none und togglen
    return (
        <>
        <Topic topic={topic}/>
            <Paragraph text={text}/>
        </>
    )
};

export default Messenger;