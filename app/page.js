// get all pages from hygraph
import Link from "next/link";

async function getServices() {
  const NEXT_HYGRAPH_ENDPOINT = process.env.NEXT_HYGRAPH_ENDPOINT;
  if (!NEXT_HYGRAPH_ENDPOINT) {
    throw new Error("NEXT_HYGRAPH_ENDPOINT is not defined");
  }
  const response = await fetch(NEXT_HYGRAPH_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query Services {
                services {
                  title
                  slug
                  description
                }
              }`,
    }),
  });
  const json = await response.json();
  return json.data.services;
}

export default async function Home() {
  const services = await getServices();
  //console.log(pages);
  return (
    <div className="m-12">
      <h1 className="text-5xl font-bold mb-4">This is Our Services </h1>
      <p className="text-lg mb-4">Click the links below to see other pages</p>
      <ul className="mb-8 list-disc list-inside">
        {services.map((service) => {
          return (
            <li key={service.slug}>
              <Link href={`/services/${service.slug}`} className="underline">
                {service.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
