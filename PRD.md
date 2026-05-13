# PRD: Solar Pro Lead Generation Ecosystem

## 1. Project Vision
Create a premium, high-converting solar energy landing page that uses a sophisticated calculator widget to capture high-quality leads. The ecosystem must feel modern, trustworthy, and technologically advanced.

## 2. Target Audience
- Residential homeowners looking to reduce electricity bills.
- Commercial business owners seeking energy independence and ROI.
- High-ticket clients who value professional and transparent simulations.

## 3. Product Components

### 3.1. Landing Page (Next.js)
- **Hero Section**: High-impact value proposition.
- **Pain/Benefits**: Educational content focusing on savings and sustainability.
- **Projects/Social Proof**: Showcase of past installations.
- **Lead Capture Form**: A streamlined form for users who want a direct consultation.

### 3.2. Solar Pro Calculator (Widget)
- **Interactive Simulation**: Real-time calculations based on bill value and regional rates.
- **Visual Feedback**: Animated results (BRL, kWp, Payback) with Glassmorphism styling.
- **Standalone Portability**: Capable of being embedded in external sites (WordPress, Static HTML).

## 4. Key Features & Requirements

### 4.1. Technical Requirements
- **Next.js 15 App Router**: Modern performance and SEO standards.
- **Hydration Resilience**: The widget must load asynchronously without causing React hydration errors.
- **CLS Optimization**: Min-height placeholders for external scripts.
- **Responsive Design**: Mobile-first approach for all UI components.

### 4.2. Business Logic
- **Regional Rates**: Configurable energy rates and production factors via `window.spc_config`.
- **ROI Formula**: Payback calculation considering investment vs. yearly savings.
- **Limit Handling**: Simulation capped for very high bill values (manual consultation redirect).

### 4.3. Data & Integrations
- **Lead Redundancy**: Leads must be sent to Make.com and the internal Vercel API simultaneously.
- **Tracking**: GTM/DataLayer events for every step of the funnel.
- **WhatsApp Integration**: Dynamic pre-filled messages based on simulation results.

## 5. Success Metrics
- **Conversion Rate**: Percentage of visitors who complete a simulation.
- **Lead Quality**: Accuracy of the data captured (WhatsApp verification).
- **Page Performance**: Lighthouse scores > 90 for Performance and SEO.

## 6. Future Roadmap
- Integration with Google Maps API for rooftop area estimation.
- Multi-region rate database (auto-lookup by CEP).
- Client portal for tracking simulation history.
