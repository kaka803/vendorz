import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'

const Commercial = () => {
  return (
    <>
    <Navbar/>
    <div className="min-h-screen  text-gray-800 px-6 my-30 font-sans">
      <div className="main-container mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-center">Commercial Agreement</h1>

        <p className="mb-4">
          By using the Service provided by <strong>3D Vendorz</strong>, you have
          expressed your acceptance of our Terms of Use and agreed to be bound
          by the terms and conditions as described hereunder.
        </p>

        {/* Registration Obligations */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Registration Obligations
        </h2>
        <p className="mb-4">
          Prior to using the Service, you may register with{" "}
          <strong>3D Vendorz</strong> via the provided Registration Form and
          shall:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Provide true, accurate, current, and complete information
            (“Registration Data”).
          </li>
          <li>
            Maintain and promptly update the Registration Data to keep it true,
            accurate, current, and complete.
          </li>
        </ul>

        {/* User Account */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          User Account, Password, and Security
        </h2>
        <p className="mb-4">
          Upon completing the registration process, you will be assigned an
          account with a password. You are responsible for maintaining the
          confidentiality of the password and all activities that occur under
          your account. You agree to:
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>
            Notify <strong>3D Vendorz</strong> of any unauthorized use or breach
            of security.
          </li>
          <li>Ensure that you exit from your account at the end of each session.</li>
        </ul>

        {/* User Conduct */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">User Conduct</h2>
        <p className="mb-4">
          You are solely responsible for all content you upload, post, email, or
          transmit through the Service. <strong>3D Vendorz</strong> does not
          pre-screen all content and is not liable for its accuracy or quality.
        </p>
        <p className="mb-2">You shall not use the Service to:</p>
        <ul className="list-disc ml-6 mb-4">
          <li>Upload unlawful, abusive, defamatory, obscene, or hateful content.</li>
          <li>Upload content without having rights to it.</li>
          <li>Upload infringing materials.</li>
          <li>Upload viruses or malicious software.</li>
        </ul>
        <p className="mb-4">
          <strong>3D Vendorz</strong> may remove or disclose content if
          necessary to enforce these Terms, comply with law, respond to claims,
          or protect users and the public.
        </p>

        {/* License of Purchased Content */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          License of Purchased Content
        </h2>
        <p className="mb-4">
          Vendors retain ownership of copyrights in purchased/downloaded
          products. License rights are contingent on payment. Buyers receive a
          non-exclusive, non-transferable, worldwide, royalty-free license to
          display or perform purchased content. Redistribution or resale is
          strictly prohibited.
        </p>

        {/* Returns */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Returns</h2>
        <p className="mb-2">Intangible Goods:</p>
        <p className="mb-4">
          Refunds may be granted at the discretion of <strong>3D Vendorz</strong>{" "}
          or the Vendor. If refunded, all copies must be deleted.
        </p>
        <p className="mb-2">Tangible Goods:</p>
        <p className="mb-4">
          Opened products cannot be returned unless defective. Refunds may be
          available within 7 days of receipt, minus shipping costs and a 15%
          restocking fee.
        </p>

        {/* Support */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Support of Purchased Assets
        </h2>
        <p className="mb-4">
          Each Vendor is responsible for support of their products. Support must
          be requested through <strong>3D Vendorz</strong>’s internal messaging
          system.
        </p>

        {/* Indemnity */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Indemnity</h2>
        <p className="mb-4">
          You agree to indemnify and hold harmless <strong>3D Vendorz</strong>,
          its affiliates, officers, and partners from any claims, liabilities,
          or damages arising from your use of the Service, your content, or your
          breach of these Terms.
        </p>

        {/* Use & Storage */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Use and Storage</h2>
        <p className="mb-4">
          <strong>3D Vendorz</strong> is not responsible for the deletion or
          failure to store content and may change storage limits at any time
          without notice.
        </p>

        {/* Service Modifications */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Service Modifications
        </h2>
        <p className="mb-4">
          <strong>3D Vendorz</strong> reserves the right to modify or
          discontinue the Service at any time without liability.
        </p>

        {/* Termination */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Termination of Account
        </h2>
        <p className="mb-4">
          <strong>3D Vendorz</strong> may terminate your account without notice
          for violations, legal compliance, user request, inactivity, or
          technical issues. Termination includes deletion of your account and
          data.
        </p>

        {/* Disclaimer */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Disclaimer of Warranties
        </h2>
        <p className="mb-4">
          The Service is provided “as is” without warranties.{" "}
          <strong>3D Vendorz</strong> does not guarantee uninterrupted service,
          accuracy, or correction of issues. Use at your own risk.
        </p>

        {/* Limitation of Liability */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Limitation of Liability
        </h2>
        <p className="mb-4">
          <strong>3D Vendorz</strong> is not liable for indirect, incidental,
          special, or consequential damages, loss of data, profits, goodwill, or
          issues caused by third parties.
        </p>

        {/* Governing Law */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Governing Law</h2>
        <p className="mb-4">
          These Terms are governed by the laws of England and Wales. Disputes
          will be resolved by courts in England with exclusive jurisdiction.
        </p>

        {/* Amendments */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          Terms of Use Amendment
        </h2>
        <p className="mb-4">
          <strong>3D Vendorz</strong> may modify these Terms at any time with or
          without notice.
        </p>

        {/* Legal Entity */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">Legal Entity</h2>
        <p className="mb-4">
          <strong>DEKARTOPO SYSTEMS LIMITED</strong> <br />
          Registration No.: 16714225 <br />
          Legal Address: 5 Brayford Square, London, England, E1 0SG <br />
          Office Address: Unit B2 at Shoreditch Exchange, Senna Building,
          Gorsuch Place, London, E2 8JF
        </p>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Commercial
