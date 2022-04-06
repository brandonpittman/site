import { useLoaderData, Link } from "@remix-run/react";
import { useState, useEffect } from "react";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

type FamilyMember = {
  name: string;
};

export const loader: LoaderFunction = () =>
  json([
    {
      name: "Brandon",
    },
    {
      name: "Lisa",
    },
    {
      name: "Marcus",
    },
  ]);
export default function Index() {
  const data = useLoaderData();
  const [state, setState] = useState(0);

  useEffect(() => {
    if (state > 2) console.log("That's a lot!");
  }, [state]);

  return (
    <main>
      <h1>blp.is</h1>

      <h2>Family Members</h2>
      <ul>
        {data.map((v: FamilyMember) => (
          <li key={v.name}>{v.name}</li>
        ))}
      </ul>

      <Link prefetch="intent" to="/writing" className="no-underline">
        <h2>Writing →</h2>
      </Link>

      <button
        className="bg-blue-600 text-white rounded shadow-sm py-1 px-2 font-medium"
        onClick={() => setState((prev) => prev + 1)}
      >
        Inc
      </button>
      <p>{state}</p>
    </main>
  );
}
