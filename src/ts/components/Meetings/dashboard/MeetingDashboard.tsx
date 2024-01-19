import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import MeetingList from "./MeetingList";

export default observer(function MeetingDashboard() {
  const { meetingStore } = useStore();
  const { loadMeetings, meetingRegistry } = meetingStore;

  useEffect(() => {
    if (meetingRegistry.size <= 0) loadMeetings();
  }, [loadMeetings, meetingRegistry.size]);

  return (
    <Grid>
      <Grid.Column width="10">
        <MeetingList />
      </Grid.Column>
    </Grid>
  );
});
