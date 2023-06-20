import { Metadata } from "next";
import styles from "./page.module.scss";
import Breadcrumbs from "@/app/Components/BreadCrumbs";

export const metadata: Metadata = {
  title: "Personal Health",
  description:
    "Prioritize your health and well-being by making small, sustainable changes towards a healthier lifestyle.",
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
          <div className={styles.title}>Personal Wellness</div>
          <div className={styles.resourceHeader}>
            Prioritize your health and well-being by making small, sustainable
            changes towards a healthier lifestyle.
          </div>
          {getProgressBar(`100%`)}
          <div className={styles.resourceBody}>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Eat a Balanced Diet: </strong>
                Include a variety of fruits, vegetables, whole grains, lean
                proteins, and healthy fats in your meals. Aim for portion
                control and moderation.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Stay Hydrated: </strong>
                Drink an adequate amount of water throughout the day to support
                your body&#39;s functions and maintain good overall health.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Exercise Regularly: </strong>
                Incorporate physical activity into your daily routine. Find
                activities you enjoy, such as walking, jogging, swimming,
                cycling, or dancing.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Practice Stress Management: </strong>
                Find healthy ways to manage stress, such as practicing
                mindfulness, deep breathing exercises, yoga, or engaging in
                hobbies that bring you joy.
              </div>
            </div>

            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Get Sufficient Sleep: </strong>
                Prioritize getting enough sleep to allow your body to rest and
                rejuvenate. Aim for 7-8 hours of quality sleep each night.
              </div>
            </div>

            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Practice Good Hygiene: </strong>
                Maintain good personal hygiene habits, including regular
                handwashing, dental care, and skincare.
              </div>
            </div>

            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Limit Processed Foods and Sugary Drinks: </strong>
                Reduce your consumption of processed foods, sugary snacks, and
                sugary drinks. Opt for healthier alternatives.
              </div>
            </div>

            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Practice Safe Sun Exposure: </strong>
                Protect your skin from harmful UV rays by wearing sunscreen,
                protective clothing, and seeking shade during peak sun hours.
              </div>
            </div>

            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Take Breaks from Screen Time: </strong>
                Limit excessive screen time and take regular breaks to reduce
                eye strain and promote overall well-being. Engage in other
                activities such as reading, hobbies, or spending time outdoors.
              </div>
            </div>

            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Stay Connected: </strong>
                Foster social connections with friends, family, and the
                community. Engage in meaningful conversations, maintain
                relationships, and seek support when needed.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
