import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Segment, Item, Icon, Button } from "semantic-ui-react";
import { Meeting } from "../../../model/Meeting";

interface Props {
  meeting: Meeting;
}

export default function MeetingListItem({ meeting }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Content>
              <Item.Header as={Link} to={`/meeting/${meeting.id}`}>
                {meeting.title}
              </Item.Header>
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
        <div>
          <Icon name="calendar alternate outline" />
          {format(meeting.date!, "dd MMM yyyy")}
        </div>
        <span>
          <Icon name="clock outline" />
          {meeting.startTime} - {meeting.endTime}
        </span>
        <Button
          as={Link}
          to={`/meeting/${meeting.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
