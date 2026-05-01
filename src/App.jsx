import React, { useState } from 'react';

function App() {
  // --- REACT STATE ---
  const [cart, setCart] = useState([]);
  const[isCartOpen, setIsCartOpen] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);

  // --- DATA ---
  const menuItems =[
    { name: "Delicious Pizza", price: 14.99, desc: "New York's best pizza, just the way you like.", img: "images/pizza.jpg" },
    { name: "Tasty Burger", price: 13.99, desc: "100% beef patty, with house made sauce.", img: "images/hero-burger.png" },
    { name: "Crispy Fries", price: 4.99, desc: "Golden brown, perfectly salted.", img: "images/frenchFries.jpg" },
    { name: "Caesar Salad", price: 13.99, desc: "Caesar Salad served with house made dressing.", img: "images/salad.jpg" }
  ];

  const galleryImages =["images/frenchFries.jpg", "images/hero-burger.jpg", "images/pizza.jpg", "images/salad.jpg"];

  // --- CART FUNCTIONS ---
  const addToCart = (item, e) => {
    e.preventDefault();
    setCart((prev) => {
      const existing = prev.find((i) => i.name === item.name);
      if (existing) {
        return prev.map((i) => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (name, amount) => {
    setCart((prev) => prev.map(item => {
      if (item.name === name) {
        const newQuantity = item.quantity + amount;
        return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return item;
    }));
  };

  const removeFromCart = (name) => setCart(cart.filter((item) => item.name !== name));
  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark sticky-top shadow-sm" style={{ backgroundColor: "#1a1e24" }}>
        <div className="container">
          <a className="navbar-brand text-warning fs-2" href="#" style={{ fontFamily: "'Dancing Script', cursive" }}>BFC</a>
          <div className="d-flex align-items-center gap-3 ms-auto">
            <a href="#menu" className="nav-link text-light d-none d-md-block">Menu</a>
            <a href="#about" className="nav-link text-light d-none d-md-block">About</a>
            <a href="#contact" className="nav-link text-light d-none d-md-block">Contact</a>
            
            <button onClick={() => setIsCartOpen(true)} className="btn btn-outline-warning position-relative d-flex align-items-center">
              <i className="bi bi-cart3 fs-5"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="d-flex align-items-center text-center text-md-start" style={{ 
          minHeight: "80vh", 
          backgroundImage: "linear-gradient(rgba(34, 40, 49, 0.9), rgba(34, 40, 49, 0.6)), url('images/hero-burger.jpg')", 
          backgroundSize: "cover", backgroundPosition: "center" 
      }}>
        <div className="container">
          <h1 className="display-2 text-warning mb-3" style={{ fontFamily: "'Dancing Script', cursive" }}>Fast Food Restaurant</h1>
          <p className="lead text-light mb-4 w-75 mx-auto mx-md-0">
            Delicious burgers, crispy fries, and cold drinks. Experience the best flavors in town, prepared fresh every single day!
          </p>
          <a href="#menu" className="btn btn-warning btn-lg rounded-pill px-4 fw-bold">Order Now</a>
        </div>
      </header>

      {/* MENU SECTION */}
      <section id="menu" className="py-5" style={{ backgroundColor: "#ffffff", color: "#222831" }}>
        <div className="container py-4">
          <h2 className="text-center display-5 mb-5 fw-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>Our Menu</h2>
          <div className="row g-4">
            {menuItems.map((item, index) => (
              <div className="col-md-6 col-lg-3" key={index}>
                <div className="card h-100 shadow border-0 bg-dark text-light" style={{border:"4px solid #ffbe33"}}>
                  <img src={item.img} className="card-img-top p-3" alt={item.name} style={{ height: "200px", objectFit: "contain" }} />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-warning">{item.name}</h5>
                    <p className="card-text small flex-grow-1">{item.desc}</p>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <span className="fs-5 fw-bold">${item.price}</span>
                      <button onClick={(e) => addToCart(item, e)} className="btn btn-warning btn-sm fw-bold">🛒 Add</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-5 container text-center text-md-start">
        <div className="row align-items-center py-5">
          <div className="col-md-6 mb-4 mb-md-0">
            <img src="images/restaurant.jpg" alt="About Us" className="img-fluid rounded" style={{ border: "8px solid #ffbe33" }} />
          </div>
          <div className="col-md-6">
            <h2 className="display-4 text-warning mb-3" style={{ fontFamily: "'Dancing Script', cursive" }}>We Are BFC</h2>
            <p className="lead">
              Founded in 2026, we started as a small family kitchen with a big dream: to serve the most authentic, mouth-watering comfort food in the city. 
            </p>
            <button className="btn btn-outline-warning rounded-pill px-4 mt-3">Read More</button>
          </div>
        </div>
      </section>

      {/* GALLERY SECTION */}
      <section className="py-5 text-center text-dark" style={{ backgroundColor: "#f8f9fa" }}>
        <div className="container">
          <h2 className="display-5 mb-4 fw-bold" style={{ fontFamily: "'Dancing Script', cursive" }}>Gallery</h2>
          
          <div className="position-relative mx-auto overflow-hidden rounded shadow bg-dark d-flex align-items-center justify-content-center" style={{ maxWidth: "800px", height: "450px" }}>
            {/*cover to objectFit: contain so the image isn't cropped! */}
            <img src={galleryImages[galleryIndex]} alt="Gallery" className="img-fluid" style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }} />
            
            <div className="position-absolute top-50 start-0 translate-middle-y w-100 d-flex justify-content-between px-3">
              <button className="btn btn-dark rounded-circle fs-5" onClick={() => setGalleryIndex(galleryIndex > 0 ? galleryIndex - 1 : galleryImages.length - 1)}>❮</button>
              <button className="btn btn-dark rounded-circle fs-5" onClick={() => setGalleryIndex(galleryIndex < galleryImages.length - 1 ? galleryIndex + 1 : 0)}>❯</button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-5 bg-light text-dark">
        <div className="container py-4">
          <h2 className="display-5 mb-5 fw-bold text-md-start text-center" style={{ fontFamily: "'Dancing Script', cursive" }}>Contact Us</h2>
          <div className="row g-5">
            
            {/* Form Column */}
            <div className="col-lg-6">
              <form className="d-flex flex-column gap-3">
                <input type="text" className="form-control form-control-lg" placeholder="Your Name" required />
                <input type="email" className="form-control form-control-lg" placeholder="Your Email" required />
                <textarea className="form-control form-control-lg" placeholder="Your Message" rows="5" required></textarea>
                <button type="submit" className="btn btn-warning btn-lg rounded-pill fw-bold mt-2">Send Message</button>
              </form>
            </div>

            {/* Map Column */}
            <div className="col-lg-6">
              <div className="rounded shadow overflow-hidden h-100" style={{ minHeight: "350px" }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.735594838559!2d-73.9645291!3d40.7678398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258eb899f0889%3A0xb5e90aa7d877ee1f!2sHunter%20College!5e0!3m2!1sen!2sus!4v1773353791312!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: "350px" }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade">
                </iframe>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-5 text-center text-md-start shadow-lg" style={{ backgroundColor: "#1a1e24", color: "white" }}>
        <div className="container row mx-auto">
          <div className="col-md-4 mb-4">
            <h4 className="text-warning mb-3">Contact Us</h4>
            <p className="mb-1">📍 123 Burger St, NYC</p>
            <p>📞 +1 563 254 5678 </p>
          </div>
          <div className="col-md-4 mb-4 text-center">
            <h3 className="text-warning display-4 mb-2" style={{ fontFamily: "'Dancing Script', cursive" }}>BFC</h3>
            <p>Follow us for daily deals!</p>
          </div>
          <div className="col-md-4 mb-4 text-md-end">
            <h4 className="text-warning mb-3">Hours</h4>
            <p className="mb-1">Mon - Sun</p>
            <p>10:00 AM - 11:00 PM</p>
          </div>
        </div>
      </footer>

      {/* SLIDE-OUT CART PANEL */}
      <div 
        className="bg-dark text-light shadow-lg d-flex flex-column"
        style={{
          position: "fixed", top: 0, right: isCartOpen ? "0px" : "-400px",
          width: "350px", height: "100vh", transition: "right 0.3s ease-in-out", zIndex: 1050, borderLeft: "2px solid #ffbe33"
        }}
      >
        <div className="p-3 border-bottom border-secondary d-flex justify-content-between align-items-center">
          <h4 className="mb-0 text-warning">Your Cart</h4>
          <button onClick={() => setIsCartOpen(false)} className="btn btn-outline-light btn-sm fw-bold">✖</button>
        </div>

        <div className="flex-grow-1 overflow-auto p-3">
          {cart.length === 0 ? (
            <p className="text-center text-muted mt-5">Your cart is empty!</p>
          ) : (
            cart.map((item, index) => (
              <div key={index} className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom border-secondary">
                <div>
                  <h6 className="mb-1">{item.name}</h6>
                  <small className="text-warning">${item.price}</small>
                </div>
                
                <div className="d-flex align-items-center gap-2">
                  <button onClick={() => updateQuantity(item.name, -1)} className="btn btn-sm btn-secondary px-2">-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.name, 1)} className="btn btn-sm btn-secondary px-2">+</button>
                  <button onClick={() => removeFromCart(item.name)} className="btn btn-sm text-danger ms-2">🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-3 border-top border-secondary">
          <div className="d-flex justify-content-between fs-5 fw-bold mb-3">
            <span>Total:</span>
            <span className="text-warning">${cartTotal.toFixed(2)}</span>
          </div>
          <button onClick={clearCart} className="btn btn-outline-danger w-100 mb-2">Clear Cart</button>
          <button className="btn btn-warning w-100 fw-bold">Checkout</button>
        </div>
      </div>

    </div>
  );
}

export default App;