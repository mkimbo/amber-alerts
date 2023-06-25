import { Metadata } from "next";
import styles from "./page.module.scss";
import Breadcrumbs from "@/app/Components/BreadCrumbs";

export const metadata: Metadata = {
  title: "Fire Safety",
  description: "Fire safety is crucial for protecting lives and property",
};
export default function FireSafety() {
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
          <div className={styles.title}>Fire Safety</div>
          <div className={styles.resourceHeader}>
            Fire safety is crucial for protecting lives and property.
          </div>
          {getProgressBar(`100%`)}
          <div className={styles.resourceBody}>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Install Smoke Alarms: </strong>
                Install smoke alarms on every level of your home, including
                inside each bedroom and outside sleeping areas. Test them
                monthly and replace batteries as needed.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Create an Escape Plan: </strong>
                Develop a fire escape plan that includes multiple exit routes
                from each room. Practice the plan regularly with all household
                members.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Keep Exits Clear: </strong>
                Ensure all exits are clear of obstacles and easy to access in
                case of a fire. Do not block doors, windows, or stairways with
                furniture or clutter.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Learn Fire Extinguisher Use: </strong>
                Familiarize yourself with the proper use of fire extinguishers.
                Keep one in an easily accessible location and know how to
                operate it effectively.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Check Electrical Cords: </strong>
                Regularly inspect electrical cords for damage or fraying.
                Replace any cords that are worn out or damaged to reduce the
                risk of electrical fires.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Use Candles Safely: </strong>
                Place candles in sturdy holders on a stable surface and away
                from flammable materials. Never leave candles unattended and
                extinguish them before leaving the room.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Cooking Safety: </strong>
                Never leave cooking unattended, especially when using high heat.
                Keep flammable items away from the stove and use a timer as a
                reminder.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Practice Caution with Heaters: </strong>
                Maintain a safe distance between portable heaters and flammable
                objects. Turn off heaters when leaving the room or going to
                sleep.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Store Flammable Materials Properly: </strong>
                Store flammable liquids, such as gasoline and paint, in approved
                containers away from heat sources. Follow all safety guidelines
                for their storage.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Educate Family Members: </strong>
                Teach family members, especially children, about fire safety.
                Teach them how to respond in case of a fire and the importance
                of not playing with matches or lighters.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
