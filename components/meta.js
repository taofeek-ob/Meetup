import Head from "next/dist/shared/lib/head";

function meta({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Head>
  );
}

export default meta;
