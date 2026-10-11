import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleQuestion,
  faHandPointer,
  faTrashCan,
  faGripLinesVertical,
  faPlay,
  faBackward,
  faForward,
  faVolumeHigh,
  faVolume,
  faVolumeLow,
  faVolumeXmark,
  faRepeat,
  faShuffle,
  faPause,
  faBan,
  faLinkSlash,
  faStop,
  faGripLines,
  faCheckDouble,
  faXmark,
  faHandBackFist,
  faCircleChevronUp,
  faCircleChevronDown
} from "@fortawesome/free-solid-svg-icons";

import {} from "@fortawesome/free-brands-svg-icons";

const iconMap = {
  faCircleQuestion: faCircleQuestion,
  faHandPointer: faHandPointer,
  faTrashCan: faTrashCan,
  faGripLinesVertical: faGripLinesVertical,
  faPlay: faPlay,
  faBackward: faBackward,
  faForward: faForward,
  faVolumeHigh: faVolumeHigh,
  faVolume: faVolume,
  faVolumeLow: faVolumeLow,
  faVolumeXmark: faVolumeXmark,
  faRepeat: faRepeat,
  faShuffle: faShuffle,
  faPause: faPause,
  faBan: faBan,
  faLinkSlash: faLinkSlash,
  faStop: faStop,
  faGripLines: faGripLines,
  faCheckDouble: faCheckDouble,
  faXmark: faXmark,
faHandBackFist: faHandBackFist,
  faCircleChevronUp: faCircleChevronUp,
  faCircleChevronDown: faCircleChevronDown,
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
