import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import TravelPage from "./screens/TravelPage";
import TravelPackageDetail from "./screens/TravelPackageDetail";
import BookingScreen from "./screens/BookingScreen";
import RegisterScreen from "./screens/RegisterScreen";
import LoginSceen from "./screens/LoginSceen";
import Layout from "./screens/Layout";
import axios from "axios";
import BookingInfo from "./screens/BookingInfo";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceholderScreen from "./screens/PlaceholderScreen";
import BookingsScreen from "./screens/BookingsScreen";
import ForgetPasswordScreen from "./screens/ForgetPasswordScreen";
import PasswordResetScreen from "./screens/PasswordResetScreen";
import VehiclePage from "./screens/VehiclePage";
import VehicleDetailScreen from "./screens/VehicleDetailScreen";
import VehicleBooking from "./screens/VehicleBooking";
import VehiclePayment from "./screens/VehiclePayment";
import VechileCheckout from "./screens/VechileCheckout";
import VehicleBookingInfo from "./screens/VehicleBookingInfo";
import HotelPage from "./screens/HotelPage";
import HotelDetailScreen from "./screens/HotelDetailScreen";
import HotelBooking from "./screens/HotelBooking";
import HotelBookingInfo from "./screens/HotelBookingInfo";
import HotelPayment from "./screens/HotelPayment";
import HotelCheckout from "./screens/HotelCheckout";
import PaymentSuccess from "./components/PaymentSuccess";
import Feedbacks from "./components/Feedbacks";
import OwnerLayout from "./owner/layout";
import Dashboard from "./owner/pages/dashboard";
import Bookings from "./owner/pages/bookings";
import DetailedHistoryView from "./owner/components/booking/history/DetailHistory";
import ProductPage from "./owner/pages/product";
import { useSelector } from "react-redux";
import { loginSelector } from "./features/auth/loginSlice";
import VehicleDetailPage from "./owner/pages/VehicleDetailPage";
import FeedBackResponse from "./owner/components/FeedBackResponse";
import VehicleEditPage from "./owner/pages/VehicleEditPage";
//============================HOTEL OWNERS =============================
import HotelOwnerLayout from "./owner/hotelOwner/layout";
import HotelDashboard from "./owner/hotelOwner/pages/dashboard";
import HotelBookings from "./owner/hotelOwner/pages/bookings";
import HotelDetailedHistoryView from "./owner/hotelOwner/components/booking/history/DetailHistory";
import HotelDetailPage from "./owner/hotelOwner/pages/HotelDetailPage";
import HotelEditPage from "./owner/hotelOwner/pages/HotelEditPage";
import HotelProductPage from "./owner/hotelOwner/pages/product";
//============================HOTEL OWNERS =============================

