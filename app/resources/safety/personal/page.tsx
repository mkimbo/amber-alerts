import { Metadata } from "next";
import styles from "./page.module.scss";
import Breadcrumbs from "@/app/Components/BreadCrumbs";

export const metadata: Metadata = {
  title: "Personal Safety",
  description:
    "Personal safety is a priority, and being observant and alert can help you identify potential dangers and take necessary precautions to protect yourself.",
};
export default function PersonalHealth() {
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
          <div className={styles.title}>Personal Safety</div>
          <div className={styles.resourceHeader}>
            Personal safety is a priority, and being observant and alert can
            help you identify potential dangers and take necessary precautions
            to protect yourself.
          </div>
          {getProgressBar(`100%`)}
          <div className={styles.resourceBody}>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Trust Your Instincts: </strong>
                Pay attention to your gut feelings and intuition. If something
                feels off or unsafe, trust yourself and take necessary
                precautions.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Be Aware of Your Surroundings: </strong>
                Stay alert and observant of your environment at all times. Take
                note of exits, emergency resources, and potential hazards in
                public places.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Avoid Isolated Areas: </strong>
                Stick to well-lit and populated areas, especially at night.
                Avoid shortcuts through dark or secluded places that may pose a
                safety risk.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Walk Confidently: </strong>
                Project confidence in your body language while walking. Keep
                your head up, maintain a brisk pace, and avoid appearing
                vulnerable or distracted.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Limit Distractions: </strong>
                Minimize distractions like excessive phone use or wearing
                headphones that can make you less aware of your surroundings and
                potential risks.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Trustworthy Companions: </strong>
                When possible, walk with a friend or in a group, especially in
                unfamiliar or potentially unsafe areas. There is safety in
                numbers.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Use Well-Traveled Routes: </strong>
                Stick to commonly used paths and routes that are known to be
                safe. Avoid taking unfamiliar shortcuts or venturing into
                uncharted areas alone.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Stay Connected: </strong>
                Keep your phone charged and easily accessible. Inform a trusted
                person about your whereabouts or travel plans, especially if
                you&#39;re in an unfamiliar location.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Recognize Suspicious Activities: </strong>
                Stay vigilant and observe people and activities around you.
                Trust your instincts if something or someone seems out of place
                or behaving suspiciously.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Report Suspicious Behavior: </strong>
                If you witness or suspect any suspicious activity, report it to
                the appropriate authorities or notify a nearby security
                personnel or law enforcement.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
