const Disclaimer = () => {
  return (
    <div className="flex flex-col items-center lg:mt-[5%] relative bg-[#F5F5F7] mt-10 lg:space-y-0 space-y-2 ptop">
      <div className="lg:w-9/12 w-11/12 px-4 workswidth md:w-full md:px-10 lg:px-0 lg:bg-[#f5f5f7] text-left xl:py-[3%] text-gray-600 md:bg-[#f5f5f7]">
        <h1 className="text-2xl lg:text-4xl pb-5 mt-16 md:mt-8 mmargin">
          Disclaimer for Symbiosis Infra Pvt Ltd
        </h1>
        <div className="text-lg text-gray-600 space-y-6">
          <p>
            If you require any more information or have any questions about our
            site's disclaimer, please feel free to contact us by email at{" "}
            <a
              href="mailto:info@symbiosisinfra.com"
              className="text-blue-500 hover:underline"
            >
              info@symbiosisinfra.com
            </a>
          </p>
          <h2 className="text-2xl  text-gray-600">
            Disclaimers for symbiosisinfra.com
          </h2>
          <p>
            All the information on this website -{" "}
            <a
              href="https://www.symbiosisinfra.com/"
              className="text-blue-500 hover:underline"
            >
              https://www.symbiosisinfra.com/
            </a>{" "}
            - is published in good faith and for general information purpose
            only. symbiosisinfra.com does not make any warranties about the
            completeness, reliability and accuracy of this information. Any
            action you take upon the information you find on this website
            (symbiosisinfra.com), is strictly at your own risk.
            symbiosisinfra.com will not be liable for any losses and/or damages
            in connection with the use of our website.
          </p>
          <p>
            From our website, you can visit other websites by following
            hyperlinks to such external sites. While we strive to provide only
            quality links to useful and ethical websites, we have no control
            over the content and nature of these sites. These links to other
            websites do not imply a recommendation for all the content found on
            these sites. Site owners and content may change without notice and
            may occur before we have the opportunity to remove a link which may
            have gone 'bad'.
          </p>
          <p>
            Please be also aware that when you leave our website, other sites
            may have different privacy policies and terms which are beyond our
            control. Please be sure to check the Privacy Policies of these sites
            as well as their "Terms of Service" before engaging in any business
            or uploading any information.
          </p>
          <h2 className="text-2xl  text-gray-600">Consent</h2>
          <p>
            By using our website, you hereby consent to our disclaimer and agree
            to its terms.
          </p>
          <h2 className="text-2xl  text-gray-600">Update</h2>
          <p>
            Should we update, amend or make any changes to this document, those
            changes will be prominently posted here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Disclaimer;
