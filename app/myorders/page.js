"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Price from "../components/Price";
import CurrencySidebar from "../components/CurrencySidebar";
import { motion, AnimatePresence } from "framer-motion";

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const getOrders = async () => {
    try {
      const response = await fetch("/api/getorder");
      const data = await response.json();

      const userOrders = data.orders.filter((o) => o.UserEmail === user.email);
      setOrders(userOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      getOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  // Skeleton Loader (like YouTube shimmer)
  const SkeletonLoader = () => (
    <div className="animate-pulse space-y-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="h-16 bg-gray-800 rounded-lg border border-gray-700"
        ></div>
      ))}
    </div>
  );

  if (!user) {
    return (
      <>
        <CurrencySidebar />
        <Navbar />
        <div className="max-w-2xl max-md:max-w-[90%] mt-55 mx-auto p-6 text-center bg-gray-900 border border-gray-700 shadow font-sans rounded-lg mb-40 text-white">
          <h2 className="text-xl font-bold mb-4">Order History</h2>
          <p className="mb-6 text-gray-300">
            If you want to save your order history, please{" "}
            <span className="font-semibold">login first</span>, then place your
            order. After that, your order history will be saved here.
          </p>
          <Link href="/auth">
            <button className="bg-gradient-to-r from-[#4e47af] to-[#351466] text-white exo px-6 py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
              Login
            </button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <CurrencySidebar />
      <Navbar />
      <div className="max-w-5xl max-md:max-w-[90%] mx-auto mt-35 p-6  white-border text-white shadow rounded-lg font-sans mb-20">
        <h2 className="text-xl font-bold mb-6 text-gray-100">
          Your Orders, {user.name}
        </h2>

        {loading ? (
          <SkeletonLoader />
        ) : orders.length === 0 ? (
          <p className="text-gray-300">You do not have any orders yet.</p>
        ) : (
          <div>
            {/* Desktop Table */}
            <div className="overflow-x-auto hidden md:block">
              <table className="w-full rounded-lg overflow-hidden border ">
                <thead className="white-border text-gray-300">
                  <tr>
                    <th className="p-3  white-border">Order ID</th>
                    <th className="p-3  white-border">Date</th>
                    <th className="p-3  white-border">Total</th>
                    <th className="p-3  white-border">Status</th>
                  </tr>
                </thead>
                <tbody className=" text-gray-200">
                  {orders.map((order) => (
                    <React.Fragment key={order._id}>
                      <tr
                        className="cursor-pointer hover:bg-gray-800 transition"
                        onClick={() =>
                          setExpandedOrder(
                            expandedOrder === order._id ? null : order._id
                          )
                        }
                      >
                        <td className="p-3 border border-gray-700">
                          {order.referenceId}
                        </td>
                        <td className="p-3 border border-gray-700">
                          {new Date(order.createdAt).toLocaleDateString("en-US")}
                        </td>
                        <td className="p-3 border border-gray-700 font-semibold text-green-400">
                          <Price basePrice={order.total} />
                        </td>
                        <td className="p-3 border border-gray-700">
                          {order.paymentStatus}
                        </td>
                      </tr>

                      <AnimatePresence>
                        {expandedOrder === order._id && (
                          <motion.tr
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <td
                              colSpan="4"
                              className="p-4 white-border text-gray-300"
                            >
                              <div className="space-y-3 text-sm">
                                <p>
                                  <span className="font-semibold">Name:</span>{" "}
                                  {order.shippingAddress.name}
                                </p>
                                <p>
                                  <span className="font-semibold">Email:</span>{" "}
                                  {order.shippingAddress.email}
                                </p>
                                <p>
                                  <span className="font-semibold">Phone:</span>{" "}
                                  {order.shippingAddress.phone}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Description:
                                  </span>{" "}
                                  {order.shippingAddress.description}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Subtotal:
                                  </span>{" "}
                                  ${order.subtotal}
                                </p>
                                <p>
                                  <span className="font-semibold">Total:</span>{" "}
                                  ${order.total}
                                </p>
                                <p>
                                  <span className="font-semibold">
                                    Payment Status:
                                  </span>{" "}
                                  {order.paymentStatus}
                                </p>
                              </div>
                            </td>
                          </motion.tr>
                        )}
                      </AnimatePresence>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-4 md:hidden">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-gray-800 rounded-lg shadow p-4 border border-gray-700 cursor-pointer hover:bg-gray-700 transition"
                  onClick={() =>
                    setExpandedOrder(
                      expandedOrder === order._id ? null : order._id
                    )
                  }
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-gray-100">
                      {order.referenceId}
                    </h3>
                    <span className="text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString("en-US")}
                    </span>
                  </div>

                  <p className="mt-2 font-bold text-green-400">
                    <Price basePrice={order.total} />
                  </p>
                  <p className="text-sm text-gray-400">
                    Status: {order.paymentStatus}
                  </p>

                  <AnimatePresence>
                    {expandedOrder === order._id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 border-t border-gray-700 pt-3 text-sm text-gray-300 space-y-2"
                      >
                        <p>
                          <span className="font-semibold">Name:</span>{" "}
                          {order.shippingAddress.name}
                        </p>
                        <p>
                          <span className="font-semibold">Email:</span>{" "}
                          {order.shippingAddress.email}
                        </p>
                        <p>
                          <span className="font-semibold">Phone:</span>{" "}
                          {order.shippingAddress.phone}
                        </p>
                        <p>
                          <span className="font-semibold">Description:</span>{" "}
                          {order.shippingAddress.description}
                        </p>
                        <p>
                          <span className="font-semibold">Subtotal:</span> $
                          {order.subtotal}
                        </p>
                        <p>
                          <span className="font-semibold">Total:</span> $
                          {order.total}
                        </p>
                        <p>
                          <span className="font-semibold">Payment Status:</span>{" "}
                          {order.paymentStatus}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;
