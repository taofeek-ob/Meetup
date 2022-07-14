import MeetupList from "../components/meetups/MeetupList";

import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Meta from "../components/meta";
// const DUMMY_MEETUPS = [
//   {
//     id: 1,
//     title: "Meetup 1",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/5/53/Bosphorus_Bridge_%28235499411%29.jpeg",
//     address: "Address 1",
//     description: "",
//   },
//   {
//     id: 2,
//     title: "Meetup 2",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/5/53/Bosphorus_Bridge_%28235499411%29.jpeg",
//     address: "Address 1",
//     description: "",
//   },
// ];

const HomePage = (props) => {
  // const [loadedMeetups, setLoadedMeetups] = useState([]);

  // useEffect(() => {
  //   setLoadedMeetups(DUMMY_MEETUPS);
  // }, []);
  return (
    <Fragment>
      {/* <Head>
        <title>Next Meetups</title>
        <meta name="description" content="a meetup page built with nextjs " />
      </Head> */}

      <Meta
        title="Next Meetups"
        description="a meetup page built with nextjs"
      />

      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

// export async function getStaticProps() {
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//     revalidate: 1,
//   };
// }

export const getStaticProps = async () => {
  const client = await MongoClient.connect(process.env.MONGO_DB);
  const db = client.db();

  const meetupsCollection = await db.collection("meetups");

  const meetup = await meetupsCollection.find().toArray();

  client.close();
  return {
    props: {
      meetups: meetup.map((meetup) => {
        return {
          title: meetup.title,
          image: meetup.image,
          address: meetup.address,
          description: meetup.description,
          id: meetup._id.toString(),
        };
      }),
    },
  };
};

export default HomePage;
