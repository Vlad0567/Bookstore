// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Basket  from './pages/Basket';
import Favorites from './pages/Favorites';
import OrderHistory from './pages/OrderHistory';
import Category from './pages/Category';
import './App.css'


function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/product/:id" element={<Product />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/basket" element={<Basket  />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/orders" element={<OrderHistory />} />
            <Route path="/categories/:genre" element={<Category />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
