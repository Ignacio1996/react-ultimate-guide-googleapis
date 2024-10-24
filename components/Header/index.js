import { Fragment, useEffect, useState } from "react";
import { Popover, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { database, dbInstance } from "../../firebaseConfig";
import { addDoc, getDocs, collection } from "firebase/firestore";

import * as ga from "../../lib/ga";

const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export function SubscribeForm() {
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notified, setNotified] = useState(false);
  const [totalSubscribers, setTotalSubscribers] = useState(0);

  useEffect(() => {
    getTotalNumberOfSubscribers().then((total) => {
      console.log("Header 15 | total", total);
      setTotalSubscribers(total);
    });
  }, []);

  const handleEmail = async () => {
    console.log("Header 19 | submitting email", email);
    setLoading(true);
    if (email !== null) {
      try {
        const querySnapshot = await getDocs(collection(database, "emails"));
        const emailExists = querySnapshot.docs.some(
          (doc) => doc.data().email === email
        );

        if (emailExists) {
          setLoading(false);
          setNotified(false);
          console.log("Header 26 | email already exists!");
          alert("Email already exists!");
        } else {
          await addDoc(dbInstance, { email, date: new Date().toISOString() });
          ga.event({
            action: "subscribed",
            params: {
              email,
            },
          });
          setLoading(false);
          setNotified(true);
          console.log("Header 26 | email submitted!");
        }
      } catch (error) {
        setLoading(false);
        setNotified(false);
        console.log("Header 30 | error", error);
      }

      console.log("Header 18 | added document!");
    }
  };

  const getTotalNumberOfSubscribers = async () => {
    const querySnapshot = await getDocs(collection(database, "emails"));
    return querySnapshot.size;
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div
        className="hidden lg:block lg:absolute lg:inset-0"
        aria-hidden="true"
      >
        <svg
          className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8"
          width={640}
          height={784}
          fill="none"
          viewBox="0 0 640 784"
        >
          <defs>
            <pattern
              id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
              x={118}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            y={72}
            width={640}
            height={640}
            className="text-gray-50"
            fill="currentColor"
          />
          <rect
            x={118}
            width={404}
            height={784}
            fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)"
          />
        </svg>
      </div>

      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-sm font-semibold uppercase tracking-wide text-gray-500 sm:text-base lg:text-sm xl:text-base mb-2">
                  {totalSubscribers} / 500 subscribers for E-book
                </span>
                <div className="h-2 bg-gray-200 rounded-full mb-3 max-w-[700px]">
                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: `${(totalSubscribers / 500) * 100}%` }}
                  ></div>
                </div>
                <span className="font-bold"></span>
                {/* add a progress bar from 0 - 500, saying how many subscribers there are and how many are missing on a progress bar */}

                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-900">
                    Ultimate Guide to Google APIs
                  </span>
                  <span className="block text-indigo-600">
                    with Javascript, React & Node.js
                  </span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Learn to manipulate Google APIs from scratch: Authentication,
                Spreadsheets Management, Google Calendar, token management, and
                more!
              </p>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                It took me 4 months to get my first post request to Google, I
                want to accelerate this process for you in an in-depth guide.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                <p className="text-base font-medium text-gray-900">
                  Sign up if you are interested in the book!
                </p>
                <div action="#" method="POST" className="mt-3 sm:flex">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="block w-full py-3 text-base rounded-md placeholder-gray-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:flex-1 border-gray-300"
                    placeholder="Enter your email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                  <button
                    onClick={handleEmail}
                    className="mt-3 w-full px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gray-800 shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:flex-shrink-0 sm:inline-flex sm:items-center sm:w-auto"
                  >
                    {notified ? "Done!" : loading ? "Loading..." : "Notify me!"}
                  </button>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  I will email you once the book is on the works.
                </p>

                {notified && (
                  <p className="text-base font-medium text-gray-900 pt-3">
                    Thank you for your interest! We will email you as soon as
                    the book is ready
                  </p>
                )}
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <svg
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
                width={640}
                height={784}
                fill="none"
                viewBox="0 0 640 784"
                aria-hidden="true"
              >
                <defs>
                  <pattern
                    id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                    x={118}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse"
                  >
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-gray-200"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  y={72}
                  width={640}
                  height={640}
                  className="text-gray-50"
                  fill="currentColor"
                />
                <rect
                  x={118}
                  width={404}
                  height={784}
                  fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
                />
              </svg>
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <button
                  type="button"
                  className="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Watch our video to learn more</span>
                  {/* <img
                    className="w-full"
                    src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                    alt=""
                  /> */}
                  <span
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <svg
                      className="h-20 w-20 text-indigo-500"
                      fill="currentColor"
                      viewBox="0 0 84 84"
                    >
                      <circle
                        opacity="0.9"
                        cx={42}
                        cy={42}
                        r={42}
                        fill="white"
                      />
                      <path d="M55.5039 40.3359L37.1094 28.0729C35.7803 27.1869 34 28.1396 34 29.737V54.263C34 55.8604 35.7803 56.8131 37.1094 55.9271L55.5038 43.6641C56.6913 42.8725 56.6913 41.1275 55.5039 40.3359Z" />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
