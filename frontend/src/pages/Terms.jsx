import React, {useEffect} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Terms = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    return (

        <div className="bg-gray-100 min-h-screen text-white">
            <Navbar />
            <div className="p-6 max-w-4xl mx-auto text-gray-800">
                <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>

                <p className="mb-4">Welcome to EventCraft. <br /><br /> By visiting our Platform and/or purchasing something from us, you engage in our Services and agree to be bound by these Terms, including any additional terms and conditions and policies referenced herein and/or available by hyperlink on the Platform. These Terms apply to all users of the Platform, including users who are browsers, vendors, customers, merchants, and/ or contributors of content displayed on the Platform displayed on the Platform.

                    <br /><br /> Your use/ access of the Platform shall be governed by these Terms and the Privacy Policy as available on the Platform.

                    <br /><br /> These Terms may be updated from time to time without notice. It is therefore recommended that you review these Terms, as available on the Platform, each time you access and/or use the Platform. In the event there is any conflict or inconsistency between these Terms and any other terms and conditions that appear on the Platform, these Terms will prevail.</p>

                <h2 className="text-xl font-bold mt-4 mb-4">Eligibility</h2>

                <p className='mb-4'>
                    Persons who are “incompetent to contract” within the meaning of the Indian Contract Act, 1872 are not eligible to use/access the Platform. However, if you are a minor, i.e. under the age of 18 years, you may use/access the Platform under the supervision of an adult parent or legal guardian who is “competent to contract” and agrees to be bound by these Terms. <br /><br />If you are using the Platform on behalf of any person/ entity, you represent and warrant that you are authorized to accept these Terms on behalf of such person/ entity. Further, you and such person/ entity agree to be jointly, severally liable and indemnify us for violations of these Terms.<br /><br />You agree to use the Services only in compliance with these Terms and applicable laws, and in a manner that does not violate our legal rights or those of any third party(ies).
                </p>

                <h2 className="text-xl font-bold mt-4 mb-4">Account Responsibility</h2>
                <p className="mb-4">
                    When you register for an account on EventCraft, you agree to provide accurate, complete, and updated information. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities conducted through your account. <br /><br /> You agree to notify us immediately if you suspect any unauthorized use of your account. EventCraft is not liable for any loss or damage resulting from your failure to protect your login credentials.
                </p>

                <h2 className="text-xl font-bold mt-4 mb-4">Event Bookings</h2>
                <p className="mb-4">
                    EventCraft facilitates the booking of events listed by organizers. When you book an event, you agree to pay all applicable charges as shown at checkout. All prices are inclusive of applicable taxes unless stated otherwise. Once a booking is confirmed and payment is completed, it is considered final unless covered by our cancellation or refund policy.
                </p>
                <p className="mb-4">
                    Payments are processed through secure third-party payment gateways (e.g., Razorpay). We do not store or handle your credit/debit card details. It is your responsibility to ensure payment information is correct and that your method of payment is valid and has sufficient funds.
                </p>

                <h2 className="text-xl font-bold mt-4 mb-4">Prohibited Activities</h2>
                <p className="mb-4">
                    Users must not misuse the platform. Prohibited activities include but are not limited to:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li>Posting false or misleading information about events or services</li>
                    <li>Uploading malicious code, spam, or viruses</li>
                    <li>Attempting to hack, reverse-engineer, or disrupt our servers or services</li>
                    <li>Engaging in fraudulent or illegal transactions</li>
                    <li>Using the platform for purposes not permitted by law or by these Terms</li>
                </ul>
                <p className="mb-4">
                    We reserve the right to suspend or terminate any user account found engaging in such behavior without prior notice, and pursue legal action if necessary.
                </p>

                <h2 className="text-xl font-bold mt-4 mb-4">Event Organizer Responsibilities</h2>
                <p className="mb-4">
                    If you register as an organizer, you are responsible for providing accurate event details including time, date, location (if applicable), and refund eligibility. Organizers must ensure that events take place as scheduled. In the event of cancellations, you must notify participants in a timely manner and process refunds where applicable.
                </p>
                <p className="mb-4">
                    Organizers are expected to maintain the integrity of their events and refrain from misrepresentation. EventCraft is not liable for any issues arising from event content, execution, or disputes between organizers and participants.
                </p>

                <h2 className="text-xl font-bold mt-4 mb-4">Intellectual Property</h2>
                <p className="mb-4">
                    All content on EventCraft, including logos, graphics, icons, text, and software, is the intellectual property of EventCraft or its licensors. You agree not to copy, reproduce, or use any of our content for commercial purposes without express written permission.
                </p>
                <p className="mb-4">
                    You may not modify, distribute, or reverse-engineer any part of the platform. Event organizers retain ownership of content they post (such as event images or descriptions) but grant EventCraft a non-exclusive license to use it for promotional purposes.
                </p>

                <h2 className="text-xl font-bold mt-4 mb-4">Limitation of Liability</h2>
                <p className="mb-4">
                    EventCraft provides its services on an "as-is" and "as-available" basis. We do not guarantee that the platform will be error-free, secure, or uninterrupted. To the maximum extent permitted by law, EventCraft will not be liable for any damages arising from:
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li>Your use or inability to use the platform</li>
                    <li>Any delays, cancellations, or inaccuracies in event details</li>
                    <li>Any data loss, unauthorized access, or user content</li>
                </ul>

                <h2 className="text-xl font-bold mt-4 mb-4">Contact</h2>
                <p>
                    For any legal concerns, email us at <a href="mailto:gbgauravbansal007@gmail.com" className="text-blue-600">gbgauravbansal007@gmail.com</a>.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default Terms;