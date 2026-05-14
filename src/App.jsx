import React, { useState, useEffect, useRef } from 'react';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const menuItems = [
  { id: 1, name: "Delicious Pizza", price: 14.99, desc: "New York's finest — hand-tossed dough, house tomato sauce, fresh mozzarella.", img: "images/pizza.jpg", tag: "Fan Favorite" },
  { id: 2, name: "Tasty Burger", price: 13.99, desc: "100% beef patty, smash-style, with our legendary house sauce.", img: "images/hero-burger.png", tag: "Bestseller" },
  { id: 3, name: "Crispy Fries", price: 4.99, desc: "Double-fried, golden brown, perfectly seasoned sea salt finish.", img: "images/frenchFries.jpg", tag: "" },
  { id: 4, name: "Caesar Salad", price: 13.99, desc: "Romaine hearts, house-made dressing, shaved parmesan, garlic croutons.", img: "images/salad.jpg", tag: "Chef's Pick" },
];

const galleryImages = [
  { src: "images/frenchFries.jpg", label: "Golden Fries" },
  { src: "images/hero-burger.jpg", label: "Signature Burger" },
  { src: "images/pizza.jpg", label: "NY-Style Pizza" },
  { src: "images/salad.jpg", label: "Fresh Caesar" },
];

// ─── TOAST ────────────────────────────────────────────────────────────────────
function Toast({ message, visible }) {
  return (
    <div style={{
      position: 'fixed', bottom: '2rem', left: '50%', transform: `translateX(-50%) translateY(${visible ? 0 : '20px'})`,
      opacity: visible ? 1 : 0, transition: 'all 0.35s cubic-bezier(.4,0,.2,1)',
      background: '#ffbe33', color: '#1a1409', padding: '0.75rem 1.5rem',
      borderRadius: '999px', fontWeight: 700, fontSize: '0.9rem',
      boxShadow: '0 8px 30px rgba(255,190,51,0.4)', zIndex: 9999,
      pointerEvents: 'none', whiteSpace: 'nowrap',
    }}>
      {message}
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ cartCount, onCartOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 900,
      background: scrolled ? 'rgba(14,11,8,0.96)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,190,51,0.15)' : '1px solid transparent',
      transition: 'all 0.4s ease',
      padding: '0 2rem',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '72px',
    }}>
      {/* Logo */}
      <a href="#" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 900, color: '#ffbe33', textDecoration: 'none', letterSpacing: '-1px' }}>
        BFC
      </a>

      {/* Desktop Nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
        {['Menu', 'About', 'Gallery', 'Contact'].map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} style={{
            color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '0.9rem',
            letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500,
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#ffbe33'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.8)'}
          >{link}</a>
        ))}

        {/* Cart Button */}
        <button onClick={onCartOpen} style={{
          background: 'rgba(255,190,51,0.12)', border: '1.5px solid rgba(255,190,51,0.4)',
          borderRadius: '999px', padding: '0.5rem 1.25rem', color: '#ffbe33',
          fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
          transition: 'all 0.2s', fontWeight: 600,
        }}
          onMouseEnter={e => { e.currentTarget.style.background = '#ffbe33'; e.currentTarget.style.color = '#1a1409'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,190,51,0.12)'; e.currentTarget.style.color = '#ffbe33'; }}
        >
          🛒 <span>Cart</span>
          {cartCount > 0 && (
            <span style={{
              background: '#ff4444', color: 'white', borderRadius: '999px',
              padding: '0 0.45rem', fontSize: '0.75rem', fontWeight: 800, lineHeight: '1.6',
            }}>{cartCount}</span>
          )}
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ffbe33', fontSize: '1.5rem' }}
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '72px', left: 0, right: 0,
          background: 'rgba(14,11,8,0.98)', borderBottom: '1px solid rgba(255,190,51,0.2)',
          display: 'flex', flexDirection: 'column', padding: '1rem 2rem 1.5rem',
          gap: '1rem',
        }}>
          {['Menu', 'About', 'Gallery', 'Contact'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
              color: 'rgba(255,255,255,0.8)', textDecoration: 'none', fontSize: '1rem',
              letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 500,
            }}>{link}</a>
          ))}
          <button onClick={() => { onCartOpen(); setMenuOpen(false); }} style={{
            background: '#ffbe33', border: 'none', borderRadius: '999px',
            padding: '0.75rem 1.5rem', color: '#1a1409', fontWeight: 700,
            fontSize: '1rem', cursor: 'pointer', marginTop: '0.5rem',
          }}>🛒 View Cart {cartCount > 0 && `(${cartCount})`}</button>
        </div>
      )}
    </nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <header id="hero" style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center',
      background: 'linear-gradient(135deg, rgba(14,11,8,0.95) 0%, rgba(26,20,9,0.85) 50%, rgba(14,11,8,0.95) 100%), url("images/hero-burger.jpg") center/cover no-repeat',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Decorative grain */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.04,
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
        pointerEvents: 'none',
      }} />

      {/* Decorative circle */}
      <div style={{
        position: 'absolute', right: '-10vw', top: '50%', transform: 'translateY(-50%)',
        width: '55vw', height: '55vw', maxWidth: '700px', maxHeight: '700px',
        borderRadius: '50%', border: '1px solid rgba(255,190,51,0.08)',
        boxShadow: 'inset 0 0 80px rgba(255,190,51,0.04)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', right: '-5vw', top: '50%', transform: 'translateY(-50%)',
        width: '40vw', height: '40vw', maxWidth: '500px', maxHeight: '500px',
        borderRadius: '50%', border: '1px solid rgba(255,190,51,0.05)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem 4rem', width: '100%' }}>
        <p style={{
          color: '#ffbe33', textTransform: 'uppercase', letterSpacing: '0.3em',
          fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem',
        }}>EST. 2026 · NEW YORK CITY</p>

        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 900, color: '#fff', lineHeight: 1.0,
          margin: '0 0 2rem', letterSpacing: '-2px',
        }}>
          Bold Flavors.<br />
          <span style={{ color: '#ffbe33' }}>No Compromises.</span>
        </h1>

        <p style={{
          color: 'rgba(255,255,255,0.65)', fontSize: 'clamp(1rem, 2vw, 1.2rem)',
          maxWidth: '500px', lineHeight: 1.7, marginBottom: '3rem',
        }}>
          Handcrafted burgers, NY-style pizza, and everything in between — made fresh, served hot, every single day.
        </p>

        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#menu" style={{
            background: '#ffbe33', color: '#1a1409', padding: '1rem 2.5rem',
            borderRadius: '999px', fontWeight: 800, fontSize: '1rem', textDecoration: 'none',
            letterSpacing: '0.05em', transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 8px 30px rgba(255,190,51,0.35)',
            display: 'inline-block',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(255,190,51,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,190,51,0.35)'; }}
          >Order Now</a>
          <a href="#about" style={{
            background: 'transparent', color: '#fff', padding: '1rem 2.5rem',
            borderRadius: '999px', fontWeight: 600, fontSize: '1rem', textDecoration: 'none',
            border: '1.5px solid rgba(255,255,255,0.25)', transition: 'border-color 0.2s, color 0.2s',
            display: 'inline-block',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#ffbe33'; e.currentTarget.style.color = '#ffbe33'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = '#fff'; }}
          >Our Story</a>
        </div>
      </div>
    </header>
  );
}

