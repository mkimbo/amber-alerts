import { Metadata } from "next";
import styles from "./page.module.scss";
import Breadcrumbs from "@/app/Components/BreadCrumbs";

export const metadata: Metadata = {
  title: "Sexual harassment and GBV",
  description:
    "Creating a safe and respectful environment is a collective responsibility.",
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
          <div className={styles.title}>Sexual harassment and GBV</div>
          <div className={styles.resourceHeader}>
            Addressing sexual harassment and GBV requires a multifaceted
            approach that involves education, empowerment, support, and policy
            changes. By fostering a culture of respect, consent, and equality,
            we can strive towards a society free from sexual harassment and GBV.
          </div>
          {getProgressBar(`100%`)}
          <div className={styles.resourceBody}>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Consent Education: </strong>
                Promote the importance of consent and educate individuals on
                what it means and how to obtain it in all types of relationships
                and interactions.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Establish Healthy Boundaries: </strong>
                Encourage the establishment of clear personal boundaries and
                respect for the boundaries of others. Teach individuals to
                communicate their boundaries assertively.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Empowerment and Self-Defense: </strong>
                Offer empowerment programs and self-defense classes to build
                confidence and equip individuals with skills to protect
                themselves if necessary.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Education on GBV: </strong>
                Increase awareness through education and campaigns about the
                various forms of gender-based violence, including sexual
                harassment, assault, and domestic violence.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Reporting Mechanisms: </strong>
                Advocate for accessible and reliable reporting mechanisms for
                victims of sexual harassment and GBV, including confidential
                helplines, support centers, and legal aid services.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Encourage Bystander Intervention: </strong>
                Promote the role of bystanders in preventing and addressing
                instances of sexual harassment. Teach techniques for safe
                intervention and support.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Support Survivors: </strong>
                Provide comprehensive support systems for survivors of sexual
                harassment and GBV, including counseling, medical assistance,
                and legal aid.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Workplace Policies: </strong>
                Advocate for strong workplace policies against sexual
                harassment, ensuring a safe and inclusive environment for all
                employees.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Community Engagement: </strong>
                Engage the community in discussions, workshops, and awareness
                campaigns to challenge harmful norms and attitudes that
                contribute to sexual harassment and GBV.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Collaboration with Authorities: </strong>
                Work closely with law enforcement agencies and authorities to
                ensure timely and effective response to reports of sexual
                harassment and GBV, as well as proper investigation and
                prosecution of perpetrators.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
