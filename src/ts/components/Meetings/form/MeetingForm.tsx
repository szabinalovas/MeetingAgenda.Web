import { observer } from "mobx-react-lite";
import { useStore } from "../../../store/store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Meeting } from "../../../model/Meeting";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import { Button, Header, Segment } from "semantic-ui-react";
import { Formik, Form } from "formik";
import MeetingDateInput from "../../common/form/MeetingDateInput";
import MeetingTextInput from "../../common/form/MeetingTextInput";
import LoadingComponent from "../../../layout/LoadingComponent";

export default observer(function MeetingForm() {
  const { meetingStore } = useStore();
  const { loading, loadingInitial, loadMeeting, createMeeting, updateMeeting } =
    meetingStore;
  const { id } = useParams();
  const navigate = useNavigate();

  const [meeting, setMeeting] = useState<Meeting>({
    id: "",
    title: "",
    room: "",
    date: null,
    startTime: "",
    endTime: "",
  });

  const validationSchema = Yup.object({
    title: Yup.string().required(),
    room: Yup.string().required(),
    date: Yup.string().required("The date is required").nullable(),
    startTime: Yup.string()
      .trim()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Correct format is HH:MM"),
    endTime: Yup.string()
      .trim()
      .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Correct format is HH:MM"),
  });

  useEffect(() => {
    if (id) loadMeeting(id).then((meeting) => setMeeting(meeting!));
  }, [id, loadMeeting]);

  function handleFormSubmit(meeting: Meeting) {
    if (!meeting.id) {
      meeting.id = uuid();
      createMeeting(meeting).then(() => navigate(`/meeting/${meeting.id}`));
    } else {
      updateMeeting(meeting).then(() => navigate(`/meeting/${meeting.id}`));
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading meeting..." />;

  return (
    <Segment clearing>
      <Header content="Meeting Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={meeting}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MeetingTextInput name="title" placeholder="Title" />
            <MeetingTextInput name="room" placeholder="Room" />
            <MeetingDateInput
              placeholderText="Date"
              name="date"
              dateFormat="MMMM d, yyyy"
            />
            <MeetingTextInput name="startTime" placeholder="Start time" />
            <MeetingTextInput name="endTime" placeholder="End time" />
            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button as={Link} to="/" floated="right" content="Cancel" />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
