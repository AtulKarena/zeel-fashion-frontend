import { Metadata } from "next";
import ContactUs from "./_component/contact-us";
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Contact Us - Zeel Fashion`,
  };
}

const ContactPage = async () => {
  return <ContactUs />;
};

export default ContactPage;
