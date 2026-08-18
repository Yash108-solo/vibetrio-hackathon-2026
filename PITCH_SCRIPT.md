# 🏆 DECIDE — Hackathon Winning Pitch & Judge Demo Guide
**Team**: VibeTrio (#11) • **Hackathon**: VibeCode Hackathon 2.0 (MHSSCE) • **Product**: DECIDE AI

---

## ⏱️ 2-Minute Judge Pitch Script (Exact Word-for-Word Flow)

### [0:00 - 0:25] The Hook & Pain Point
> *"Respected judges, online shoppers today face a massive deception problem.*  
> *When you search for a product on Amazon or Flipkart, the top 5 results are NOT the best products — they are **sponsored advertisements**, manipulative discounts, and fake 5-star reviews. Even worse, platforms artificially inflate prices right before sales, making it impossible for consumers to know if they are actually getting a good deal.*  
> 
> *To solve this, we built **DECIDE** — a real-time, transparent shopping decision intelligence engine powered by Gemini AI and BuyHatke price tracking."*

---

### [0:25 - 1:10] The Live WOW Demo
*(Open [http://localhost:5173](http://localhost:5173) on your laptop)*

> *"Watch this live:*  
> *A user types in natural language: **'I need a Titan watch under ₹4,500 for office wear with water resistance and metal strap.'** [Hit Enter]*  
> 
> *In under 2 seconds, DECIDE does three revolutionary things:*  
> 
> 1. **Intent Extraction**: Gemini extracts the exact product parameters, category constraints, and weighted priorities.  
> 2. **Multi-Store Price Comparison**: It scans live prices across **Amazon India, Flipkart, and Tata CLiQ** with 1-click direct buy links.  
> 3. **BuyHatke 60-Day Price Tracker**: Look at this interactive SVG price curve. It analyzes historical 60-day peaks and drops, giving an unambiguous AI verdict: **'BUY NOW'** because the current price is within 3% of its all-time 60-day low record!"*

---

### [1:10 - 1:35] The Interactive Decision Sliders (The "WOW" Moment)
*(Drag the 'Design & Aesthetics' slider up, watch scores shift instantly)*

> *"Here is our core technical differentiator: **The Interactive Decision Model**.*  
> *Every consumer has unique priorities. If I care more about 'Design' than 'Battery', I simply drag the slider.*  
> 
> *Notice what just happened: **The entire candidate ranking recalculated deterministically in 0.01 milliseconds completely client-side without a single server lag or API cost**.*  
> *It also explicitly highlights the honest trade-off for every product — no hidden catches."*

---

### [1:35 - 2:00] Technical Architecture & Business Viability
> *"Under the hood, DECIDE uses:*  
> - **Google Gemini 1.5 Flash** for intent parsing and transparent purchase verdicts.  
> - **Serper Google Shopping Engine** for live real-time price scraping across Indian marketplaces.  
> - **Deterministic Scoring Engine** for zero-latency, explainable client-side re-ranking.  
> - **Supabase & LocalStorage** for mission persistence and exportable PDF decision reports.  
> 
> *Our business model leverages affiliate commission on every direct store checkout while remaining 100% unbiased for the consumer.  
> With DECIDE, consumers stop guessing and start deciding with data.*  
> *Thank you, and we'd love to answer your questions!"*

---

## 🎯 Anticipated Judge Questions & Bulletproof Answers

### Q1: *"How does this differ from BuyHatke or Google Shopping?"*
- **Answer**: *"Google Shopping shows sponsored ads and doesn't understand conversational user intent or trade-offs. BuyHatke only gives browser extension price graphs after you've already found a product page. DECIDE unites **conversational intent discovery, live multi-store comparison, 60-day price history curves, and explainable decision trade-offs on a single unified canvas** before you make the purchase."*

### Q2: *"How can normal non-technical users use this if they don't have API keys?"*
- **Answer**: *"In a production deployment on Vercel or Supabase, the API keys live securely on the backend server environment (`.env`). Regular consumers simply open the website like Google, type what they want, and get instant results without ever seeing or typing an API key. For testing and offline hackathon demos, we also built an automated deterministic engine with full multi-category coverage."*

### Q3: *"How does your pricing algorithm avoid hallucinations?"*
- **Answer**: *"We strictly ground our product candidates in real Google Shopping API payloads. Furthermore, our scoring engine is **100% deterministic mathematical code**, not LLM guesswork — weights sum to 1.0, attribute multipliers are bounded, and price penalties are strictly enforced."*

### Q4: *"How will you monetize DECIDE?"*
- **Answer**: *"Two clean revenue streams:  
  1. **Affiliate commissions** via Amazon Associates, Flipkart Affiliate, and Croma Partner networks (typically 3–9% per sale).  
  2. **B2B Price Intelligence API** for D2C brands who want competitive pricing alerts."*

---

## 🚀 Live Demo Checklist Before Judges Arrive

- [x] Vite dev server running at `http://localhost:5173/`
- [x] Gemini & Serper API keys active in modal
- [x] `decide-standalone.html` kept open in an adjacent browser tab as instant offline backup
- [x] Test query ready: `"I need a Titan watch under ₹4,500 for office wear with water resistance and metal strap."`
- [x] Practice slider dragging to showcase 0.01ms instant re-ranking
- [x] Test "Compare Side-by-Side" and "Export PDF" buttons
