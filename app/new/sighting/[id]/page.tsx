import styles from "./page.module.scss";
import { ServerAuthProvider } from "../../../../auth/server-auth-provider";
import { NewSightingForm } from "./NewSightingForm";
import { TPerson } from "../../../../models/missing_person.model";
import { serverDB } from "@/utils/firebase";
import { TMotor } from "@/models/misssing_motor.model";
async function getMissingPersonData(personId: string): Promise<TPerson | null> {
  const missingPerson = await serverDB
    .collection(process.env.FIREBASE_FIRESTORE_MISSING_PERSONS!)
    .doc(personId)
    .get();
  if (!missingPerson.exists) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("No missing person found with that id");
  }

  return missingPerson.data() as TPerson;
}

async function getMissingMotorData(motorId: string): Promise<TMotor | null> {
  const missingMotor = await serverDB
    .collection(process.env.FIREBASE_FIRESTORE_MISSING_MOTORS!)
    .doc(motorId)
    .get();
  if (!missingMotor.exists) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("No missing vehicle/bike found with that id");
  }

  return missingMotor.data() as TMotor;
}

export default async function NewSighting({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { type: string };
}) {
  if (!params.id) {
    throw new Error("No personId provided");
  }
  const alertType = searchParams.type;
  if (!alertType) {
    throw new Error("No sighting type provided");
  }

  let data: TPerson | TMotor | null = null;
  if (alertType === "person") {
    data = await getMissingPersonData(params.id);
  }
  if (alertType === "motor") {
    data = await getMissingMotorData(params.id);
  }

  if (!data) {
    throw new Error("No missing person/vehicle/bike found with that id");
  }

  return (
    <div className={styles.container}>
      {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
      <ServerAuthProvider>
        <NewSightingForm
          missingItem={{ ...data, id: params.id } as TPerson | TMotor}
          type={alertType === "person" ? "person" : "motor"}
        />
      </ServerAuthProvider>
    </div>
  );
}

// This system supplements, rather than replaces, other communication methods used by emergency responders, both in person and through the use of other media.

// Privacy Policy

// Effective date: January 2, 2023

// Updated: April 11, 2023

// Our website, SchoolAI.co, (“Website”) and the services we offer, including our mobile applications and other online services (together with the Website, the “Services”) are operated by Backbeat Ltd (“we”, “us”, or “our”). We respect your privacy and are committed to protecting it through our compliance with this policy.

// This policy describes the types of information we may collect from you or that you may provide when you use our Website and our Services, and our practices for collecting, using, maintaining, protecting, and disclosing that information.

// Please read this policy carefully to understand our policies and practices regarding your information and how we will treat it. If you do not agree with our policies and practices, do not use our Website or Services. By accessing or using our Website or Services, you agree to this privacy policy. This policy may change from time to time. Your continued use of the Website or Services after we make changes is deemed to be acceptance of those changes, so please check the policy periodically for updates.

// Children Under the Age of 18

// Our Website and Services are not intended for children under 18 years of age. No one under age 18 may provide any personal information to or on the Website or Services. We do not knowingly collect personal information from children under 18. If you are under 18, do not use or provide any information on this Website or through any of its features. If we learn we have collected or received personal information from a child under 18 without verification of parental consent, we will delete that information. If you believe we might have any information from or about a child under 18, please contact us at hello@schoolai.co.

// Information We Collect and How We Collect It

// We may collect information from you in a variety of ways, including:

// Information you provide to us: We may collect information that you provide to us directly when you use the Services, such as when you create a user account, update your profile information, or post content on the Website. This information may include your name, email address, phone number, and any other information you choose to provide.

// Information we collect automatically: We may automatically collect information about your use of the Services, your device, and your interactions with the Services. This information may include your IP address, device type, browser type, operating system, mobile device identifiers, and other technical information. We may also collect information about your location, including location data from your device or IP address.

// We use cookies and similar technologies to collect information about your use of the Services and to remember your preferences. You can manage your cookie preferences through your browser settings or by following the instructions provided in our cookie policy.

// Information we collect from third parties: We may receive information about you from third parties, such as other users, social media platforms, and other websites that you visit.

// How We Use Your Information

// We may use your information to:

// Provide, maintain, and improve the Services;
// Communicate with you, including by sending you notifications and updates;
// Personalize your experience and provide customized content and recommendations;
// Monitor and analyze trends, usage, and activities in connection with the Services;
// Detect, prevent, and address technical issues;
// Develop new products and services;
// Protect the safety and security of the Services and our users;
// Comply with legal obligations and resolve any disputes that we may have;
// Send you marketing communications, subject to your consent, and provide information on how to opt-out of receiving such communications.
// Legal basis for processing personal information: We process your personal information based on your consent, our legitimate interest in providing the Services, or as required by law.

// SchoolAI uses the OpenAI API in our Services. When using the OpenAI API, we ensure that no data passed to the API is used for LLM training.

// Sharing of Your Information

// We may share your information with third parties in the following circumstances:

// With your consent: We may share your information with third parties when you have given us your consent to do so.
// With service providers: We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, payment processing, and customer service. These service providers are required to maintain the confidentiality of your information and are prohibited from using it for any purpose other than to provide the services we have contracted them to perform.
// With business partners: We may share your information with our business partners for marketing and promotional purposes, subject to your consent.
// For legal reasons: We may share your information if we believe it is necessary in order to comply with a legal obligation, such as a court order or subpoena, or to protect the safety and security of our users or the general public.
// With affiliates: We may share your information with our affiliates for the purposes described in this policy. Our affiliates are companies that are related to us through common ownership or control.
// In connection with a merger or acquisition: If we are involved in a merger, acquisition, or sale of all or a portion of our assets, we may share your information with the other parties involved in the transaction.
// In cases where your information may be transferred outside the European Economic Area (EEA), we ensure that appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.

// Data Retention and Account Deletion

// We will retain your information for as long as your account is active or as needed to provide you with the Services. We will retain and use your information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements.

// You may request that we delete your account and personal information by contacting us at hello@schoolai.co. Please note that some information may remain in our records after your account has been deleted, and we may retain certain information as necessary to comply with legal obligations, resolve disputes, and enforce our agreements.

// Security of Your Information

// We have implemented appropriate technical and organisational measures to protect the security of your information. However, please note that no method of transmission over the Internet, or method of electronic storage, is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.

// User Rights

// You have the right to access, correct, or delete your personal information, as well as the right to object to or restrict certain types of processing. To exercise these rights, please contact us at hello@schoolai.co. Note that some requests may be subject to limitations based on applicable laws and regulations.

// Changes to This Policy

// We may update this policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons. We encourage you to review the policy periodically for the latest information on our privacy practices.

// Contact Us

// If you have any questions about this policy or our treatment of your personal information, please contact us at hello@schoolai.co
