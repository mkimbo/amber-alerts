import { Metadata } from "next";
import styles from "./page.module.scss";
import Breadcrumbs from "@/app/Components/BreadCrumbs";

export const metadata: Metadata = {
  title: "Financial Literacy",
  description:
    "Financial literacy helps individuals become self-sufficient so that they can achieve financial stability",
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
          <div className={styles.title}>Financial Literacy</div>
          <div className={styles.resourceHeader}>
            Financial literacy is the ability to understand and effectively use
            various financial skills, including personal financial management,
            budgeting, and investing. Financial literacy helps individuals
            become self-sufficient so that they can achieve financial stability.
          </div>
          {getProgressBar(`100%`)}
          <div className={styles.resourceBody}>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.header}>For Children:</div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Start Early: </strong>
                Teach children about money management from a young age.
                Introduce concepts like saving, spending, and budgeting in
                age-appropriate ways.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Set Savings Goals: </strong>
                Encourage children to set savings goals for things they want to
                buy. Teach them the importance of saving money regularly towards
                those goals.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Differentiate Needs vs. Wants: </strong>
                Help children understand the difference between essential needs
                and discretionary wants. Teach them to prioritize needs before
                spending on wants.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Allowance and Budgeting: </strong>
                Consider giving children an allowance to help them learn about
                budgeting. Encourage them to allocate their allowance to
                different categories such as saving, spending, and giving.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Delayed Gratification: </strong>
                Teach children the value of patience and delayed gratification.
                Help them understand that saving for a bigger goal can be more
                rewarding than instant spending.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Comparison Shopping: </strong>
                Teach children to compare prices and value before making a
                purchase. Encourage them to research and look for the best
                deals.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Charity and Giving: </strong>
                Instill the value of giving back to the community by encouraging
                children to donate a portion of their money to charitable causes
                they care about.
              </div>
            </div>

            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.header}>For Adults:</div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Create a Budget: </strong>
                Develop a monthly budget that tracks income, expenses, savings,
                and debt. Stick to the budget and regularly review and adjust as
                needed.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Emergency Fund: </strong>
                Establish an emergency fund to cover unexpected expenses. Aim to
                save three to six months&apos; worth of living expenses in case
                of emergencies.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Debt Management: </strong>
                Understand the impact of debt and strive to manage it
                responsibly. Prioritize paying off high-interest debt and avoid
                unnecessary borrowing.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Save for Retirement: </strong>
                Start saving for retirement as early as possible. Contribute to
                retirement accounts such as 401(k) or individual retirement
                accounts (IRAs) to build long-term financial security.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Invest Wisely: </strong>
                Educate yourself about investing and consider long-term
                investment strategies that align with your goals and risk
                tolerance. Seek professional advice if needed.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Track Spending: </strong>
                Monitor your expenses regularly to identify areas where you can
                cut back or make adjustments. Use technology or budgeting apps
                to help track your spending.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Financial Goals: </strong>
                Set short-term and long-term financial goals. Having clear
                objectives can help you stay motivated and focused on your
                financial journey.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Insurance Coverage: </strong>
                Review your insurance coverage, including health, life, and
                property insurance, to ensure adequate protection for yourself
                and your family.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Avoid Impulse Buying: </strong>
                Practice mindful spending and avoid impulsive purchases. Take
                time to evaluate the necessity and value of an item before
                making a buying decision.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Continual Learning: </strong>
                Stay informed about personal finance topics through books,
                articles, podcasts, and workshops. Continual learning can
                empower you to make informed financial decisions.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Negotiate and Comparison Shop: </strong>
                Negotiate prices when possible and shop around for the best
                deals. Saving even small amounts on regular expenses can add up
                over time.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Regularly Review Financial Health: </strong>
                Periodically assess your financial health, including net worth,
                debt-to-income ratio, and progress towards financial goals.
                Adjust your strategies as needed.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Estate Planning: </strong>
                Consider estate planning to ensure your assets are protected and
                distributed according to your wishes. Consult with professionals
                to create a will, designate beneficiaries, and establish trusts
                if necessary.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Seek Professional Advice: </strong>
                If you feel overwhelmed or unsure about managing your finances,
                seek guidance from a certified financial planner or financial
                advisor who can provide personalized advice.
              </div>
            </div>
            <div className={styles.paragraph}>
              <span>&#8226;</span>
              <div className={styles.content}>
                <strong>Teach Financial Literacy to Others: </strong>
                Share your knowledge and experiences with family, friends, and
                children. Encourage financial literacy in your community to help
                others improve their financial well-being.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
