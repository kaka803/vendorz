"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Price from "../components/Price";
import CurrencySidebar from "../components/CurrencySidebar";

const OrdersPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const getOrders = async () => {
    try {
      const response = await fetch("/api/getorder");
      const data = await response.json();
      console.log(data);
      
      const userOrders = data.orders.filter((o) => o.UserEmail === user.email);
      setOrders(userOrders);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    console.log(user);
    
    if (user) {
      getOrders();
    }
  }, [user]);

  if (!user) {
    return (
      <>
      <CurrencySidebar />
        <Navbar />
        <div className="max-w-2xl mt-55 mx-auto p-6 text-center bg-white shadow font-sans rounded-lg mb-30">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Order History</h2>
          <p className="text-gray-600 mb-6">
            If you want to save your order history, please{" "}
            <span className="font-semibold">login first</span>, then place your
            order. After that, your order history will be saved here.
          </p>
          <Link href="/auth">
            <button className="max-lg:hidden bg-gradient-to-r from-[#365a41] to-[#2d4a35] text-white px-6 py-2.5 rounded-xl font-sans font-medium shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
  Login
</button>
          </Link>
        </div>
        <Footer/>
      </>
    );
  }

  return (
    <>
    <CurrencySidebar />
      <Navbar />
      <div className="max-w-5xl mx-auto mt-35 p-6 bg-white shadow rounded-lg font-sans mb-20">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          Your Orders, {user.name}
        </h2>

        {orders.length === 0 ? (
          <p className="text-gray-600 ">You do not have any orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="p-3 border">Order ID</th>
                  <th className="p-3 border">Date</th>
                  <th className="p-3 border">Total</th>
                  <th className="p-3 border">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <React.Fragment key={order._id}>
                    <tr
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() =>
                        setExpandedOrder(
                          expandedOrder === order._id ? null : order._id
                        )
                      }
                    >
                      <td className="p-3 border">{order.referenceId}</td>
                      <td className="p-3 border">
                        {new Date(order.createdAt).toLocaleDateString("en-US")}
                      </td>
                      <td className="p-3 border font-semibold">
                        
<p className="mt-3 font-sans text-xl font-bold text-[#365a41]">
  <Price basePrice={order.total} />
</p>
                      </td>
                      <td className="p-3 border">
                        {order.paymentStatus}
                      </td>
                    </tr>

                    {expandedOrder === order._id && (
                      <tr>
                        <td colSpan="4" className="p-4 bg-gray-50 border-t">
                          {/* Full Order Details */}
                          <div className="space-y-3 text-sm text-gray-700">
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
                            <p>
                              
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default OrdersPage;
