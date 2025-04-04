import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Uses Native APIs",
    Svg: require("@site/static/img/nextjs.svg").default,
    description: (
      <>
        Built entirely on top of Next.js native <code>&lt;Form&gt;</code> and
        React APIs. No custom handlers, no magic — just the platform as
        intended.
      </>
    ),
  },
  {
    title: "Validation with Zod",
    Svg: require("@site/static/img/form.svg").default,
    description: (
      <>
        Define your schema once using Zod and get automatic, type-safe
        validation on both the client and server — without duplicating logic.
      </>
    ),
  },
  {
    title: "Works Without JavaScript",
    Svg: require("@site/static/img/js.svg").default,
    description: (
      <>
        Progressive enhancement at its core — forms work even if JavaScript is
        disabled. Ideal for performance, accessibility, and graceful
        degradation.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
