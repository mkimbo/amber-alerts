import { Metadata } from "next";
import styles from "./page.module.scss";
import { ServerAuthProvider } from "@/auth/server-auth-provider";
import Link from "next/link";
import Breadcrumbs from "@/app/Components/BreadCrumbs";

export const metadata: Metadata = {
  title: "Mental Health",
  description: "Health Tips, Guidelines and Measures",
};
export default function MentalHealth() {
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
          <div className={styles.title}>Mental Health</div>
          <div className={styles.resourceHeader}>
            Everyone&#39;s mental health journey is unique, find strategies and
            techniques that work best for you. Seek proffesional help if you
            need it.
          </div>
          {getProgressBar(`100%`)}
          <div className={styles.resourceBody}>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Practice Self-Care: </strong>
                Take time for yourself and engage in activities that bring you
                joy, relaxation, and rejuvenation. This can include hobbies,
                exercise, reading, or simply spending time in nature.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Prioritize Sleep: </strong>
                Establish a consistent sleep routine and aim for 7-8 hours of
                quality sleep each night. Good sleep is essential for mental and
                emotional well-being.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Connect with Others: </strong>
                Maintain healthy social connections with friends, family, and
                supportive individuals. Cultivate meaningful relationships and
                engage in regular social interactions.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Manage Stress: </strong>
                Learn effective stress management techniques such as deep
                breathing exercises, meditation, mindfulness, or engaging in
                activities that help you unwind and de-stress.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Set Realistic Goals: </strong>
                Break down your goals into achievable steps, celebrate small
                successes, and avoid overwhelming yourself with unrealistic
                expectations. This helps foster a sense of accomplishment and
                boosts self-esteem.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Seek Support: </strong>
                Reach out to trusted individuals or professionals when you are
                feeling overwhelmed or need support. Its okay to ask for help
                and seek guidance when needed.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Practice Mindfulness: </strong>
                Stay present in the moment and engage in mindfulness practices,
                such as focusing on your breath or observing your thoughts and
                emotions without judgment.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Limit Media Consumption: </strong>
                Take breaks from news or social media to protect your mental
                well-being. Set boundaries around media consumption and
                prioritize activities that promote positivity.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Engage in Physical Activity: </strong>
                Regular exercise has numerous mental health benefits. Find
                activities you enjoy, whether its walking, yoga, dancing, or any
                form of movement that gets your body moving.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Practice Gratitude: </strong>
                Cultivate a gratitude practice by focusing on things you are
                grateful for each day. This simple exercise can shift your
                mindset towards positivity and increase overall well-being.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
