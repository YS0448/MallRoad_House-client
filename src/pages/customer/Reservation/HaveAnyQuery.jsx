import React from "react";
import mobile from "../../../assets/media/image/mobile.jpeg";
import "../../../assets/styles/customer/Reservation/HaveAnyQuery.css";

const HaveAnyQuery = () => {
  const faqs = [
    {
      id: "One",
      question: "How can I make a reservation?",
      answer:
        "You can reserve a table online through our website or call us directly. We recommend booking in advance for a seamless dining experience.",
    },
    {
      id: "Two",
      question: "What are your restaurant’s opening hours?",
      answer:
        "We are open from 11:00 AM to 10:00 PM for lunch and dinner. Buffet hours may vary, so please check our schedule for details.",
    },
    {
      id: "Three",
      question: "Do you offer home delivery or takeaway?",
      answer:
        "Yes! We offer both home delivery and takeaway services. You can place your order online or call us for quick service.",
    },
    {
      id: "Four",
      question: "Can I modify or cancel my reservation?",
      answer:
        "Yes, you can modify or cancel your reservation by contacting us at least 24 hours in advance. For last-minute changes, please call us directly.",
    },
    {
      id: "Five",
      question: "Is parking available at the restaurant?",
      answer:
        "Yes, we provide dedicated parking for our guests. Valet service may also be available during peak hours.",
    },
  ];

  return (
    <>
      <div className="container">
        <div className="row p-4 my-5">
          <h2 className="mt-5 mb-5 haveAnyQueryTitle">Have Any Questions?</h2>
          <div className="col-6">
            <img
              src={mobile}
              alt="Mobile"
              className="reservation-mobile-img w-100"
            />
          </div>
          <div className="col-6">
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              {faqs.map((faq) => (
                <div className="accordion-item" key={faq.id}>
                  <h2
                    className="accordion-header"
                    id={`flush-heading${faq.id}`}
                  >
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#flush-collapse${faq.id}`}
                      aria-expanded="false"
                      aria-controls={`flush-collapse${faq.id}`}
                    >
                      {faq.question}
                    </button>
                  </h2>
                  <div
                    id={`flush-collapse${faq.id}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`flush-heading${faq.id}`}
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div className="accordion-body">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HaveAnyQuery;
