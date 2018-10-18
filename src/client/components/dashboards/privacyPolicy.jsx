// Node.JS
import React from "react";  
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Button, Input } from 'reactstrap';  
  
class PrivacyPolicy extends React.Component {

  constructor(props) {
    super(props);  
  } 
 
  render() { 
    return (
      <Container id="main" className="container privacyPolicy" fluid={true}>   
      <Row id="top-toolbar">
        <Col xs={{size: 3, offset: 1}} sm={{size: 3, offset: 1}} md={{size: 3, offset: 1}} lg={{size: 3, offset: 1}} className="d-flex justify-content-start">
            <i className="fa fa-chevron-left fa-2x formIcon" onClick={() => { this.props.history.push('/'); }}/> 
        </Col> 
        <Col xs={{size: 4}} sm={{size: 4}} md={{size: 4}} lg={{size: 4}} className="d-flex justify-content-center"> 
              <h1>Privacy Policy</h1> 
        </Col> 
        <Col xs={{size: 3}} sm={{size: 3}} md={{size: 3}} lg={{size: 3}} className="d-flex justify-content-end"> 
                <br/><br/>
                <p>Effective date: October 17th 2018</p>
        </Col> 
      </Row>
      <Row>
        <Col xs={12} sm={12} md={12} lg={12}> 
                  <hr/>
                  <h3>Introduction</h3> 
                  Welcome to Pelican, your number one source for recreational & medical marijuana lead generation services.
                  <br/>
                  This "Privacy Policy" governs your use of www.pelicandelivers.com and any other Pelican Delivers, Inc owned and operated website or mobile application; including but not limited to any interactive features or other online services that may post a link to www.pelicandelivers.com (hereinafter referred to "Service").
                  <br/><br/>
                  In addition to reviewing this Privacy Policy, please review our Terms and Conditions of Service User Agreement which governs the use of the Service. If you do not agree to abide by the Terms and Conditions of Service, you automatically opt out of the PELICAN platform and are prohibited from using PELICAN. If you agree to abide by the Terms and Conditions of Service User Agreement and subsequently violate the terms of the Agreement, your use of the Service will be terminated. <b>By using our Service, you consent to our Privacy Policy and Terms and Conditions of Service User Agreement and our collection, use and sharing of your information and data, and other activities, as described below.</b>
                  <br/>
                  <br/>
                  <h4>Information Collected</h4>
                  <br/>
                  Registering with the Service, requires certain information such as: (1) personally identifiable information, which is information that identifies you personally, including but not limited to your first and last name, email address, home address, Pictures of yourself & your state issued drivers license, date of birth and phone number ("Personal Information"); and (2) demographic information, such as information about your location, age, gender, and spending habits ("Demographic Information"); and (3) medical information regarding your medical marijuana recommendation, including the name and license number of your recommending physician, the contact information of the physician, the method to verify the recommendation's authenticity, the expiration date of the recommendation, the recommendation verification number, and the details of any orders placed through the Service ("Usage Information"). We may collect this information through various forms and in various places on the Service, including if you register for an account, through "contact us" forms, or when you otherwise interact with the Service in any way. If we combine Demographic Information with the Personal Information we collect directly from you on the Service, we will treat the combined data as Personal Information under this Privacy Policy. All Personal Information collected by PELICAN is proprietary information, and is the property of PELICAN.
                  <br/>
                  <br/>
                  <h4>Location-Based Information</h4>
                  <br/>
                  Our Service may use location-based services in order to locate you so that we may verify your location, deliver you relevant content based on your location, and share your location with the pre-registered delivery driver, restaurant and dispensary service providers as part of the location-based services we offer.
                  <br/>
                  <br/>
                  <h4>Information Third Parties Provide About You</h4>
                  <br/>
                  We may receive information about you from our affiliates, from any other users of the Service, or from any other third parties that may provide us information we deem relevant to your use of the Service. PELICAN may at its sole discretion collect and use this information as Personal Information.
                  <br/>
                  <br/>
                  <h4>Interactions with Third Party Sites</h4>
                  <br/>
                  The Service may include functionality that allows certain kinds of interactions between the Service and your account on a third-party web site or application; for example interaction with dispensary, restaurant and payment providers. The use of this functionality may involve the third-party operator providing certain information, including Personal Information, to us. For example, we may provide third-party sites' interfaces or links on the Service to facilitate your sending a communication from the Service. PELICAN may at its sole discretion collect and use this information as Personal Information.
                  <br/>
                  <br/>
                  <h4>The Health Insurance Portability and Accountability Act of 1996 (HIPAA) Compliance</h4>
                  <br/>
                  The HIPAA Privacy Rule establishes standards to protect users of the Service individuals' medical records and other personal health information. The Service has appropriate safeguards to protect the privacy of personal health information, and sets limits and conditions on the uses and disclosures that may be made of such information without patient authorization.
                  <br/>
                  However, we may use your Personal Information, Demographic Information or Usage Information at PELICAN's sole discretion for various purposes, including but not limited to:
                  <br/><br/>
                  <ul>
                    <li>Processing of transactions; providing special offers catered to users' needs; enabling users to participate in the Service's features; providing users with a customized experience; providing customer support; contacting user regarding any updates or changes to this policy or Terms and Conditions; and for other purposes disclosed at the time you provide your information or as otherwise set forth in this Privacy Policy.</li>
                    <br/>
                    <li>We incorporate commercially reasonable safeguards to help protect and secure your Personal Information. However, no data transmission over the Internet, mobile networks, wireless transmission or electronic storage of information can be guaranteed to be 100% secure. Please note that we cannot ensure the security of any information you transmit to us, and you use our Service and provide us with your information at your own risk.</li>
                  </ul>
                  <br/>
                  <br/>
                  <h4>How and When Do We Disclose Information to Third Parties?</h4>
                  <br/>
                  We may share non-Personal Information, such as aggregated user statistics, with third parties. We do not share the Personal Information that we collect with third parties for those third parties' direct marketing purposes. We may share the information we have collected about you, including Personal Information, as disclosed at the time you provide your information and as described below or otherwise in this Privacy Policy. The Service may disclose your information as follows:
                  <br/><br/>
                  <ul>
                      <li>When You Provide Information to Third Parties. You may be presented with an option on our Service to receive certain information and/or marketing offers directly from third parties. If you choose to do so, your Personal Information and other information may be disclosed to such third parties and all information you disclose will be subject to the third party privacy policies and practices of such third parties. We are not responsible for the privacy policies and practices of such third parties and, therefore, you should review such third party privacy policies and practices of such third parties prior to requesting information from or otherwise interacting with them.</li>
                      <li>Administrative and Legal Reasons. We may disclose Personal and Usage Information when subpoenaed by law enforcement; to protect the Service; and to detect or prevent misuse, fraud, security, or technical issues or where otherwise required to do so by law.</li>
                  </ul>
                  <br/>
                  <br/>
                  <h4>Information User Discloses</h4>
                  <br/>
                  The Service will contain a community forum and message board where users are able to create user profiles, writings, photographs, ideas, videos, audio recordings, computer graphics, pictures, data, or other content, including Personal Information (collectively, "User Content"). All User Content once posted immediately becomes the property of PELICAN. The Service may display, reproduce, publish, distribute or otherwise use User Content online or offline in any media or format (currently existing or hereafter developed) and may or may not attribute it to you. Others may have access to this User Content and may have the ability to share it. Please think cautiously prior to posting any Personal Information in a public forum. Our Privacy Policy does not apply to any information that you disclose publicly through our Service. We are not responsible for the accuracy, use or misuse of any User Content that you disclose or receive from third parties through the Service.
                  <br/>
                  <br/>
                  <h4>User Information and Communications</h4>
                  <br/>
                  The user is responsible for maintaining the truthfulness and accuracy of the information you submit to us, such as the user's contact information and doctor recommendation information provided as part of registration. The Service will disable a user's account if the information provided is determined to be false or no longer current.
                  <br/>
                  <br/>
                  <h4>Changes to the Privacy Policy</h4>
                  <br/>
                  The Service has the authority to alter the Privacy Policy at any time without notice to you. However, the Service will not change this Privacy Policy in a manner that materially alters the use of the user's Personal Information as promised at the time it was collected unless required to do so by law.
                                          
            </Col>
      </Row>
      </Container> 
    ); 
  }
};
 
export default withRouter(PrivacyPolicy);