import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";
import Link from "next/link";

export default function About() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Why MissingLink?</h2>
        {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
        <ServerAuthProvider>
          <div className={styles.text}>
            In critical situations, time is of the essence and traditional
            methods of search and rescue often face limitations in reaching the
            highest number of relevant people Asap.
          </div>
          <div className={styles.text}>
            This service aims to supplement and extend current methods using
            modern technologies to enhance public safety, not only for children
            but also for adults and property like vehicles and motorbikes.
          </div>
          <h2 className={styles.title}>Alerts</h2>
          <div className={styles.text}>
            By leveraging PUSH notification technology, a user will be able to
            receive real-time updates directly on their preferred devices. Stay
            informed about missing persons, stolen vehicles, severe weather
            warnings, and other critical events affecting the community.
          </div>
          <h2 className={styles.title}>Geolocation</h2>
          <div className={styles.text}>
            Geo-location technology plays a vital role in the platform. It
            allows delivery of targeted alerts based on the location of the
            receiver. You will receive alerts relevant to your neighborhood,
            enabling you to take prompt action and contribute to the safety of
            your community.
          </div>
          <h2 className={styles.title}>Preferences</h2>
          <div className={styles.text}>
            By setting your preferred distance for receiving alerts, you ensure
            that you only receive information within the community you live in.
            You can also choose the types of alerts that you want. By default
            all users will receive missing person alerts. In relation to this,
            we are also looking to integrate{" "}
            <Link href="/contact" className={styles.linkText}>
              this proposal
            </Link>
            .
          </div>
          <h2 className={styles.title}>More</h2>
          <div className={styles.text}>
            MissingLink is also committed to providing comprehensive resources
            to the public. The platform will feature a wealth of information,
            including emergency contacts, safety guidelines, and
            community-driven initiatives. By fostering community engagement, we
            empower individuals to take an active role in public safety and make
            a difference.
          </div>
        </ServerAuthProvider>
      </div>
    </div>
  );
}
