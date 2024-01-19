import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import { Fragment } from "react";
import { Header } from "semantic-ui-react";
import MeetingListItem from "./MeetingListItem";

export default observer(function MeetingList() {
  const { meetingStore } = useStore();
  const { groupedMeetings } = meetingStore;

  return (
    <>
      {groupedMeetings.map(([group, meetings]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          {meetings.map((meeting) => (
            <MeetingListItem key={meeting.id} meeting={meeting} />
          ))}
        </Fragment>
      ))}
    </>
  );
});
