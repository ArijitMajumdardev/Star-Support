import { getServerSession } from "next-auth";
import { authoption } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import GetStartedButton from "@/components/GetStartedButton";
import Image from "next/image";
import FAQ from "@/components/FAQ";

export default async function Home() {
  const session = await getServerSession(authoption);

  return (
    <main className="w-full min-h-screen bg-white ">
      {/* Hero Section */}
      <div className="w-full h-[90vh] flex justify-center items-center">
        <div className="w-4/6 mx-auto text-center flex flex-col items-center">
          <div className="w-52 bg-red-300/40 border-red-700/50 border h-9 rounded-full flex items-center justify-center">
            #1 platform for support
          </div>

          <h1 className="text-7xl font-bold pt-10 text-gray-800 leading-tight">
            Support Your<br />
            <span className="text-yellow-500">Creative Journey</span>
          </h1>
          <h2 className="text-xl mb-8 text-gray-600">
            Welcome support for your work with ease.<br />
            Making it simple to fund your passion!
          </h2>
          {session ? (
            <div className="w-60 mx-auto">
              <Link
                href="/profile"
                className="flex justify-around items-center gap-2"
              >
                <button className="bg-[#FF8383] w-52 px-8 py-5 font-bold rounded-full text-xl text-white shadow-md hover:shadow-lg transition-all">
                  Go to profile
                </button>
                <MdOutlineKeyboardArrowRight className="w-6 h-6 text-gray-800" />
              </Link>
            </div>
          ) : (
            <GetStartedButton />
          )}
        </div>
      </div>

      {/* Features Section */}
      {/* <hr /> */}
      {/* bg-gradient-to-r from-white  to-blue-100 */}
      <section className="w-full py-20 bg-gray-100 " id="about">
        <div className="w-4/6 mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 shadow-md rounded-lg">
              {/* <Image
                src=""
                alt="Support"
                width={64}
                height={64}
                className="mx-auto"
              /> */}
              <h3 className="text-xl font-bold mt-4">Easy to Use</h3>
              <p className="text-gray-600 mt-2">
                Create your profile and start receiving support in minutes.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              {/* <Image
                src=""
                alt="Secure"
                width={64}
                height={64}
                className="mx-auto"
              /> */}
              <h3 className="text-xl font-bold mt-4">Secure Payments</h3>
              <p className="text-gray-600 mt-2">
                We use industry-leading security to ensure your payments are safe.
              </p>
            </div>
            <div className="bg-white p-6 shadow-md rounded-lg">
              {/* <Image
                src=""
                alt="Community"
                width={64}
                height={64}
                className="mx-auto"
              /> */}
              <h3 className="text-xl font-bold mt-4">Build a Community</h3>
              <p className="text-gray-600 mt-2">
                Connect with your supporters and grow your network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-16 bg-white">
        <div className="w-4/6 mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            What Creators Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 shadow-md rounded-lg bg-white">
              <p className="text-gray-600 italic">
                "This platform has helped me turn my hobby into a profession. I
                couldn't be happier!"
              </p>
              <h4 className="text-lg font-bold mt-4">- Jane Doe</h4>
            </div>
            <div className="p-6 shadow-md rounded-lg bg-white">
              <p className="text-gray-600 italic">
                "The simplicity of this platform is unmatched. Highly
                recommend!"
              </p>
              <h4 className="text-lg font-bold mt-4">- John Smith</h4>
            </div>
            <div className="p-6 shadow-md rounded-lg bg-white">
              <p className="text-gray-600 italic">
                "A game-changer for creators everywhere. Support made easy!"
              </p>
              <h4 className="text-lg font-bold mt-4">- Emily Brown</h4>
            </div>
          </div>
        </div>
      </section>

      <FAQ/>
    </main>
  );
}
