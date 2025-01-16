'use client'
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create a profile?",
      answer:
        "Click on the 'Get Started' button on the home page. Follow the steps to set up your profile and start receiving support.",
    },
    {
      question: "Are my payments secure?",
      answer:
        "Yes! We use industry-leading security protocols to ensure all transactions are safe and secure.",
    },
    {
      question: "Can I customize my support options?",
      answer:
        "Absolutely! You can set up different tiers of support or allow one-time contributions based on your needs.",
    },
    {
      question: "Is there a fee to use the platform?",
      answer:
        "We charge a minimal fee to cover transaction and operational costs. Details are available in the pricing section.",
    },
  ];

  const toggleFAQ = (index:any) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="w-full py-20 bg-gray-100" id="faq">
      <div className="w-4/6 mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md p-4 transition-all"
            >
              <div
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center cursor-pointer"
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </h3>
                {activeIndex === index ? (
                  <FaChevronUp className="text-gray-600" />
                ) : (
                  <FaChevronDown className="text-gray-600" />
                )}
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
