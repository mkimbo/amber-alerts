import { Metadata } from "next";
import styles from "./page.module.scss";
import Breadcrumbs from "@/app/Components/BreadCrumbs";

export const metadata: Metadata = {
  title: "Online Safety",
  description:
    "Online safety is an ongoing effort, and staying informed about emerging threats and best practices is crucial.",
};
export default function OnlineHealth() {
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
          <div className={styles.title}>Online Safety</div>
          <div className={styles.resourceHeader}>
            Online safety is an ongoing effort, and staying informed about
            emerging threats and best practices is crucial.
          </div>
          {getProgressBar(`100%`)}
          <div className={styles.resourceBody}>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Protect Personal Information: </strong>
                Avoid sharing sensitive information like full name, address,
                phone number, or financial details online, especially on public
                platforms.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Use Strong and Unique Passwords: </strong>
                Create strong and unique passwords for all your online accounts
                and avoid using the same password across multiple platforms.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Be Cautious of Suspicious Links and Downloads: </strong>
                Avoid clicking on unknown or suspicious links, and refrain from
                downloading files from untrusted sources to prevent malware or
                phishing attacks.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Enable Two-Factor Authentication (2FA): </strong>
                Activate 2FA whenever possible to add an extra layer of security
                to your online accounts.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Practice Safe Social Media Usage: </strong>
                Adjust privacy settings on social media platforms to control who
                can see your posts and personal information. Be selective about
                accepting friend requests or connections from unknown
                individuals.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Report and Block Cyberbullies: </strong>
                If you encounter online bullying or harassment, report the
                abusive behavior to the platform administrators and consider
                blocking the person involved. Don't engage or retaliate, as it
                can escalate the situation.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Be Mindful of Online Friends: </strong>
                Exercise caution when interacting with strangers online. Be
                skeptical of individuals who quickly try to establish deep
                personal connections or request personal information.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Educate Yourself on Social Engineering: </strong>
                Learn about common online scams, such as phishing emails, fake
                websites, or requests for money. Be skeptical of unsolicited
                requests for personal or financial information.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Foster a Positive Online Environment: </strong>
                Promote kindness and respect in your online interactions. Stand
                against cyberbullying, and support others who may be targeted.
                Spread positivity and use social media to uplift and inspire
                others.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
