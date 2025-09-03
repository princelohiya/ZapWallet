import { Appbar } from "../components/Appbar";
import React from "react";
import { Skeleton } from "../components/Skeleton";
import { useState, useEffect } from "react";

export const Aboutus = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer); // cleanup on unmount
  }, []);

  return (
    <div>
      <Appbar name={props.name} />
      <div className="m-10">
        <div className="text-lg font-semibold font-sans">
          <div className="flex justify-center">
            <h2 className="text-6xl pb-3">About Us</h2>
          </div>

          {loading ? (
            <div>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          ) : (
            <>
              <div className="m-4">
                <div>
                  At ZapWallet, we believe managing your money should be simple,
                  secure, and stress-free. We’ve created a digital wallet
                  solution that helps you stay organized, track your expenses,
                  and take control of your financial life—without the usual
                  complications. Our focus is on clarity, ease of use, and
                  reliability. Whether you're saving for something big or just
                  keeping an eye on daily spending, ZapWallet is designed to
                  make every transaction feel effortless.
                </div>
                <div className="pt-4">
                  ZapWallet is a modern web-based wallet management solution
                  built for users who want speed, simplicity, and control over
                  their transactions. Designed using the powerful MERN stack
                  (MongoDB, Express.js, React, Node.js), ZapWallet offers a
                  seamless experience for tracking, organizing, and managing
                  digital wallet activities. Our goal is to eliminate the
                  clutter of financial tools by providing a clean, intuitive
                  interface and robust features, all backed by secure, scalable
                  technology.
                </div>
              </div>

              <div className="flex justify-evenly pb-40">
                <div className="h-49 w-58">
                  <img
                    className="rounded-2xl"
                    src="/photo1.png"
                    alt="wallet 1"
                  />
                </div>
                <div className="hidden sm:block h-49 w-58">
                  <img
                    className="rounded-2xl"
                    src="/photo4.png"
                    alt="wallet 2"
                  />
                </div>
                <div className="hidden sm:block h-49 w-58">
                  <img
                    className="rounded-2xl"
                    src="/photo3.png"
                    alt="wallet 3"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
