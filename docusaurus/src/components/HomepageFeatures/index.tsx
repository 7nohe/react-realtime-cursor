import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Realtime",
    Svg: require("@site/static/img/undraw_online_collaboration.svg").default,
    description: (
      <>
        React Realtime Cursor allow each participant to see the position of
        other participants' cursors.
      </>
    ),
  },
  {
    title: "Chat",
    Svg: require("@site/static/img/undraw_chat.svg").default,
    description: (
      <>
        React Realtime Cursor allows you to type live, temporary messages to
        others.
      </>
    ),
  },
  {
    title: "Managed Backend Services",
    Svg: require("@site/static/img/undraw_server.svg").default,
    description: (
      <>
        React Realtime Cursor has the option to choose from several managed
        backend services (currently supports Firebase, Amplify and Supabase).
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
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
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
