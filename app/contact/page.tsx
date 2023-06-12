import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../auth/server-auth-provider";

export default function Contact() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Enhancing Community Engagement</h2>
        {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
        <ServerAuthProvider>
          <div className={styles.text}>
            Notifications, although essential, can sometimes be seen as a
            nuisance. That's why we are looking to intergrate a reward system,
            designed to incentivize and encourage active participation from
            community members. The system will be built on the principle of
            mutual benefit and will leverage the synergy between a willing
            receiver and a desperate sender. By encouraging more people to join
            the platform and actively participate, we can create a network that
            is both responsive and efficient.
          </div>
          <h2 className={styles.title}>Receivers</h2>
          <div className={styles.text}>
            As a receiver of alerts, you will have the opportunity to earn
            rewards by opting to receive notifications from distances longer
            than the default setting. By extending your reach and staying
            informed about events happening beyond your immediate vicinity, you
            not only contribute to the safety of your community but also unlock
            exclusive rewards.
          </div>
          <h2 className={styles.title}>Senders</h2>
          <div className={styles.text}>
            We also understand that sometimes urgent alerts need to reach a
            wider audience. To facilitate this, notification senders have the
            option to pay a small fee to send notifications to a larger radius.
            This approach ensures that crucial information can reach those who
            need it most, while also helping sustain and improve the efficiency
            of our platform.
          </div>
          <div className={styles.text}>
            Through this reward system, we aim to foster a sense of community
            responsibility and collaboration. Together, we can create a safer
            environment and support each other during emergencies, incidents,
            and critical events.
          </div>
        </ServerAuthProvider>
      </div>
    </div>
  );
}
