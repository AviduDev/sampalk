import Link from "next/link";

async function getService(slug) {
  const response = await fetch(process.env.NEXT_HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query Service($slug:String!) {
        service(where: {slug: $slug}) {
          title
          slug
        description
        }
      }`,
      variables: {
        slug,
      },
    }),
  });
  const json = await response.json();
  return json.data.service;
}

export default async function Service({ params }) {
  const service = await getService(params.slug);
  return (
    <div className="m-12">
      <h1 className="text-5xl font-bold mb-4">{service.title}</h1>
      <p className="text-lg mb-8">{service.description}</p>

      <p>
        <Link href="/" className="underline">
          Back to homepage
        </Link>
      </p>
    </div>
  );
}
