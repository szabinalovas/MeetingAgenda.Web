import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuid } from "uuid";
import { format } from "date-fns";
import { Meeting } from "../model/Meeting";
import Api from "../services/Api";

export default class MeetingStore {
  meetingRegistry = new Map<string, Meeting>();
  selectedMeeting: Meeting | undefined = undefined;
  editMode = false;
  loading = false;
  loadingInitial = false;

  constructor() {
    makeAutoObservable(this);
  }

  get meetingsByDate() {
    return Array.from(this.meetingRegistry.values()).sort(
      (a, b) => a.date!.getTime() - b.date!.getTime()
    );
  }

  get groupedMeetings() {
    return Object.entries(
      this.meetingsByDate.reduce((meetings, meeting) => {
        const date = format(meeting.date!, 'dd MMM yyy');
        meetings[date] = meetings[date]
          ? [...meetings[date], meeting]
          : [meeting];
        return meetings;
      }, {} as { [ked: string]: Meeting[] })
    );
  }

  loadMeetings = async () => {
    this.setLoadingInitial(true);
    try {
      const meetings = await Api.Meetings.list();
      meetings.forEach((meeting: Meeting) => {
        this.setMeeting(meeting);
      });
      this.setLoadingInitial(false);
    } catch (error) {
      console.log(error);
      this.setLoadingInitial(false);
    }
  };

  loadMeeting = async (id: string) => {
    let meeting = this.getMeeting(id);
    if (meeting) {
      this.selectedMeeting = meeting;
      return meeting;
    } else {
      this.setLoadingInitial(true);
      try {
        meeting = await Api.Meetings.details(id);
        this.setMeeting(meeting!);
        runInAction(() => (this.selectedMeeting = meeting));
        this.setLoadingInitial(false);
        return meeting;
      } catch (error) {
        console.log(error);
        this.setLoadingInitial(false);
      }
    }
  };

  private setMeeting = (meeting: Meeting) => {
    meeting.date = new Date(meeting.date!);
    this.meetingRegistry.set(meeting.id, meeting);
  };

  private getMeeting = (id: string) => {
    return this.meetingRegistry.get(id);
  };

  setLoadingInitial = (state: boolean) => {
    this.loadingInitial = state;
  };

  createMeeting = async (meeting: Meeting) => {
    this.loading = true;
    meeting.id = uuid();
    try {
      await Api.Meetings.create(meeting);
      runInAction(() => {
        this.meetingRegistry.set(meeting.id, meeting);
        this.selectedMeeting = meeting;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  updateMeeting = async (meeting: Meeting) => {
    this.loading = true;
    try {
      await Api.Meetings.update(meeting);
      runInAction(() => {
        this.meetingRegistry.set(meeting.id, meeting);
        this.selectedMeeting = meeting;
        this.editMode = false;
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  deleteMeeting = async (id: string) => {
    this.loading = true;
    try {
      await Api.Meetings.delete(id);
      runInAction(() => {
        this.meetingRegistry.delete(id);
        this.loading = false;
      });
    } catch (error) {
      console.log(error);
      runInAction(() => {
        this.loading = false;
      });
    }
  };
}
