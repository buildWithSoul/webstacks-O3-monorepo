import Image from "next/image";
import styles from "./page.module.css";
import { Button } from "@repo/ui";

export default function Home() {
  return (
    <>
      <Button

        mode="filled"
        tone="primary"
        size="md"
      >
        Submit
      </Button>
    </>
  );
}
