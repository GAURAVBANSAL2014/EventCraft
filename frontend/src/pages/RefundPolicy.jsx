import React, {useEffect} from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RefundPolicy = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
      
    return (
        <div className="bg-gray-100 min-h-screen text-white">
            <Navbar />
            <div className="p-6 max-w-4xl mx-auto text-gray-800">
                <h1 className="text-3xl font-bold mb-4">Refund & Cancellation Policy</h1>

                <p className="mb-4">
                    At EventCraft, we are committed to delivering a seamless and trustworthy event booking experience for both organizers and participants. This Refund and Cancellation Policy outlines the terms under which users may cancel bookings and receive refunds.
                </p>

                <h2 className="text-xl font-bold mt-4 mb-4">Cancellation by User</h2>
                <p className="mb-4">
                    Users may cancel event bookings from their dashboard if the organizer has allowed cancellations for that event. The eligibility and amount of refund will depend on the refund terms set by the event organizer and the timing of the cancellation.
                </p>
                <ul className="list-disc pl-6 mb-4">
                    <li>If an event allows full refunds, cancellations made more than 48 hours before the event start time will be refunded in full.</li>
                    <li>Cancellations made within 48 hours of the event may be partially refunded or non-refundable, depending on the event's specific policy.</li>
                    <li>Tickets marked as “non-refundable” during booking will not be eligible for any refund.</li>
                </ul>

                <h2 className="text-xl font-bold mt-4 mb-4">Cancellation by Organizer</h2>
                <p className="mb-4">
                    In the rare event that an organizer cancels an event, all participants will be notified via email or SMS. A full refund will be automatically processed to the original payment method used during booking.
                </p>
                <p className="mb-4">
                    If an event is postponed, ticket holders will be given the option to retain their booking for the new date or request a full refund.
                </p>

                <h2 className="text-xl font-bold mt-4 mb-4">No-Show Policy</h2>
                <p className="mb-4">
                    If a user fails to attend the event without prior cancellation, no refund will be issued. It is the user's responsibility to be present at the event venue or online platform on the scheduled date and time.
                </p>

                <h2 className="text-xl font-bold mt-4 mb-4">Refund Process</h2>
                <p className="mb-4">
                    Approved refunds will be processed within 7–10 business days. The amount will be credited back to the original source of payment (e.g., credit/debit card, UPI, wallet, etc.). In case of delays beyond this period, users can contact our support team for assistance.
                </p>
                <p className="mb-4">
                    Please note that service charges, convenience fees, or platform fees may be non-refundable unless the event itself was canceled by the organizer.
                </p>
                <p className="mb-4">
                    For assistance, email us at <a href="mailto:gbgauravbansal007@gmail.com" className="text-blue-600">gbgauravbansal007@gmail.com</a>.
                </p>
            </div>
            <Footer />
        </div>
    );
};

export default RefundPolicy;