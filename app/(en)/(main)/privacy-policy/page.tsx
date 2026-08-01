import type { Metadata } from "next";
import { alternatesFor } from "@/app/root-shell";

// Documento de la aplicacion interna de QuickBooks: solo existe en ingles.
export const metadata: Metadata = {
  alternates: alternatesFor("en", "/privacy-policy/", false),
};

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-3xl bg-white px-6 py-16 text-zinc-800 sm:px-10">
      <h1 className="mb-2 text-3xl font-bold tracking-tight">
        EXCELLENTIA FOODS LLC
      </h1>
      <p className="mb-2 text-lg font-semibold text-zinc-600">
        PPRIVACY POLICY
      </p>
      <p className="text-base italic text-zinc-600">
        Internal QuickBooks-Connected Application
      </p>
      <p className="mb-10 text-sm text-zinc-500">
        Effective Date: June 3, 2026
      </p>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">
          1. Introduction and Scope
        </h2>
        <p className="mb-4 leading-relaxed">
          Excellentia Foods LLC (
          <strong>“Excellentia,” “Company,” “we,” “us,” or “our”</strong>)
          respects the privacy of the personal information it processes. This
          Privacy Policy (this <strong>“Policy”</strong>) explains how we
          collect, use, disclose, secure, and retain personal information in
          connection with our internal, web-based application that integrates
          with Intuit QuickBooks Online (the <strong>“Application”</strong>).
        </p>
        <h3 className="mb-2 mt-6 font-semibold">1.1 Internal use only. </h3>
        <p className="mb-4 leading-relaxed">
          The Application is a confidential business tool made available only to
          the Company's authorized employees and administrators (“Authorized
          Users”). It is not a public website or a consumer product, and it is
          not directed to the general public. This Policy is not a
          website-visitor or marketing privacy notice.
        </p>
        <h3 className="mb-2 mt-6 font-semibold">
          1.2 Who and what this covers.
        </h3>
        <p className="mb-4 leading-relaxed">
          This Policy applies to (a) personal information about Authorized Users
          that we process because they access and use the Application, and (b)
          personal information contained in the accounting and financial records
          that the Application accesses through its QuickBooks integration,
          which may include information about the Company's customers, vendors,
          and other third parties.
        </p>
        <h3 className="mb-2 mt-6 font-semibold">
          1.3 Relationship to the EULA.
        </h3>
        <p className="leading-relaxed">
          This Policy supplements the Company's End-User License Agreement for
          the Application. Use of the Application is also governed by that
          agreement and by applicable Company policies.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">
          2. Personal Information We Collect
        </h2>
        <p className="mb-4 leading-relaxed">
          <strong>2.1</strong> We collect and process the following categories
          of personal information in connection with the Application:
        </p>
        <ul className="mb-4 list-inside list-disc space-y-2 leading-relaxed">
          <li>
            <strong>Identity and account information:</strong> your name, work
            email address, job title or role, user identifiers, and access
            credentials used to authenticate you to the Application.
          </li>
          <li>
            <strong>Usage and log data:</strong> information generated
            automatically when you use the Application, such as IP address,
            device and browser type, dates and times of access, pages and
            features used, queries run, and audit logs of actions taken within
            the Application.
          </li>
          <li>
            <strong>QuickBooks-sourced data:</strong> accounting and financial
            records the Application retrieves from or transmits to Intuit
            QuickBooks Online (“QuickBooks Data”), which may include the names,
            contact details, transaction histories, invoices, payment records,
            and financial information of the Company's customers, vendors, and
            other third parties.
          </li>
          <li>
            <strong>Communications:</strong> information you provide when you
            contact us about the Application, including the content of your
            messages.
          </li>
          <li>
            <strong>Sensitive information:</strong> Some information processed
            through the Application, such as financial account information, may
            be considered “sensitive personal information” under applicable law.
            We use and disclose such information only as necessary for the
            business purposes described in this Policy.
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">
          3. How We Collect Personal Information
        </h2>
        <p className="leading-relaxed">
          <strong>3.1</strong> We collect personal information: (a) directly
          from you, when you are granted access and when you use the
          Application; (b) automatically, through your use of the Application
          and its logging and security functions; and (c) from Intuit, through
          the Application's authorized connection to QuickBooks Online.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">
          4. How We Use Personal Information
        </h2>
        <p className="mb-4 leading-relaxed">
          <strong>4.1</strong> We use personal information for legitimate
          business purposes, including to:
        </p>
        <ul className="mb-4 list-inside list-disc space-y-2 leading-relaxed">
          <li>
            provide, operate, maintain, secure, and improve the Application;
          </li>
          <li>
            perform the Company's accounting, bookkeeping, financial, and other
            internal business functions through the QuickBooks integration;
          </li>
          <li>
            authenticate Authorized Users and manage access and permissions;
          </li>
          <li>
            monitor, audit, and log use of the Application for security,
            integrity, and compliance purposes;
          </li>
          <li>
            detect, investigate, prevent, and respond to security incidents,
            fraud, misuse, and unauthorized activity;
          </li>
          <li>
            comply with applicable laws, regulations, and our obligations to
            Intuit; and
          </li>
          <li>communicate with Authorized Users about the Application.</li>
        </ul>
        <p className="leading-relaxed">
          <strong>4.2</strong> We do not use personal information processed
          through the Application for advertising, and we do not use advertising
          cookies or third-party advertising trackers in the Application.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">
          5. How We Disclose Personal Information
        </h2>
        <p className="mb-4 leading-relaxed">
          <strong>5.1</strong> We disclose personal information only as needed
          for the purposes described above, including to:
        </p>
        <ul className="mb-4 list-inside list-disc space-y-2 leading-relaxed">
          <li>
            <strong>Intuit:</strong> iin connection with the QuickBooks
            integration. Information exchanged with Intuit is also handled under
            Intuit's own terms and privacy statement, available at{" "}
            <a
              href="https://www.intuit.com/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-zinc-500"
            >
              https://www.intuit.com/privacy/
            </a>
            .
          </li>
          <li>
            <strong>Service providers:</strong> third parties that provide
            hosting, security, IT, and similar services on our behalf, bound by
            confidentiality and data-protection obligations.
          </li>
          <li>
            <strong>Within the Company:</strong> Authorized Users and personnel
            who have a legitimate need to know in order to perform their duties.
          </li>
          <li>
            <strong>Legal and compliance:</strong> courts, regulators, or other
            parties where required by law, to enforce our agreements, or to
            protect the rights, property, or safety of the Company, its
            personnel, or others.
          </li>
          <li>
            <strong>Business transfers:</strong> a successor or acquirer in
            connection with a merger, acquisition, financing, or sale of assets,
            subject to this Policy.
          </li>
        </ul>
        <h3 className="mb-2 mt-4 font-semibold">
          5.2 No sale of personal information.
        </h3>
        <p className="leading-relaxed">
          We do not sell personal information, and we do not share it for
          cross-context behavioral advertising, as those terms are defined under
          California law.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">
          6. Intuit / QuickBooks Integration
        </h2>
        <h3 className="mb-2 mt-4 font-semibold">6.1 Independent roles.</h3>
        <p className="mb-4 leading-relaxed">
          The Application connects to QuickBooks Online under Intuit's developer
          terms. With respect to personal information, the Company and Intuit
          each independently determine the purposes and means of their own
          processing and act as independent controllers, not joint controllers.
          Each party is responsible for its own compliance with applicable law.
        </p>
        <h3 className="mb-2 mt-4 font-semibold">6.2 Intuit's handling.</h3>
        <p className="leading-relaxed">
          When data is exchanged with Intuit, Intuit may process and store it,
          including in countries other than where you are located, in accordance
          with Intuit's privacy statement. We encourage you to review it.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">
          7. Monitoring and No Expectation of Privacy
        </h2>
        <p className="leading-relaxed">
          <strong>7.1</strong> The Application is a Company business system. To
          the extent permitted by applicable law, the Company may access,
          monitor, record, review, audit, and log all activity within the
          Application. Authorized Users should have no expectation of privacy in
          their use of the Application or in any data they place in it. This
          Section is consistent with, and supplements, the monitoring provisions
          of the EULA.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">8. Data Security</h2>
        <p className="leading-relaxed">
          <strong>8.1</strong> We maintain administrative, technical, and
          physical safeguards designed to protect personal information against
          unauthorized access, use, alteration, loss, or disclosure, including
          access controls, authentication, encryption in transit where
          appropriate, encryption at rest for data of comparable sensitivity,
          and logging. Authorized Users must comply with the Company's security
          requirements and must report any suspected security incident promptly
          as required by the EULA. In the event of a breach of the security of
          personal information, we will notify affected individuals and any
          other persons as and when required by applicable law, including
          California Civil Code section 1798.82. No system can be guaranteed to
          be completely secure.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">9. Data Retention</h2>
        <p className="leading-relaxed">
          <strong>9.1</strong> We retain personal information for as long as
          necessary to operate the Application, to fulfill the purposes
          described in this Policy, and to comply with our legal, accounting,
          tax, and recordkeeping obligations. The criteria we use to determine
          retention periods include the category of personal information at
          issue, the purpose for which it is processed, the duration of the
          Authorized User's access and of the Company's relationship with the
          relevant customer or vendor, and the periods required by applicable
          accounting, tax, and recordkeeping laws and by our obligations to
          Intuit. On this basis, audit-log and security data, identity and
          credential data, and QuickBooks-sourced accounting records may be
          retained for different periods. When information is no longer needed,
          we securely delete or de-identify it, subject to any retention
          required by law or by our obligations to Intuit.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">
          10. Your California Privacy Rights
        </h2>
        <p className="mb-4 leading-relaxed">
          <strong>10.1</strong> Excellentia Foods LLC is based in California,
          and California residents, including employees and administrators, have
          rights under the California Consumer Privacy Act, as amended by the
          California Privacy Rights Act (collectively, the “CCPA”). Subject to
          the CCPA's exceptions, you have the right to:
        </p>
        <ul className="mb-4 list-inside list-disc space-y-2 leading-relaxed">
          <li>
            know the categories and specific pieces of personal information we
            have collected about you, and how we use and disclose it;
          </li>
          <li>access a copy of your personal information;</li>
          <li>correct inaccurate personal information;</li>
          <li>request deletion of your personal information; and</li>
          <li>
            limit the use and disclosure of sensitive personal information to
            permitted business purposes.
          </li>
        </ul>
        <p className="mb-4 leading-relaxed">
          <strong>10.2</strong> Because we do not sell personal information or
          share it for cross-context behavioral advertising, no opt-out of sale
          or sharing is required. We will not discriminate against you for
          exercising your rights. We do not offer financial incentives, or price
          or service differences, in exchange for the collection, retention, or
          processing of personal information.
        </p>
        <p className="leading-relaxed">
          <strong>10.3</strong> To exercise your rights, contact us using the
          details in Section 13. The email address in Section 13 is our
          designated method for submitting verifiable requests. You may submit a
          request yourself or through an authorized agent acting on your behalf;
          if you use an authorized agent, we may require the agent to provide
          proof of authorization and may require you to verify your own identity
          directly with us. We will verify your request and respond within the
          timeframes required by law. Some information must be retained where
          the law permits or requires, and certain records connected to
          QuickBooks Data may need to be addressed through Intuit.
        </p>
        <p className="leading-relaxed">
          <strong>10.4</strong> Individuals who reside outside California,
          including customers, vendors, and other third parties whose
          information appears in QuickBooks Data, may have rights under the
          privacy laws of their own jurisdictions. If you believe such a law
          applies to your information, you may contact us using the details in
          Section 13, and we will respond as required by applicable law.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">
          11. Children's Information
        </h2>
        <p className="leading-relaxed">
          <strong>11.1</strong> The Application is an internal tool for
          authorized personnel only. It is not intended for, or directed to,
          children, and we do not knowingly collect personal information from
          children under 13 through the Application. If you believe a child's
          information has been provided to us in error, please contact us so we
          can promptly delete it.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">
          12. Cookies and Similar Technologies
        </h2>
        <p className="leading-relaxed">
          <strong>12.1</strong> The Application may use strictly necessary
          cookies and similar technologies to authenticate users, maintain
          sessions, and keep the Application secure. The Application does not
          use advertising or marketing cookies, and we do not permit third-party
          advertising networks to track activity within the Application.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">
          13. Changes to This Policy; Contact
        </h2>
        <h3 className="mb-2 mt-4 font-semibold">13.1 Changes.</h3>
        <p className="mb-4 leading-relaxed">
          We may update this Policy from time to time. We will post the updated
          Policy and, where appropriate, notify Authorized Users. The “Last
          Updated” date above indicates when this Policy was last revised.
          Continued use of the Application after an update constitutes
          acceptance of the revised Policy.
        </p>
        <h3 className="mb-2 mt-4 font-semibold">13.2 Contact.</h3>
        <p className="leading-relaxed">
          If you have questions about this Policy or wish to exercise your
          privacy rights, contact us at:
        </p>
        <address className="mt-2 not-italic leading-relaxed">
          <strong>Excellentia Foods LLC</strong>
          <br />
          2323 Avenida Costa Este, Suite 100, San Diego, CA 92154
          <br />
          Email:{" "}
          <a
            href="mailto:chris@excellentiafoods.com"
            className="underline underline-offset-2 hover:text-zinc-500"
          >
            chris@excellentiafoods.com
          </a>
        </address>
      </section>
    </main>
  );
}
