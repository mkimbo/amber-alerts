import { Metadata } from "next";
import styles from "./page.module.scss";
import Breadcrumbs from "@/app/Components/BreadCrumbs";

export const metadata: Metadata = {
  title: "Child Safety",
  description:
    "Its important to educate children about potential risks, establish clear guidelines, and maintain open lines of communication.",
};
export default function ChildSafety() {
  const getProgressBar = (progressBar: string) => {
    return (
      <div className={styles.progressbar}>
        <div className={styles.progress} style={{ width: progressBar }}></div>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <Breadcrumbs />
      <div className={styles.info}>
        <div className={styles.resourceWrapper}>
          <div className={styles.title}>Child Safety</div>
          <div className={styles.resourceHeader}>
            It&#39;s important to educate children about potential risks,
            establish clear guidelines, and maintain open lines of
            communication.
          </div>
          {getProgressBar(`100%`)}
          <div className={styles.resourceBody}>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Supervision: </strong>
                Always supervise young children and be actively involved in
                their activities, both online and offline.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Stranger Danger: </strong>
                Teach children about the concept of strangers and establish
                clear guidelines on interacting with unknown individuals.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Personal Boundaries: </strong>
                Teach children about personal boundaries and the importance of
                saying &#34;No&#34; when someone makes them uncomfortable.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Online Safety: </strong>
                Educate children about online risks, such as cyberbullying,
                inappropriate content, and online predators. Teach them how to
                stay safe while using the internet.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Safe Routes: </strong>
                Teach children safe routes to school, parks, and other
                frequented places. Practice these routes together to ensure they
                are familiar with them.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Emergency Contacts: </strong>
                Ensure children know their full name, address, and emergency
                contact numbers. Teach them when and how to use these numbers in
                case of an emergency.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Safety at Home: </strong>
                Teach children about potential hazards at home, such as sharp
                objects, chemicals, and electrical outlets. Establish safety
                rules and precautions.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Stranger Safety: </strong>
                Teach children about the importance of staying away from
                strangers, both in public places and online. Teach them to seek
                help from a trusted adult if approached by a stranger.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Water Safety: </strong>
                Teach children about water safety rules, such as swimming only
                in designated areas, wearing life jackets when boating, and
                never swimming alone.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Open Communication: </strong>
                Foster open communication with children, encouraging them to
                share any concerns or uncomfortable experiences. Teach them to
                trust their instincts and seek help when needed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
