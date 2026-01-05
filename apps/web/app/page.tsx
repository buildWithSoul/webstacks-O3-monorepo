import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { Button, Card } from "@repo/ui";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  return (
    <>
    
          <Button appName="web">Click Me</Button>
          <Card href="" title="Welcome to the Web App">
            This is a card component from the shared UI package.
          </Card>
          

    </>
  );
}
