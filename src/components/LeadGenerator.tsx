import React, { useState } from "react";
import {
  Search,
  Loader2,
  ExternalLink,
  Mail,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Lead, LeadGenerationResponse } from "../types";
import { supabase } from "../lib/supabase";
import { getAuthToken } from "./Auth";

export function LeadGenerator() {
  const [niche, setNiche] = useState("");
  const [pages, setPages] = useState(1);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  const refreshSession = async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      console.error("❌ Error refreshing session:", error.message);
    } else {
      console.log("✅ Session refreshed:", data.session);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    refreshSession();
    const token = await getAuthToken(); // Retrieve token before making request

    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://leadgen-backend-kvnq.onrender.com/generate/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            // "Access-Allow-Origin": "*"
          },
          body: JSON.stringify({ niche, pages }),
        }
      );
      console.log(response);
      if (!response.ok) {
        throw new Error("Failed to generate leads");
      }

      const data: LeadGenerationResponse = await response.json();
      setLeads(data.leads);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold">Generate Leads</h1>
          </div>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center px-4 py-2 space-x-2 text-sm font-medium text-theme-text bg-theme-card rounded-xl border border-theme-border hover:border-theme-accent/50 transition-all"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="max-w-xl mx-auto">
          <div className="bg-theme-card rounded-2xl border border-theme-border p-6 space-y-6">
            <div>
              <label
                htmlFor="niche"
                className="block text-sm font-medium text-theme-text mb-2"
              >
                Business Niche
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-theme-text-secondary h-5 w-5" />
                <input
                  id="niche"
                  type="text"
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="pl-10 w-full rounded-xl bg-theme-bg border-theme-border focus:border-theme-accent focus:ring-theme-accent transition-colors"
                  placeholder="e.g., Construction, Real Estate, Marketing"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="pages"
                className="block text-sm font-medium text-theme-text mb-2"
              >
                Number of Pages to Search
              </label>
              <input
                id="pages"
                type="number"
                min="1"
                max="10"
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="w-full rounded-xl bg-theme-bg border-theme-border focus:border-theme-accent focus:ring-theme-accent transition-colors"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              onClick={handleSubmit}
              className="w-full bg-theme-accent text-theme-text py-3 px-4 rounded-xl hover:bg-theme-accent/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-theme-accent disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-5 w-5" />
                  <span>Generating Leads...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  <span>Generate Leads</span>
                </>
              )}
            </button>
          </div>
        </form>

        {error && (
          <div className="max-w-xl mx-auto mt-8">
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-xl">
              {error}
            </div>
          </div>
        )}

        {leads.length > 0 && (
          <div className="max-w-5xl mx-auto mt-12">
            <div className="bg-theme-card rounded-2xl border border-theme-border overflow-hidden">
              <div className="p-6 border-b border-theme-border">
                <h2 className="text-xl font-semibold">Generated Leads</h2>
                <p className="mt-1 text-sm text-theme-text-secondary">
                  Found {leads.length} potential leads for your business
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-theme-border">
                  <thead className="bg-theme-bg">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-theme-text-secondary uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-theme-text-secondary uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-theme-text-secondary uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-theme-border">
                    {leads.map((lead, index) => (
                      <tr
                        key={index}
                        className="hover:bg-theme-accent/5 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium">
                            {lead.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-theme-text-secondary">
                            {lead.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-4">
                            <a
                              href={`mailto:${lead.email}`}
                              className="text-theme-accent hover:text-theme-accent/80 transition-colors"
                              title="Send email"
                            >
                              <Mail className="h-5 w-5" />
                            </a>
                            <a
                              href={lead.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-theme-accent hover:text-theme-accent/80 transition-colors"
                              title="Visit profile"
                            >
                              <ExternalLink className="h-5 w-5" />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
