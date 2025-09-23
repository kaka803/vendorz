import React from 'react'
import Navbar from '../components/navbar'
import Footer from '../components/footer'
import CurrencySidebar from '../components/CurrencySidebar'
const Terms = () => {
  return (
    <>
    <CurrencySidebar />
    <Navbar/>
    <div className="min-h-screen  my-30  text-gray-800 px-6  font-sans">
      <div className="main-container mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-center">Terms and Conditions</h1>

        <p className="mb-4">
          This is a legally binding agreement between (“you”) and{" "}
          <strong>3D Vendorz</strong> regarding your use of the Site. “You”
          refers to the entity bound by these Terms of Use (“Terms”), whether
          that is a natural person who must be at least 18 years of age or a
          corporate entity.
        </p>

        <p className="mb-4">
          These Terms may be translated into other languages, but the governing
          language is English in the event of any contradiction in terms between
          the English and foreign translation.
        </p>

        {/* Definitions */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">I. Definitions</h2>
        <p className="mb-4">
          “3D Vendorz” includes 3D Vendorz and all licensed affiliates and
          partners that distribute Stock Media Products on behalf of 3D Vendorz.
        </p>
        <p className="mb-4">
          “Stock Media Product” means any collection of digital files, images,
          videos, or related content packaged as a product on the Site and
          identified by a product ID. This includes (but is not limited to) 3D
          models, texture maps, motion captures, photos, plugins, shaders,
          vector graphics, sound effects, stock music, training materials, and
          videos.
        </p>
        <p className="mb-4">
          “Site” refers to the 3D Vendorz website, APIs, software applications,
          source code, UI layouts, designs, content, reports, and all associated
          intellectual property protected by copyright, trademark, or patent.
        </p>

        {/* General Use */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">II. General Use</h2>
        <h3 className="text-xl font-semibold mb-2">1. General License</h3>
        <p className="mb-4">
          Except as expressly licensed to you, 3D Vendorz and its licensors
          retain all rights, title, and interest in the Site and all Stock Media
          Products. Unauthorized use may result in account termination and legal
          action.
        </p>
        <ul className="list-disc ml-6 mb-4">
          <li>Repackaging, linking, or framing content for commercial use</li>
          <li>Removing or obscuring watermarks/copyright</li>
          <li>Scraping, crawling, or mining data</li>
          <li>Reverse engineering or derivative works</li>
          <li>Interfering with other users</li>
          <li>Bypassing security measures</li>
          <li>Unsolicited recruitment or spam</li>
          <li>Sharing private/restricted content</li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">
          2. Material Submitted by You
        </h3>
        <p className="mb-4">
          3D Vendorz does not claim ownership of submitted materials. However,
          you agree not to post harmful, defamatory, obscene, illegal,
          infringing, or spam content, nor upload malicious code or links.
        </p>

        {/* Warranties */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">III. Warranties</h2>
        <p className="mb-4">
          You represent and warrant that you have legal authority to enter this
          agreement and will comply with all applicable laws and these Terms
          when using the Site.
        </p>

        {/* Limitation of Liability */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          IV. Limitation of Liability
        </h2>
        <p className="mb-4">
          The Site is provided “as is” and “as available” without warranties of
          any kind. 3D Vendorz is not liable for any direct, indirect,
          incidental, or consequential damages from your use. You agree to
          indemnify 3D Vendorz, its affiliates, partners, and staff against
          claims arising from your use of the Site.
        </p>

        {/* Termination & General Terms */}
        <h2 className="text-2xl font-semibold mt-8 mb-4">
          V. Termination and General Terms
        </h2>
        <p className="mb-4">
          These Terms constitute the entire agreement between you and 3D
          Vendorz, unless replaced by a signed license agreement. Violation may
          result in suspension or termination of your account.
        </p>
        <p className="mb-4">
          You must comply with import/export laws and will not distribute Site
          content to prohibited entities or nations.
        </p>
        <p className="mb-4">
          This agreement is governed by the laws of England and Wales. Any
          disputes must be brought in courts located in London, England.
        </p>
        <p className="mb-4">
          3D Vendorz may arbitrate disputes at its discretion, and such
          arbitration shall be binding.
        </p>
        <p className="mb-4">
          Notices must be sent via email to{" "}
          <a
            href="mailto:support@3dvendorz.com"
            className="text-blue-600 underline"
          >
            support@3dvendorz.com
          </a>{" "}
          or by mail to: <br />
          <strong>3D Vendorz, DEKARTOPO SYSTEMS LIMITED</strong> <br />
          Unit B2 at Shoreditch Exchange, Senna Building, Gorsuch Place, London,
          E2 8JF <br />
          Legal Address: 5 Brayford Square, London, England, E1 0SG
        </p>
        <p className="mb-4">
          3D Vendorz may assign this agreement in case of acquisition, merger,
          or sale. You may not assign without prior written consent.
        </p>
        <p className="mb-4">
          While translations may be available, English is the governing language
          for this agreement.
        </p>

        {/* Footer */}
        <p className="mt-8 text-sm text-gray-600">
          These Terms of Use are in effect as of September 5, 2025.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  )
}

export default Terms
