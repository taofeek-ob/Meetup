import { useRouter } from "next/router";
import Meta from "../../components/meta";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetUpPage = () => {
  const router = useRouter();

  const addMeetupHandler = async (enteredMeetupData) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: { "Content-Type": "application/json" },
    });

    const meetup = await response.json();
    console.log(meetup);
    router.push("/");
  };

  return (
    <>
      <Meta title="Add Meetups" description="a meetup page built with nextjs" />
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
};

export default NewMeetUpPage;
