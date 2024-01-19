import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingComponent from "../../../layout/LoadingComponent";
import { format } from "date-fns";
import { Segment, Item, Icon, Button } from "semantic-ui-react";

export default observer(function MeetingDetails() {
  const { meetingStore } = useStore();
  const {
    selectedMeeting: meeting,
    loadingInitial,
    loadMeeting,
    deleteMeeting,
  } = meetingStore;
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) loadMeeting(id);
  }, [id, loadMeeting]);

  const handleDelete = (id: string) => {
    deleteMeeting(id).then(() => navigate("/"));
  };

  if (loadingInitial || !meeting) return <LoadingComponent />;

  return (
    <Segment.Group>
      <Segment clearing>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header>{meeting.title}</Item.Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="map marker alternate" />
          {meeting.room}
        </span>
      </Segment>
      <Segment clearing>
        <p>
          <Icon name="calendar alternate outline" />{" "}
          {format(meeting.date!, "dd MMM yyyy")}
        </p>
        <p>
          <Icon name="clock outline" />
          {meeting.startTime} - {meeting.endTime}
        </p>
        <Button
          as={Link}
          to={`/update/${meeting.id}`}
          color="green"
          floated="right"
          content="Edit"
        />
        <Button
          onClick={() => handleDelete(meeting.id)}
          negative
          floated="right"
          content="Delete"
        />
      </Segment>
    </Segment.Group>
  );
});
