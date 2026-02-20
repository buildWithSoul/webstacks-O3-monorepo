import type { FC } from "react";
import { storyblokEditable, SbBlokData } from "@storyblok/react";
import { Heading, Button } from "../../atoms";
import { RichText } from "../../molecules/richText/richText";
import { Form } from "../../organisms/form";
import { renderHeading } from "../../../utils/headingUtils";
import { ButtonProps } from "../../atoms/button";

interface FormBlockProps extends SbBlokData {
  heading: any[];
  description?: any;
  buttons?: ButtonProps[];
}

export const FormBlock: FC<FormBlockProps> = ({
  heading,
  description,
  buttons,
  ...blok
}) => {
  const slicedButtons = buttons?.slice(0, 2);

  return (
    <section
      {...storyblokEditable(blok)}
      className="
        section-padding-xl
        items-start
        bg-(--surface-background)
      "
    >
      <div className=" grid grid-cols-1 lg:grid-cols-2 gap-(--gaps-48-40-40) section-padding-md rounded-md bg-(--surface-secondary-background)">
        <div>
          {renderHeading(heading[0])}

          {description && (
            <div className="mb-8 text-(--text-body-dark)">
              <RichText doc={description} />
            </div>
          )}

          {slicedButtons && slicedButtons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4">
              {slicedButtons.map((button, index) => (
                <Button
                  key={button._uid}
                  href={button.href}
                  target={button.target}
                  mode={"filled"}
                  tone={button.tone ?? (index === 0 ? "primary" : "secondary")}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div>
          <Form />
        </div>
      </div>
    </section>
  );
};
