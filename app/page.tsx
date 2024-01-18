import Image from "next/image";
import styles from "./page.module.css";

import Gallery from "./gallery";

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users")

  if (!res.ok) {
    throw new Error('Failed to fetch users')
  }

  return res.json()
}

export default async function Home() {
  const users = await getUsers()

  return (
    <main className={styles.main}>
      <Gallery users={users} />
    </main>
  );
}
