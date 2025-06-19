"use client";
// pages/index.tsx
import { Marquee } from "@/components/magicui/marquee";
import {
  Terminal,
  TypingAnimation,
  AnimatedSpan,
} from "@/components/magicui/terminal";
import { HeroVideoDialog } from "@/components/magicui/hero-video-dialog";
import { Ripple } from "@/components/magicui/ripple";
import { Confetti } from "@/components/magicui/confetti";
import { Particles } from "@/components/magicui/particles";
import { Safari } from "@/components/magicui/safari";
import Hero from "./Hero";
import AboutUs from "./Aboutus";
import ContactUs from "./ContactUs";
import DevelopmentTeam from "./DevelopmentTeam";
import Navbar from "./Navbar";
import MarqueeSection from "./MarqueeSection";
import FeaturesInfo from "./FeaturesInfo";
import StatsSection from "./StatsSection";
import {FollowerPointerCard} from "@/components/ui/following-pointer";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
// import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
export default function MotoEMIPage() {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gray-100">
      <ScrollProgress />
      <SmoothCursor />
      <Navbar />
      

      <Hero />

      {/* Background particles */}

      <div id="about">
        <AboutUs id="about" />
      </div>

      <FeaturesInfo />
      
        <MarqueeSection />
      <StatsSection />
      <div id="team">
        <DevelopmentTeam />
      </div>
      <div id="contact">
        <ContactUs />
      </div>
    </div>
  );
}
