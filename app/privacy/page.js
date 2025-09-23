import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import CurrencySidebar from '../components/CurrencySidebar'
const Privacy = () => {
  return (
    <>
    <CurrencySidebar />
    <Navbar/>
    <div>
      <div className="min-h-screen bg-gray-50 font-sans  text-gray-800 px-6 py-12">
      <div className="main-container mx-auto pt-25 pb-15">
        <h1 className="text-5xl font-bold mb-6 text-center">Privacy Policy</h1>
        <p className="mb-4">
          Hi there, we’re <strong>3D RENDER SYSTEMS LIMITED</strong> of 5 Brayford Square, London,
          England, E1 0SG (“3D Render”) and welcome to our privacy policy. This policy sets out how
          we handle your personal information if you’re a 3D Render user or visitor to our Sites. It
          applies across CG Jobs and any other sites operated by 3D Render (the “Sites”).
        </p>

        <p className="mb-4">
          When we say ‘we’, ‘us’ or ‘3D Render’ it’s because that’s who we are and we own and run
          the Sites.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          The type of personal information we collect
        </h2>
        <p className="mb-4">
          We collect certain personal information about visitors and users of our Sites. The most
          common types of information we collect include: usernames, member names, email addresses,
          IP addresses, other contact details, survey responses, blogs, photos, payment information,
          transactional data, tax information, support queries, forum comments, content you direct
          us to make available on our Sites, and web analytics data.
        </p>

        <p className="mb-4">
          We also collect personal information from job applications, such as CVs, application
          forms, cover letters, and interview notes.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">How we collect personal information</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>Directly when you provide it (e.g., account registration, purchases, surveys)</li>
          <li>Automatically as you navigate through the Sites</li>
          <li>From third parties when you use services connected with the Sites</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">
          How we use personal information
        </h2>
        <p className="mb-4">
          We use personal information to fulfil contracts, operate and maintain the Sites, provide
          services to users, verify identity, respond to support tickets, send updates, perform
          analytics, monitor activity, manage risks, improve products, and comply with law.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Marketing Choices</h2>
        <p className="mb-4">
          If you’ve given consent, we may send you marketing emails about products/services we think
          you’ll like. You can opt out at any time via the “unsubscribe” link.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies and Web Analytics</h2>
        <p className="mb-4">
          When you visit our Sites, we collect data like IP address, domain, ISP details, session
          duration, pages viewed, and referring websites. We may use third-party ad platforms (like
          Google Ads) to show ads based on your visit history.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Information about children</h2>
        <p className="mb-4">
          Our Sites are not for users under 16 years of age. If you’re under 16, please do not use
          our services or submit personal data.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
        <p className="mb-4">
          For privacy-related queries, contact us at:
          <br />
          <strong>Email:</strong> support@3drender.com
          <br />
          <strong>Mail:</strong> 3D RENDER SYSTEMS LIMITED, Unit B2 at Shoreditch Exchange, Senna
          Building, Gorsuch Place, London, E2 8JF, United Kingdom
        </p>

        <p className="mt-8 text-sm text-gray-600">
          Privacy Policy, effective date: 5 September 2025 <br />
          Last reviewed and updated for 3D Render: 16 September 2025
        </p>
      </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Privacy