//============================HOTEL OWNERS =============================
import TourOwnerLayout from "./owner/clubOwner/layout";
import TourDashboard from "./owner/clubOwner/pages/dashboard";
import TourBookings from "./owner/clubOwner/pages/bookings";
import TourDetailedHistoryView from "./owner/clubOwner/components/booking/history/DetailHistory";
import TourDetailPage from "./owner/clubOwner/pages/TourDetailPage";
import TourEditPage from "./owner/clubOwner/pages/TourEditPage";
import TourProductPage from "./owner/clubOwner/pages/product";
import OwnerRegisterScreen from "./screens/OwnerRegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import MainHomeScreen from "./screens/MainHomeScreen";
import WaitingScreen from "./screens/WaitingScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import SendEmailHotel from "./owner/hotelOwner/pages/SendEmail";
import SendEmailClub from "./owner/clubOwner/pages/SendEmail";
import SendEmailCar from "./owner/pages/SendEmail";
//============================HOTEL OWNERS =============================
function App() {
  const { userInfo } = useSelector(loginSelector);
  const [role, setRole] = useState("");
  const [isOwnerRegister, setIsOwnerRegister] = useState(false);
  useEffect(() => {
    setRole(userInfo?.role || "");
  }, [userInfo]);

  useEffect(() => {
    async function getUpdatedUserInfo() {
      console.log("Getting user's information...");

      const { data } = await axios.get(
        `https://travelix-backend-v2.vercel.app/api/users/${userInfo?._id}`
      );
      if (data) {
        console.log("Fetched user:", data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        console.log(localStorage.getItem("userInfo"));
        console.log("Set User Info");
        console.log(data);
      }
    }

    if (["hotelOwner", "tourOwner", "carOwner"].includes(userInfo?.role)) {
      getUpdatedUserInfo();
      console.log("Admin is registered");
      setIsOwnerRegister(true);
    }
  }, [userInfo]);

  const regularUserRoutes = () => (
    <main className="min-h-[23rem] w-[100%] px-[3%] py-0 mx-auto">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainHomeScreen />} />
          <Route path="/vehicle" element={<VehiclePage />} />
          <Route path="/vehicle/:id" element={<VehicleDetailScreen />} />
          <Route path="/vehicle/booking/:id" element={<VehicleBooking />} />
          <Route path="/vehicle/BookingInfo" element={<VehicleBookingInfo />} />
          <Route path="/vehicle/payment" element={<VehiclePayment />} />
          <Route path="/vehicle/checkout" element={<VechileCheckout />} />
          <Route path="/hotel" element={<HotelPage />} />
          <Route path="/hotel/:id" element={<HotelDetailScreen />} />
          <Route path="/hotel/booking/:id" element={<HotelBooking />} />
          <Route path="/hotel/BookingInfo" element={<HotelBookingInfo />} />
          <Route path="/hotel/payment" element={<HotelPayment />} />
          <Route path="/hotel/checkout" element={<HotelCheckout />} />
          <Route path="/tour/:id" element={<TravelPackageDetail />} />
          <Route path="/tour/booking/:id" element={<BookingScreen />} />
          <Route path="/BookingInfo" element={<BookingInfo />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/checkout" element={<PlaceholderScreen />} />
          <Route path="/bookings" element={<BookingsScreen />} />
          <Route path="/bookings/:id" element={<BookingsScreen />} />
          <Route path="/tour" element={<TravelPage />} />
          <Route path="/register/owner" element={<OwnerRegisterScreen />} />
          <Route path="/login" element={<LoginSceen />} />
        </Route>
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/forget" element={<ForgetPasswordScreen />} />
        <Route path="/reset" element={<PasswordResetScreen />} />
        <Route path="/paymentSuceess" element={<PaymentSuccess />} />
        <Route path="/feedback/:targetId" element={<Feedbacks />} />
      </Routes>
    </main>
  );

  // const ownerRoutes = (
  //   LayoutComponent,
  //   dashboard,
  //   bookings,
  //   detailedBookings,
  //   product,
  //   detailPage,
  //   editPage
  // ) => (
  //   <LayoutComponent>
  //     <Routes>
  //       <Route path="dashboard" element={dashboard} />
  //       <Route path="bookings" element={bookings} />
  //       <Route path="detailedBookings" element={detailedBookings} />
  //       <Route path="/waitingScreen" element={<WaitingScreen />} />
  //       <Route path="product/:subpage?" element={product} />
  //       <Route path="product/:subpage/:action" element={product} />
  //       <Route path="detail/:id" element={detailPage} />
  //       <Route
  //         path="feedback/response/:feedbackId"
  //         element={<FeedBackResponse />}
  //       />
  //       <Route path="edit/:id" element={editPage} />
  //     </Routes>
  //   </LayoutComponent>
  // );

  return (
    <React.Fragment>
      {role === "carOwner" && (
        <div className="App">
          <OwnerLayout>
            <Routes>
              <Route path="dashboard" element={<Dashboard />} />
              <Route
                path="bookings"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <Bookings />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="email"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <SendEmailCar />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="detailedBookings"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <DetailedHistoryView />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="product/:subpage?"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <ProductPage />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="product/:subpage/:action"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <ProductPage />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="vehicleDetail/:id"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <VehicleDetailPage />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="/feedback/response/:feedbackId"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <FeedBackResponse />{" "}
                  </ProtectedRoute>
                }
              />{" "}
              <Route
                path="/vehicle/edit/:id"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <VehicleEditPage />{" "}
                  </ProtectedRoute>
                }
              />
              <Route path="/waitingScreen" element={<WaitingScreen />} />
            </Routes>
          </OwnerLayout>
        </div>
      )}
      {/* {role === "carOwner" &&
        ownerRoutes(
          OwnerLayout,
          <Dashboard />,
          <Bookings />,
          <DetailedHistoryView />,
          <ProductPage />,
          <VehicleDetailPage />,
          <VehicleEditPage />
        )} */}
      {role === "hotelOwner" && (
        <div className="App">
          <HotelOwnerLayout>
            <Routes>
              <Route path="dashboard" element={<HotelDashboard />} />
              <Route
                path="bookings"
                element={
                  <ProtectedRoute isRegister={isOwnerRegister}>
                    <HotelBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="email"
                element={
                  <ProtectedRoute isRegister={isOwnerRegister}>
                    <SendEmailHotel />
                  </ProtectedRoute>
                }
              />
              <Route
                path="detailedBookings"
                element={
                  <ProtectedRoute isRegister={isOwnerRegister}>
                    <HotelDetailedHistoryView />{" "}
                  </ProtectedRoute>
                }
              />
              <Route
                path="product/:subpage?"
                element={
                  <ProtectedRoute isRegister={isOwnerRegister}>
                    <HotelProductPage />{" "}
                  </ProtectedRoute>
                }
              />

              <Route
                path="product/:subpage/:action"
                element={
                  <ProtectedRoute isRegister={isOwnerRegister}>
                    <HotelProductPage />
                  </ProtectedRoute>
                }
              />
              <Route path="hotelDetail/:id" element={<HotelDetailPage />} />
              <Route
                path="/feedback/response/:feedbackId"
                element={
                  <ProtectedRoute isRegister={isOwnerRegister}>
                    <FeedBackResponse />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/hotel/edit/:id"
                element={
                  <ProtectedRoute isRegister={isOwnerRegister}>
                    <HotelEditPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/waitingScreen" element={<WaitingScreen />} />
            </Routes>
          </HotelOwnerLayout>
        </div>
      )}
      {/* {role === "hotelOwner" &&
        ownerRoutes(
          HotelOwnerLayout,
          <HotelDashboard />,
          <ProtectedRoute isRegister={userInfo?.isRegister}>
            <HotelBookings />
          </ProtectedRoute>,
          <ProtectedRoute isRegister={userInfo?.isRegister}>
            <HotelDetailedHistoryView />
          </ProtectedRoute>,
          <ProtectedRoute isRegister={userInfo?.isRegister}>
            <HotelProductPage />
          </ProtectedRoute>,
          <ProtectedRoute isRegister={userInfo?.isRegister}>
            <HotelDetailPage />
          </ProtectedRoute>,
          <ProtectedRoute isRegister={userInfo?.isRegister}>
            <HotelEditPage />
          </ProtectedRoute>
        )} */}
      {role === "tourOwner" && (
        <div className="App">
          <TourOwnerLayout>
            <Routes>
              <Route path="dashboard" element={<TourDashboard />} />
              <Route
                path="bookings"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <TourBookings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="email"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <SendEmailClub />
                  </ProtectedRoute>
                }
              />
              <Route
                path="detailedBookings"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <TourDetailedHistoryView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="product/:subpage?"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <TourProductPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="product/:subpage/:action"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <TourProductPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="tourDetail/:id"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <TourDetailPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/feedback/response/:feedbackId"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <FeedBackResponse />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/tour/edit/:id"
                element={
                  <ProtectedRoute isRegister={userInfo?.isRegister}>
                    <TourEditPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/waitingScreen" element={<WaitingScreen />} />
            </Routes>
          </TourOwnerLayout>
        </div>
      )}
      {/* {role === "clubOwner" &&
        ownerRoutes(
          TourOwnerLayout,
          <TourDashboard />,
          <TourBookings />,
          <TourDetailedHistoryView />,
          <TourProductPage />,
          <TourDetailPage />,
          <TourEditPage />
        )} */}
      {role === "user" && regularUserRoutes()}
      {role === "" && regularUserRoutes()}
    </React.Fragment>
  );
}

export default App;
