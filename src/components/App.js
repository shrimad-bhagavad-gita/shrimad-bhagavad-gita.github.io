import React, { Component } from 'react';
import { Routes, Route } from "react-router-dom"; // ✅ only Routes/Route
import HomePage from "./home/HomePage";
import AboutPage from "./about/AboutPage";
import Header from "./common/Header";
import Footer from "./common/Footer";
import PageNotFound from "./PageNotFound";
import ManageCardPage from './cards/ManageCardPage';
import CardPage from "./cards/CardPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GroupsPage from "./groups/GroupsPage";
import ManageGroupPage from './groups/ManageGroupPage';
import CardView from "./cardview/cardview";
import Callback from './Callback';

class App extends Component {
  render() {
    return (
      <div className="dashboard-header">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/groups" element={<GroupsPage />} />
          <Route path="/group/:id" element={<ManageGroupPage />} />
          <Route path="/group" element={<ManageGroupPage />} />
          <Route path="/cards" element={<CardPage />} />
          <Route path="/card/:id" element={<ManageCardPage />} />
          <Route path="/card" element={<ManageCardPage />} />
          <Route path="/cardview/:id" element={<CardView />} />
          <Route path="*" element={<PageNotFound />} /> {/* ✅ catch-all */}
        </Routes>
        <Footer />
        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
    );
  }
}

export default App;
