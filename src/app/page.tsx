"use client";

import HeroSection from "./components/HeroSection";
import { StickyScroll } from "./components/StickyScroll";
import dynamic from "next/dynamic";

// Import GlobeSection with dynamic loading (no SSR)
const GlobeSection = dynamic(() => import("@/components/GlobeSection"), {
  ssr: false,
});

export default function Home() {
  // Data for the StickyScroll component
  const respiratoryData = [
    {
      title: "Real-Time Monitoring",
      description: "Continuous tracking of respiratory patterns, oxygen levels, and breathing efficiency using advanced IoT sensors. Monitor your lung health 24/7 from the comfort of your home.",
      content: (
        <div className="flex items-center justify-center h-full p-4">
          <div className="text-center text-white">
            <div className="text-6xl mb-6">📊</div>
            <p className="text-xl font-semibold mb-2">Live Data Stream</p>
            <p className="text-sm opacity-80">O2 Levels • Breathing Rate • Lung Capacity</p>
            <div className="mt-6 w-full h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
              <div className="h-full bg-white animate-pulse" style={{width: '75%'}}></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "AI-Powered Insights",
      description: "Our machine learning algorithms analyze patterns to detect early warning signs of respiratory conditions. Get personalized insights and predictive health recommendations.",
      content: (
        <div className="flex items-center justify-center h-full p-4">
          <div className="text-center text-white">
            <div className="text-6xl mb-6">🤖</div>
            <p className="text-xl font-semibold mb-2">Smart Analysis</p>
            <p className="text-sm opacity-80">Pattern Recognition • Predictive Alerts</p>
            <div className="grid grid-cols-3 gap-2 mt-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-8 bg-white bg-opacity-20 rounded-md animate-pulse" 
                     style={{animationDelay: `${i * 0.1}s`}}></div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Early Detection",
      description: "Identify potential respiratory issues before they become severe. Our system can detect subtle changes in breathing patterns that might indicate the onset of COPD, asthma, or other conditions.",
      content: (
        <div className="flex items-center justify-center h-full p-4">
          <div className="text-center text-white">
            <div className="text-6xl mb-6">🔍</div>
            <p className="text-xl font-semibold mb-2">Preventive Care</p>
            <p className="text-sm opacity-80">Early Warning • Risk Assessment</p>
            <div className="mt-6 flex justify-center space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-4 h-4 rounded-full bg-white animate-ping" 
                     style={{animationDelay: `${i * 0.3}s`, animationDuration: '1.5s'}}></div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Personalized Care",
      description: "Receive tailored recommendations based on your unique respiratory profile, lifestyle factors, and environmental conditions. Track progress and adjust treatment plans in real-time.",
      content: (
        <div className="flex items-center justify-center h-full p-4">
          <div className="text-center text-white">
            <div className="text-6xl mb-6">👤</div>
            <p className="text-xl font-semibold mb-2">Customized Solutions</p>
            <p className="text-sm opacity-80">Personal Plans • Progress Tracking</p>
            <div className="mt-6 flex flex-col space-y-2">
              {[80, 65, 90].map((value, i) => (
                <div key={i} className="w-full bg-white bg-opacity-20 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-white" style={{width: `${value}%`, transition: 'width 1s ease-in-out'}}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="w-full">
      {/* Hero Section - More Concise */}
      <HeroSection />

      {/* About Section - Compact */}
      <section id="about" className="w-full bg-[var(--background)] py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[var(--primary)] rounded-xl mb-4 shadow-lg">
              <span className="text-xl">🫁</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3">Why BreatheSense?</h2>
            <p className="text-base text-[var(--foreground)] opacity-80 max-w-2xl mx-auto">
              COPD, Emphysema, and Asthma affect over 300M people worldwide — early detection is life‑saving.
            </p>
          </div>
          
          <div className="bg-[var(--card)] rounded-2xl p-6 shadow-lg border border-[var(--muted)]">
            <p className="text-sm text-[var(--foreground)] opacity-90 text-center">
              BreatheSense combines AI and IoT to continuously monitor respiratory signals and deliver timely, actionable insights.
            </p>
          </div>
        </div>
      </section>

      {/* StickyScroll Section - Enhanced with animations */}
      <StickyScroll content={respiratoryData} />

      {/* Globe Section - Showing global connectivity */}
      <GlobeSection />

      {/* Approach Section - Compact */}
      <section className="w-full bg-[var(--card)] py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3">Our Approach</h2>
            <p className="text-sm text-[var(--foreground)] opacity-80 max-w-2xl mx-auto">
              We combine cutting-edge technology with healthcare expertise
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                icon: "📡",
                title: "Real-time IoT Monitoring",
                description: "Continuous data collection from advanced sensors"
              },
              {
                icon: "🤖",
                title: "AI-Powered Predictive Modeling",
                description: "Machine learning algorithms for early detection"
              },
              {
                icon: "🔗",
                title: "Data Integration",
                description: "Respiratory + Lifestyle + Environmental factors"
              },
              {
                icon: "👤",
                title: "Personalized Care",
                description: "Tailored treatment plans for each individual"
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="bg-[var(--background)] rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--muted)] hover:border-[var(--accent)]">
                  <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--foreground)] mb-2">{item.title}</h3>
                  <p className="text-xs text-[var(--foreground)] opacity-70 leading-relaxed">{item.description}</p>
                  <div className="mt-3 w-0 group-hover:w-full h-0.5 bg-[var(--accent)] transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Section - Compact */}
      <section id="features" className="w-full bg-[var(--background)] py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3">What BreatheSense Offers</h2>
            <p className="text-sm text-[var(--foreground)] opacity-80 max-w-2xl mx-auto">
              Comprehensive solutions for respiratory healthcare monitoring
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              {
                icon: "🧠",
                title: "AI-Powered Respiratory Monitoring"
              },
              {
                icon: "🔔",
                title: "Real-Time Alerts & Notifications"
              },
              {
                icon: "🏠",
                title: "Remote Tracking from Home"
              },
              {
                icon: "📊",
                title: "Data-Driven Insights"
              },
              {
                icon: "📱",
                title: "Scalable & User-Friendly"
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="bg-[var(--primary)] rounded-xl p-4 text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex flex-col justify-center items-center text-center h-24">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-bold text-xs leading-tight px-1">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pros & Cons Section - Compact */}
      <section className="w-full bg-[var(--card)] py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-3">Balanced Perspective</h2>
            <p className="text-sm text-[var(--foreground)] opacity-80 max-w-2xl mx-auto">
              We believe in transparency about both benefits and challenges
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pros */}
            <div className="group">
              <div className="bg-[var(--background)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--muted)] hover:border-[var(--accent)]">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center mr-4 shadow-sm">
                    <span className="text-white text-lg">✅</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)]">Advantages</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { text: "Early Detection", desc: "Identify issues before they become severe" },
                    { text: "Cost-Effective", desc: "Reduce healthcare costs through prevention" },
                    { text: "Remote Monitoring", desc: "Care from anywhere, anytime" },
                    { text: "Personalized Care", desc: "Tailored to individual needs" },
                    { text: "Patient Engagement", desc: "Active participation in health management" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[var(--primary)] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-bold text-sm text-[var(--foreground)] mb-1">{item.text}</p>
                        <p className="text-xs text-[var(--foreground)] opacity-70 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Cons */}
            <div className="group">
              <div className="bg-[var(--background)] rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--muted)] hover:border-[var(--accent)]">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center mr-4 shadow-sm">
                    <span className="text-white text-lg">⚠️</span>
                  </div>
                  <h3 className="text-xl font-bold text-[var(--foreground)]">Challenges</h3>
                </div>
                <div className="space-y-3">
                  {[
                    { text: "Data Privacy", desc: "Ensuring patient data security" },
                    { text: "Sensor Accuracy", desc: "Maintaining precision in measurements" },
                    { text: "Data Overload", desc: "Managing large amounts of information" },
                    { text: "Rural Access", desc: "Reaching underserved communities" },
                    { text: "Device Maintenance", desc: "Ensuring long-term reliability" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[var(--accent)] rounded-full mt-2 flex-shrink-0"></div>
                      <div>
                        <p className="font-bold text-sm text-[var(--foreground)] mb-1">{item.text}</p>
                        <p className="text-xs text-[var(--foreground)] opacity-70 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Benefits Section - Compact */}
      <section className="w-full bg-[var(--foreground)] py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Looking Ahead</h2>
            <p className="text-sm text-white opacity-80 max-w-2xl mx-auto">
              The future of respiratory healthcare with continuous innovation
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                icon: "🎯",
                title: "Improved Accuracy with AI",
                description: "Enhanced machine learning algorithms for better predictions"
              },
              {
                icon: "🌐",
                title: "Wider Adoption with IoT + 5G",
                description: "Faster, more reliable connectivity for real-time monitoring"
              },
              {
                icon: "📋",
                title: "Personalized Treatment Plans",
                description: "AI-generated care strategies tailored to individual needs"
              },
              {
                icon: "📡",
                title: "Expanded Sensors",
                description: "Blood pressure, heart rate, and more vital signs monitoring"
              },
              {
                icon: "🏥",
                title: "Telemedicine Integration",
                description: "Seamless connection with healthcare providers"
              },
              {
                icon: "🔮",
                title: "Predictive Healthcare",
                description: "Anticipate health issues before they occur"
              }
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="bg-[var(--card)] rounded-xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 border border-[var(--muted)]">
                  <div className="w-10 h-10 bg-[var(--primary)] rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <span className="text-lg">{item.icon}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--foreground)] mb-2">{item.title}</h3>
                  <p className="text-xs text-[var(--foreground)] opacity-70 leading-relaxed">{item.description}</p>
                  <div className="mt-3 w-0 group-hover:w-full h-0.5 bg-[var(--accent)] transition-all duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Summary Section - Compact */}
      <section className="w-full bg-[var(--primary)] py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="bg-[var(--card)] rounded-2xl p-8 shadow-xl border border-[var(--muted)]">
            <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <span className="text-xl">💙</span>
            </div>
            <blockquote className="text-base md:text-lg font-medium text-[var(--foreground)] leading-relaxed mb-6 max-w-3xl mx-auto">
              &ldquo;BreatheSense is a cost-effective, scalable, and intelligent solution for early detection of COPD, Emphysema, and Asthma — empowering patients and healthcare providers with real-time insights and better outcomes.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-[var(--foreground)] opacity-70 rounded-full"></div>
              <div className="w-2 h-2 bg-[var(--foreground)] opacity-70 rounded-full"></div>
              <div className="w-2 h-2 bg-[var(--foreground)] opacity-70 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA Section - Compact */}
      <section className="w-full bg-[var(--background)] py-12">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--foreground)] mb-6">Take a Breath Towards Better Health</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a href="#contact" className="px-6 py-3 rounded-full bg-[var(--primary)] text-white text-sm font-semibold shadow-lg hover:bg-[var(--primary-light)] transition-all duration-300 hover:scale-105">
              Contact Us
            </a>
            <a href="/signup" className="px-6 py-3 rounded-full border-2 border-[var(--accent)] text-[var(--accent)] text-sm font-semibold shadow-md hover:bg-[var(--accent)] hover:text-white transition-all duration-300 hover:scale-105">
              Join the Pilot Program
            </a>
          </div>
          <div className="flex items-center justify-center gap-6 text-xs text-[var(--foreground)] opacity-70 mb-6">
            <a href="#" className="hover:text-[var(--primary)] transition-colors font-medium">LinkedIn</a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors font-medium">GitHub</a>
            <a href="#" className="hover:text-[var(--primary)] transition-colors font-medium">Twitter</a>
          </div>
          <p className="text-xs text-[var(--foreground)] opacity-70">© {new Date().getFullYear()} BreatheSense. All rights reserved.</p>
        </div>
      </section>
    </main>
  );
}