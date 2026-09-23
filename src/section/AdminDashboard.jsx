import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  // =====================================================
  // GET ALL BOOKINGS
  // =====================================================

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://easytravel-hgi8.vercel.app/api/bookings"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();

      setBookings(data);
    } catch (err) {
      console.error("Error:", err);
      setError("Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // UPDATE BOOKING STATUS
  // =====================================================

  const updateStatus = async (bookingId, newStatus) => {
    try {
      setUpdatingId(bookingId);

      const response = await fetch(
        `https://easytravel-hgi8.vercel.app/api/bookings/${bookingId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update booking"
        );
      }

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === bookingId
            ? {
                ...booking,
                status: newStatus,
              }
            : booking
        )
      );
    } catch (err) {
      console.error("Status update error:", err);

      alert(
        err.message ||
          "Failed to update booking status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // =====================================================
  // LOAD BOOKINGS
  // =====================================================

  useEffect(() => {
    fetchBookings();
  }, []);

  // =====================================================
  // STATUS BADGE
  // =====================================================

  const getStatusStyle = (status) => {
    if (status === "confirmed") {
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    }

    if (status === "cancelled") {
      return "bg-red-50 text-red-700 border border-red-200";
    }

    return "bg-amber-50 text-amber-700 border border-amber-200";
  };

  return (
    <div className="min-h-screen bg-[#F4F7FA]">

      {/* =================================================
          TOP NAVIGATION
      ================================================= */}

      <header className="bg-[#2F4156] text-white shadow-lg">

        <div className="max-w-[1500px] mx-auto px-6 lg:px-10 py-5">

          <div className="flex items-center justify-between">

            {/* LOGO */}
            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-2xl bg-[#F1A501] flex items-center justify-center shadow-lg">
                <span className="text-xl">
                  ✈
                </span>
              </div>

              <div>
                <h1 className="text-xl font-bold tracking-wide">
                  EasyTravel
                </h1>

                <p className="text-xs text-gray-300">
                  Admin Dashboard
                </p>
              </div>

            </div>

            {/* ADMIN */}
            <div className="hidden sm:flex items-center gap-3">

              <div className="text-right">
                <p className="text-sm font-semibold">
                  Administrator
                </p>

                <p className="text-xs text-gray-400">
                  Manage bookings
                </p>
              </div>

              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                👤
              </div>

            </div>

          </div>

        </div>

      </header>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="max-w-[1500px] mx-auto px-6 lg:px-10 py-10">

        {/* PAGE TITLE */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">

          <div>

            <p className="text-[#F1A501] text-sm font-bold uppercase tracking-[0.2em] mb-2">
              Overview
            </p>

            <h2 className="text-3xl md:text-4xl font-bold text-[#2F4156]">
              Booking Dashboard
            </h2>

            <p className="text-gray-500 mt-2">
              Monitor and manage customer travel inquiries.
            </p>

          </div>

          {/* REFRESH BUTTON */}

          <button
            onClick={fetchBookings}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-[#2F4156] px-5 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md hover:border-[#F1A501] transition-all disabled:opacity-50"
          >
            <span
              className={
                loading ? "animate-spin" : ""
              }
            >
              ↻
            </span>

            {loading ? "Refreshing..." : "Refresh"}
          </button>

        </div>


        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">

          {/* TOTAL */}

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-gray-400">
                  Total Bookings
                </p>

                <h3 className="text-3xl font-bold text-[#2F4156] mt-3">
                  {bookings.length}
                </h3>

                <p className="text-xs text-gray-400 mt-2">
                  All inquiries
                </p>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-xl">
                📋
              </div>

            </div>

          </div>


          {/* PENDING */}

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-gray-400">
                  Pending
                </p>

                <h3 className="text-3xl font-bold text-amber-500 mt-3">
                  {
                    bookings.filter(
                      (booking) =>
                        booking.status === "pending"
                    ).length
                  }
                </h3>

                <p className="text-xs text-gray-400 mt-2">
                  Awaiting response
                </p>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-xl">
                ⏳
              </div>

            </div>

          </div>


          {/* CONFIRMED */}

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-gray-400">
                  Confirmed
                </p>

                <h3 className="text-3xl font-bold text-emerald-500 mt-3">
                  {
                    bookings.filter(
                      (booking) =>
                        booking.status === "confirmed"
                    ).length
                  }
                </h3>

                <p className="text-xs text-gray-400 mt-2">
                  Approved bookings
                </p>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-xl">
                ✓
              </div>

            </div>

          </div>


          {/* CANCELLED */}

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">

            <div className="flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-gray-400">
                  Cancelled
                </p>

                <h3 className="text-3xl font-bold text-red-500 mt-3">
                  {
                    bookings.filter(
                      (booking) =>
                        booking.status === "cancelled"
                    ).length
                  }
                </h3>

                <p className="text-xs text-gray-400 mt-2">
                  Cancelled inquiries
                </p>

              </div>

              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-xl">
                ×
              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            BOOKINGS SECTION
        ================================================= */}

        <section className="bg-white rounded-[28px] shadow-sm border border-gray-100 overflow-hidden">

          {/* SECTION HEADER */}

          <div className="px-6 md:px-8 py-6 border-b border-gray-100">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>

                <h3 className="text-xl font-bold text-[#2F4156]">
                  Customer Bookings
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  View and manage all travel inquiries.
                </p>

              </div>

              <div className="text-sm text-gray-400">
                {bookings.length}{" "}
                {bookings.length === 1
                  ? "booking"
                  : "bookings"}
              </div>

            </div>

          </div>


          {/* LOADING */}

          {loading && (
            <div className="py-20 text-center">

              <div className="inline-block w-10 h-10 border-4 border-gray-200 border-t-[#F1A501] rounded-full animate-spin mb-4"></div>

              <p className="text-gray-500">
                Loading bookings...
              </p>

            </div>
          )}


          {/* ERROR */}

          {error && !loading && (
            <div className="py-20 text-center px-6">

              <div className="text-4xl mb-4">
                ⚠️
              </div>

              <p className="text-red-500 font-semibold">
                {error}
              </p>

              <button
                onClick={fetchBookings}
                className="mt-5 bg-[#2F4156] text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#243447] transition"
              >
                Try Again
              </button>

            </div>
          )}


          {/* EMPTY */}

          {!loading &&
            !error &&
            bookings.length === 0 && (
              <div className="py-20 text-center">

                <div className="text-5xl mb-4">
                  🧳
                </div>

                <h4 className="text-lg font-bold text-[#2F4156]">
                  No bookings yet
                </h4>

                <p className="text-gray-400 mt-2">
                  Customer inquiries will appear here.
                </p>

              </div>
            )}


          {/* TABLE */}

          {!loading &&
            !error &&
            bookings.length > 0 && (

              <div className="overflow-x-auto">

                <table className="w-full text-left">

                  {/* HEAD */}

                  <thead>

                    <tr className="bg-[#F8FAFC] border-b border-gray-100">

                      <th className="px-6 md:px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                        Customer
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                        Contact
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                        Destination
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                        Travel Date
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                        Travelers
                      </th>

                      <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                        Status
                      </th>

                      <th className="px-6 md:px-8 py-4 text-xs font-bold uppercase tracking-wider text-gray-400">
                        Actions
                      </th>

                    </tr>

                  </thead>


                  {/* BODY */}

                  <tbody>

                    {bookings.map((booking) => (

                      <tr
                        key={booking._id}
                        className="border-b border-gray-100 last:border-b-0 hover:bg-[#FAFBFC] transition-colors"
                      >

                        {/* CUSTOMER */}

                        <td className="px-6 md:px-8 py-5">

                          <div className="flex items-center gap-3">

                            <div className="w-10 h-10 rounded-full bg-[#EAF0F5] text-[#2F4156] flex items-center justify-center font-bold text-sm">
                              {booking.fullName
                                ?.charAt(0)
                                ?.toUpperCase()}
                            </div>

                            <div>

                              <p className="font-semibold text-gray-700 whitespace-nowrap">
                                {booking.fullName}
                              </p>

                              <p className="text-xs text-gray-400 mt-0.5">
                                Customer
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* CONTACT */}

                        <td className="px-6 py-5">

                          <p className="text-sm text-gray-600 whitespace-nowrap">
                            {booking.email}
                          </p>

                          <p className="text-xs text-gray-400 mt-1">
                            {booking.phone}
                          </p>

                        </td>


                        {/* DESTINATION */}

                        <td className="px-6 py-5">

                          <div className="flex items-center gap-2">

                            <span className="text-[#F1A501]">
                              📍
                            </span>

                            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">
                              {booking.destination}
                            </span>

                          </div>

                        </td>


                        {/* DATE */}

                        <td className="px-6 py-5">

                          <span className="text-sm text-gray-600 whitespace-nowrap">
                            {new Date(
                              booking.travelDate
                            ).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </span>

                        </td>


                        {/* TRAVELERS */}

                        <td className="px-6 py-5">

                          <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                            👥 {booking.travelers}
                          </span>

                        </td>


                        {/* STATUS */}

                        <td className="px-6 py-5">

                          <span
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold capitalize ${getStatusStyle(
                              booking.status
                            )}`}
                          >

                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>

                            {booking.status}

                          </span>

                        </td>


                        {/* ACTIONS */}

                        <td className="px-6 md:px-8 py-5">

                          <div className="flex items-center gap-2">

                            {/* CONFIRM */}

                            <button
                              onClick={() =>
                                updateStatus(
                                  booking._id,
                                  "confirmed"
                                )
                              }
                              disabled={
                                updatingId ===
                                  booking._id ||
                                booking.status ===
                                  "confirmed"
                              }
                              title="Confirm booking"
                              className="px-3 py-2 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 shadow-sm hover:shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              ✓ Confirm
                            </button>


                            {/* CANCEL */}

                            <button
                              onClick={() =>
                                updateStatus(
                                  booking._id,
                                  "cancelled"
                                )
                              }
                              disabled={
                                updatingId ===
                                  booking._id ||
                                booking.status ===
                                  "cancelled"
                              }
                              title="Cancel booking"
                              className="px-3 py-2 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600 shadow-sm hover:shadow-md transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              × Cancel
                            </button>

                          </div>

                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>
            )}

        </section>


        {/* FOOTER */}

        <div className="text-center mt-8">

          <p className="text-xs text-gray-400">
            EasyTravel • Nepal Tourism Booking System
          </p>

        </div>

      </main>

    </div>
  );
}

export default AdminDashboard;

