import { Metadata } from "next";
import styles from "./page.module.scss";
import Breadcrumbs from "@/app/Components/BreadCrumbs";

export const metadata: Metadata = {
  title: "Sexual Health",
  description: "Sexual health is an important aspect of overall well-being.",
};
export default function SexualHealth() {
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
          <div className={styles.title}>Sexual Health</div>
          <div className={styles.resourceHeader}>
            Sexual health is an important aspect of overall well-being. It&#39;s
            essential to engage in safe and consensual sexual practices.
          </div>
          {getProgressBar(`100%`)}
          <div className={styles.resourceBody}>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>
                  Practice Consensual and Respectful Relationships:{" "}
                </strong>
                Always engage in sexual activities with the informed and
                enthusiastic consent of all parties involved. Respect each
                other&#39;s boundaries and communicate openly about desires and
                limits.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Use Barrier Methods for Protection: </strong>
                Use condoms or dental dams during sexual intercourse to reduce
                the risk of sexually transmitted infections (STIs). Regularly
                get tested for STIs and encourage your partner(s) to do the
                same.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Get Regular Sexual Health Check-ups: </strong>
                Schedule regular visits to a healthcare provider who specializes
                in sexual health to ensure early detection and treatment of any
                potential issues or infections.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Communicate Openly about Sexual Health: </strong>
                Discuss sexual health topics, concerns, and preferences with
                your partner(s). Effective communication can lead to a more
                satisfying and safer sexual experience.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Practice Safe and Consistent Birth Control: </strong>
                Use reliable and effective birth control methods to prevent
                unintended pregnancies. Consult with a healthcare professional
                to find the most suitable method for you.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Maintain Good Hygiene: </strong>
                Maintain proper genital hygiene by washing the genital area with
                mild soap and water. Avoid using harsh chemicals or perfumed
                products, as they can disrupt the natural balance of the vagina
                or penis.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Educate Yourself about Sexual Health: </strong>
                Stay informed about sexual health topics, including reproductive
                anatomy, contraception methods, STIs, and safe sex practices.
                Reliable sources of information include healthcare providers,
                reputable websites, and educational resources.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Get Vaccinated: </strong>
                Protect yourself against vaccine-preventable diseases, such as
                human papillomavirus (HPV), by getting vaccinated. Consult with
                a healthcare provider to learn more about the recommended
                vaccines.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Practice Mutual Trust and Communication: </strong>
                Build trust and open communication with your partner(s) to
                create a safe and supportive sexual environment. Discuss
                desires, boundaries, and any concerns openly and respectfully.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Seek Professional Help when Needed: </strong>
                If you have concerns about sexual health, experience sexual
                dysfunction, or need guidance on reproductive health matters,
                don&#39;t hesitate to consult with a healthcare professional
                specializing in sexual health or a certified sex therapist.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
