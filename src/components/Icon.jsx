import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faHandPointer,
  faTrashCan,
  faGripLinesVertical,

} from "@fortawesome/free-solid-svg-icons";

import { 

} from "@fortawesome/free-brands-svg-icons";

const iconMap = {
  faCircleQuestion: faCircleQuestion,
  faHandPointer: faHandPointer,
  faTrashCan:faTrashCan,
  faGripLinesVertical: faGripLinesVertical,

};

const Icon = ({ iconName }) => {
  const icon = iconMap[iconName] || faCircleQuestion;

  return (
    <div className="icon">
      <FontAwesomeIcon icon={icon} />
    </div>
  );
};
export default Icon;
