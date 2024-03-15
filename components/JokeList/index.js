import useSWR from "swr";
import Link from "next/link";

export default function JokeList() {
  const { data, isLoading, mutate } = useSWR("/api/jokes");

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return;
  }

  async function handleDelete(id) {
    const response = await fetch(`/api/jokes/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      mutate();
    }
  }

  return (
    <ul>
      {data.map((joke) => (
        <li key={joke._id}>
          <Link href={`/${joke._id}`}>{joke.joke}</Link>
          <button onClick={() => handleDelete(joke._id)}>
            <span role="img" aria-label="A cross indicating deletion">
              ❌
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
