import React from "react";
import { Search, Users, Zap, Sparkles } from "lucide-react";
import { Auth } from "./Auth";

export function Landing() {
  return (
    <div className="min-h-screen text-theme-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">

          <h1 className="text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 max-w-4xl mx-auto">
            Niche-focused leads,{" "}
            <span className="text-theme-accent">delivered in seconds.</span>
          </h1>

          <p className="text-xl text-theme-text-secondary leading-relaxed max-w-2xl mx-auto">
            Generate high-quality business leads in seconds using our advanced
            AI-powered platform. Connect with decision-makers and grow your
            business faster than ever.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-6">
            <div className="p-6 glass-card rounded-2xl transition-all hover:border-theme-accent/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-theme-accent/10 text-theme-accent">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Qualified Contacts</h3>
              </div>
              <p className="text-theme-text-secondary">
                Get direct access to verified decision-makers and potential
                clients, eliminating the need for cold outreach and improving
                conversion rates.
              </p>
            </div>

            <div className="p-6 glass-card rounded-2xl transition-all hover:border-theme-accent/30">
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-theme-accent/10 text-theme-accent">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">Instant Results</h3>
              </div>
              <p className="text-theme-text-secondary">
                No more waiting for days or weeks. Our platform delivers
                qualified leads instantly, helping you accelerate your business
                growth.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-theme-accent/20 to-theme-accent/10 transform rotate-3 rounded-3xl"></div>
            <div className="relative glass-card rounded-2xl shadow-xl overflow-hidden">
              <div className="px-8 py-10">
                <Auth />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
