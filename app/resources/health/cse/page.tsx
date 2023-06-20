import { Metadata } from "next";
import styles from "./page.module.scss";
import Breadcrumbs from "@/app/Components/BreadCrumbs";

export const metadata: Metadata = {
  title: "Comprehensive sexuality education",
  description:
    "Teaching and learning about the cognitive, emotional, physical and social aspects of sexuality",
};
export default function CSE() {
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
          <div className={styles.title}>What is CSE?</div>
          <div className={styles.resourceHeader}>
            Comprehensive sexuality education (CSE),is a curriculum-based
            process of teaching and learning about the cognitive, emotional,
            physical and social aspects of sexuality. It aims to equip children
            and young people with knowledge, skills, attitudes and values that
            will empower them to: realize their health, well-being and dignity;
            develop respectful social and sexual relationships; consider how
            their choices affect their own well-being and that of others; and,
            understand and ensure the protection of their rights throughout
            their lives.
          </div>
          {getProgressBar(`100%`)}
          <div className={styles.resourceBody}>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div>
                CSE should start at an early age with foundational content and
                skills delivered in-school and out-of-school.The content and
                skills grow in abstractness and explicitness with the age and
                developmental level of the learners.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div>Here are some age-appropriate guidelines for CSE:</div>
            </div>
            <div className={styles.paragraph}>
              <span>1.</span>
              <div className={styles.content}>
                <strong>Early Childhood (Ages 3-6): </strong>
                <div className={styles.paragraph2}>
                  <span>&#8226;</span>
                  <div className={styles.content}>
                    Teach proper names for body parts: Start by using correct
                    anatomical terms for body parts to promote understanding and
                    body awareness.
                  </div>
                </div>
                <div className={styles.paragraph2}>
                  <span>&#8226;</span>
                  <div className={styles.content}>
                    Teach boundaries and privacy: Emphasize the importance of
                    personal boundaries, privacy, and respecting others&#39;
                    boundaries.
                  </div>
                </div>
                <div className={styles.paragraph2}>
                  <span>&#8226;</span>
                  <div className={styles.content}>
                    Explain basic concepts: Introduce simple concepts like the
                    differences between boys and girls and the idea that bodies
                    change and grow.
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>2.</span>
              <div className={styles.content}>
                <strong>Middle Childhood (Ages 7-10): </strong>
                <div className={styles.paragraph2}>
                  <span>&#8226;</span>
                  <div className={styles.content}>
                    Provide basic reproductive information: Teach both boys and
                    girls about the reproductive systems, menstruation, and the
                    basic biological processes of reproduction.
                  </div>
                </div>
                <div className={styles.paragraph2}>
                  <span>&#8226;</span>
                  <div className={styles.content}>
                    Discuss puberty: Explain the physical changes that occur
                    during puberty, such as the development of breasts, body
                    hair, and changes in voice.
                  </div>
                </div>
                <div className={styles.paragraph2}>
                  <span>&#8226;</span>
                  <div className={styles.content}>
                    Address gender stereotypes: Encourage discussions around
                    gender stereotypes, gender roles, and the importance of
                    equality.
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>3.</span>
              <div className={styles.content}>
                <strong>Pre-adolescence (Ages 11-13): </strong>
                <div className={styles.paragraph2}>
                  <span>&#8226;</span>
                  <div className={styles.content}>
                    Expand on reproductive education: Provide more detailed
                    information about the reproductive system, fertilization,
                    and the menstrual cycle.
                  </div>
                </div>
                <div className={styles.paragraph2}>
                  <span>&#8226;</span>
                  <div className={styles.content}>
                    Discuss sexual gender equity and equality to promote
                    understanding and inclusivity.
                  </div>
                </div>
                <div className={styles.paragraph2}>
                  <span>&#8226;</span>
                  <div className={styles.content}>
                    Teach about consent: Discuss the importance of consent,
                    boundaries, and respecting others&#39; autonomy.
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>4.</span>
              <div className={styles.content}>
                <strong>Adolescence (Ages 14+): </strong>
                <div className={styles.paragraph2}>
                  <span>&#8226;</span>
                  <div className={styles.content}>
                    Cover contraception and STIs: Provide comprehensive
                    information on contraception methods, including abstinence,
                    condoms, and other forms of birth control. Discuss sexually
                    transmitted infections (STIs) and how to prevent them.
                  </div>
                </div>
                <div className={styles.paragraph2}>
                  <span>&#8226;</span>
                  <div className={styles.content}>
                    Address healthy relationships: Discuss the characteristics
                    of healthy relationships, communication skills,
                    assertiveness, and the importance of mutual respect.
                  </div>
                </div>
                <div className={styles.paragraph2}>
                  <span>&#8226;</span>
                  <div className={styles.content}>
                    Discuss consent and sexual activity: Provide in-depth
                    information about consent, sexual decision-making, the legal
                    age of consent, and the importance of practicing safe and
                    consensual sexual activity.
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div>
                Its crucial to adapt the information and language used based on
                the individual childs level of understanding and comfort.
                Encourage an open and supportive environment where children and
                teens feel safe to ask questions and seek guidance from trusted
                adults or educators. Remember, sexual education should be an
                ongoing conversation that addresses their evolving needs and
                concerns as they grow older.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