// ─── MENU SECTION ─────────────────────────────────────────────────────────────
function MenuSection({ onAddToCart }) {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section id="menu" style={{ background: '#0e0b08', padding: '6rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
          <p style={{ color: '#ffbe33', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>WHAT WE SERVE</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', fontWeight: 900, margin: 0, letterSpacing: '-1px' }}>Our Menu</h2>
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
          {menuItems.map(item => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                background: hoveredId === item.id ? '#1a1409' : '#13100c',
                border: hoveredId === item.id ? '1.5px solid rgba(255,190,51,0.5)' : '1.5px solid rgba(255,255,255,0.06)',
                borderRadius: '16px', overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(.4,0,.2,1)',
                transform: hoveredId === item.id ? 'translateY(-6px)' : 'translateY(0)',
                boxShadow: hoveredId === item.id ? '0 20px 50px rgba(0,0,0,0.4)' : '0 2px 12px rgba(0,0,0,0.2)',
                display: 'flex', flexDirection: 'column',
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                <img src={item.img} alt={item.name} style={{
                  width: '100%', height: '100%', objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                  transform: hoveredId === item.id ? 'scale(1.07)' : 'scale(1)',
                }} />
                {item.tag && (
                  <span style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: '#ffbe33', color: '#1a1409',
                    fontSize: '0.7rem', fontWeight: 800,
                    padding: '0.25rem 0.75rem', borderRadius: '999px',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                  }}>{item.tag}</span>
                )}
              </div>

              {/* Body */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 style={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', fontWeight: 700, margin: '0 0 0.5rem' }}>{item.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.6, flex: 1, margin: '0 0 1.25rem' }}>{item.desc}</p>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 900, color: '#ffbe33' }}>${item.price}</span>
                  <button
                    onClick={(e) => onAddToCart(item, e)}
                    style={{
                      background: hoveredId === item.id ? '#ffbe33' : 'rgba(255,190,51,0.1)',
                      border: '1.5px solid rgba(255,190,51,0.5)',
                      color: hoveredId === item.id ? '#1a1409' : '#ffbe33',
                      padding: '0.5rem 1.25rem', borderRadius: '999px',
                      fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" style={{ background: '#0a0806', padding: '6rem 2rem', borderTop: '1px solid rgba(255,190,51,0.08)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
        {/* Image */}
        <div style={{ position: 'relative' }}>
          <img src="images/restaurant.jpg" alt="BFC Restaurant" style={{
            width: '100%', borderRadius: '12px', display: 'block',
            border: '1.5px solid rgba(255,190,51,0.2)',
          }} />
          {/* Gold accent frame */}
          <div style={{
            position: 'absolute', top: '-12px', left: '-12px', right: '12px', bottom: '12px',
            borderRadius: '12px', border: '1.5px solid rgba(255,190,51,0.15)', zIndex: -1,
          }} />
        </div>

        {/* Text */}
        <div>
          <p style={{ color: '#ffbe33', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1.5rem' }}>OUR STORY</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', fontWeight: 900, margin: '0 0 1.5rem', lineHeight: 1.1 }}>
            We Are <span style={{ color: '#ffbe33' }}>BFC</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '1rem' }}>
            Founded in 2026, we started as a small family kitchen with a big dream: to serve the most authentic, mouth-watering comfort food in the city.
          </p>
          <p style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2.5rem' }}>
            Every recipe has been passed down and perfected over generations. We believe great food is about honesty — real ingredients, real technique, real love.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── GALLERY SECTION ──────────────────────────────────────────────────────────
function GallerySection() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (dir) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(prev => (prev + dir + galleryImages.length) % galleryImages.length);
      setAnimating(false);
    }, 200);
  };

  return (
    <section id="gallery" style={{ background: '#0e0b08', padding: '6rem 2rem', borderTop: '1px solid rgba(255,190,51,0.08)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <p style={{ color: '#ffbe33', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>EAT WITH YOUR EYES</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', fontWeight: 900, margin: 0 }}>Gallery</h2>
        </div>

        <div style={{ position: 'relative' }}>
          {/* Main Image */}
          <div style={{
            borderRadius: '16px', overflow: 'hidden', position: 'relative',
            border: '1.5px solid rgba(255,190,51,0.15)', background: '#13100c',
          }}>
            <img src={galleryImages[current].src} alt={galleryImages[current].label}
              style={{
                width: '100%', height: 'clamp(280px, 50vw, 520px)', objectFit: 'cover', display: 'block',
                opacity: animating ? 0 : 1, transition: 'opacity 0.2s ease',
              }} />
            <div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              background: 'linear-gradient(transparent, rgba(14,11,8,0.9))',
              padding: '3rem 2rem 1.5rem',
            }}>
              <p style={{ color: '#ffbe33', fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>{galleryImages[current].label}</p>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>{current + 1} / {galleryImages.length}</p>
            </div>
          </div>

          {/* Arrows */}
          {[[-1, '❮', '1.5rem 0 0 1.5rem'], [1, '❯', '1.5rem 1.5rem 0 0']].map(([dir, icon, borderRadius]) => (
            <button key={dir} onClick={() => go(dir)} style={{
              position: 'absolute', top: '50%',
              [dir === -1 ? 'left' : 'right']: '1rem',
              transform: 'translateY(-50%)',
              background: 'rgba(14,11,8,0.8)', border: '1.5px solid rgba(255,190,51,0.3)',
              color: '#ffbe33', width: '48px', height: '48px', borderRadius: '50%',
              fontSize: '1.1rem', cursor: 'pointer', transition: 'all 0.2s',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#ffbe33'; e.currentTarget.style.color = '#1a1409'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(14,11,8,0.8)'; e.currentTarget.style.color = '#ffbe33'; }}
            >{icon}</button>
          ))}
        </div>

        {/* Thumbnails */}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          {galleryImages.map((img, i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden',
              border: i === current ? '2px solid #ffbe33' : '2px solid transparent',
              padding: 0, cursor: 'pointer', transition: 'border-color 0.2s',
              opacity: i === current ? 1 : 0.5,
            }}>
              <img src={img.src} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', message: '' });
  };

  const inputStyle = {
    width: '100%', padding: '0.9rem 1.25rem', borderRadius: '10px',
    background: 'rgba(255,255,255,0.04)', border: '1.5px solid rgba(255,255,255,0.1)',
    color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color 0.2s', fontFamily: 'inherit',
  };

  return (
    <section id="contact" style={{ background: '#0a0806', padding: '6rem 2rem', borderTop: '1px solid rgba(255,190,51,0.08)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '3.5rem' }}>
          <p style={{ color: '#ffbe33', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.8rem', fontWeight: 700, marginBottom: '1rem' }}>GET IN TOUCH</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff', fontWeight: 900, margin: 0 }}>Contact Us</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
          {/* Form */}
          <div>
            {submitted ? (
              <div style={{
                background: 'rgba(255,190,51,0.1)', border: '1.5px solid rgba(255,190,51,0.3)',
                borderRadius: '12px', padding: '2rem', textAlign: 'center',
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
                <h3 style={{ color: '#ffbe33', fontFamily: "'Playfair Display', serif", marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: 'rgba(255,255,255,0.5)', margin: 0 }}>We'll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                  type="text" placeholder="Your Name" required value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,190,51,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <input
                  type="email" placeholder="Your Email" required value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,190,51,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <textarea
                  placeholder="Your Message" rows="5" required value={formData.message}
                  onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                  style={{ ...inputStyle, resize: 'vertical', minHeight: '120px' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(255,190,51,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button type="submit" style={{
                  background: '#ffbe33', color: '#1a1409', padding: '1rem',
                  borderRadius: '10px', border: 'none', fontWeight: 800, fontSize: '1rem',
                  cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s',
                  boxShadow: '0 4px 20px rgba(255,190,51,0.3)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(255,190,51,0.5)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,190,51,0.3)'; }}
                >Send Message</button>
              </form>
            )}
          </div>

          {/* Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[['📍', '123 Burger St, NYC'], ['📞', '+1 563 254 5678'], ['🕙', 'Mon – Sun, 10 AM – 11 PM']].map(([icon, text]) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>{text}</span>
                </div>
              ))}
            </div>

            <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1.5px solid rgba(255,190,51,0.15)', flex: 1, minHeight: '250px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.735594838559!2d-73.9645291!3d40.7678398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c258eb899f0889%3A0xb5e90aa7d877ee1f!2sHunter%20College!5e0!3m2!1sen!2sus!4v1773353791312!5m2!1sen!2sus"
                width="100%" height="100%" style={{ border: 0, display: 'block', minHeight: '250px' }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#080604', borderTop: '1px solid rgba(255,190,51,0.12)', padding: '3rem 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', alignItems: 'center' }}>
        <div>
          <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>Find Us</h4>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', margin: '0 0 0.25rem' }}>📍 123 Burger St, NYC</p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', margin: 0 }}>📞 +1 563 254 5678</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', fontWeight: 900, color: '#ffbe33', letterSpacing: '-1px' }}>BFC</div>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', margin: '0.25rem 0 0', letterSpacing: '0.1em' }}>BOLD FLAVOR CO.</p>
        </div>

        <div style={{ textAlign: 'right' }}>
          <h4 style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.75rem' }}>Hours</h4>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', margin: '0 0 0.25rem' }}>Mon – Sun</p>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', margin: 0 }}>10:00 AM – 11:00 PM</p>
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '2rem auto 0', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', textAlign: 'center' }}>
        <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', margin: 0 }}>© 2026 BFC. All rights reserved.</p>
      </div>
    </footer>
  );
}

// ─── CART PANEL ───────────────────────────────────────────────────────────────
function CartPanel({ cart, isOpen, onClose, onUpdateQuantity, onRemove, onClear, cartTotal }) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div onClick={onClose} style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          zIndex: 1000, backdropFilter: 'blur(4px)',
        }} />
      )}

      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, right: isOpen ? 0 : '-420px',
        width: '380px', height: '100vh', zIndex: 1050,
        background: '#0e0b08', borderLeft: '1.5px solid rgba(255,190,51,0.2)',
        display: 'flex', flexDirection: 'column',
        transition: 'right 0.4s cubic-bezier(.4,0,.2,1)',
        boxShadow: isOpen ? '-20px 0 60px rgba(0,0,0,0.5)' : 'none',
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <h3 style={{ color: '#fff', fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', margin: 0 }}>Your Cart</h3>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>
              {cart.length === 0 ? 'Empty' : `${cart.reduce((s, i) => s + i.quantity, 0)} item${cart.reduce((s, i) => s + i.quantity, 0) !== 1 ? 's' : ''}`}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.06)', border: 'none', color: 'rgba(255,255,255,0.6)',
            width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer',
            fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          >✕</button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.4 }}>🛒</div>
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.95rem' }}>Your cart is empty</p>
              <p style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem', margin: '0.5rem 0 0' }}>Add items from the menu</p>
            </div>
          ) : (
            cart.map((item, i) => (
              <div key={i} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem', margin: '0 0 0.25rem' }}>{item.name}</p>
                  <p style={{ color: '#ffbe33', fontSize: '0.85rem', margin: 0 }}>${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button onClick={() => onUpdateQuantity(item.name, -1)} style={{
                    background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff',
                    width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem',
                  }}>−</button>
                  <span style={{ color: '#fff', minWidth: '20px', textAlign: 'center', fontWeight: 700 }}>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.name, 1)} style={{
                    background: 'rgba(255,255,255,0.06)', border: 'none', color: '#fff',
                    width: '28px', height: '28px', borderRadius: '50%', cursor: 'pointer', fontSize: '1rem',
                  }}>+</button>
                  <button onClick={() => onRemove(item.name)} style={{
                    background: 'none', border: 'none', color: 'rgba(255,100,100,0.6)',
                    cursor: 'pointer', fontSize: '1rem', marginLeft: '0.25rem', padding: '4px',
                    transition: 'color 0.2s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ff4444'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,100,100,0.6)'}
                  >🗑️</button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem', alignItems: 'baseline' }}>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Total</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 900, color: '#ffbe33' }}>${cartTotal.toFixed(2)}</span>
            </div>
            <button style={{
              width: '100%', padding: '1rem', background: '#ffbe33', border: 'none',
              borderRadius: '10px', color: '#1a1409', fontWeight: 800, fontSize: '1rem',
              cursor: 'pointer', marginBottom: '0.75rem',
              boxShadow: '0 4px 20px rgba(255,190,51,0.35)', transition: 'transform 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >Checkout</button>
            <button onClick={onClear} style={{
              width: '100%', padding: '0.75rem', background: 'none',
              border: '1px solid rgba(255,100,100,0.3)', borderRadius: '10px',
              color: 'rgba(255,100,100,0.7)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff4444'; e.currentTarget.style.color = '#ff4444'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,100,100,0.3)'; e.currentTarget.style.color = 'rgba(255,100,100,0.7)'; }}
            >Clear Cart</button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '' });

  const showToast = (msg) => {
    setToast({ visible: true, message: msg });
    setTimeout(() => setToast(p => ({ ...p, visible: false })), 2200);
  };

  const addToCart = (item, e) => {
    e?.preventDefault();
    setCart(prev => {
      const existing = prev.find(i => i.name === item.name);
      if (existing) return prev.map(i => i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
    showToast(`${item.name} added to cart!`);
  };

  const updateQuantity = (name, amount) => {
    setCart(prev => prev.map(item => {
      if (item.name !== name) return item;
      const newQty = item.quantity + amount;
      return newQty < 1 ? null : { ...item, quantity: newQty };
    }).filter(Boolean));
  };

  const removeFromCart = (name) => setCart(prev => prev.filter(i => i.name !== name));
  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #0e0b08; font-family: 'Segoe UI', system-ui, sans-serif; }
        #root { max-width: 100% !important; border: none !important; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0e0b08; }
        ::-webkit-scrollbar-thumb { background: rgba(255,190,51,0.3); border-radius: 3px; }
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          #about > div { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
          #contact > div > div:last-child { grid-template-columns: 1fr !important; gap: 2.5rem !important; }
        }
      `}</style>

      <Navbar cartCount={cartCount} onCartOpen={() => setIsCartOpen(true)} />
      <Hero />
      <MenuSection onAddToCart={addToCart} />
      <AboutSection />
      <GallerySection />
      <ContactSection />
      <Footer />
      <CartPanel
        cart={cart} isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onClear={clearCart}
        cartTotal={cartTotal}
      />
      <Toast message={toast.message} visible={toast.visible} />
    </>
  );
}

export default App;
