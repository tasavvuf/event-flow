"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import {
  getRequirements,
  getRequirementById,
  deleteRequirement,
  RequirementItem,
} from "@/lib/api";
import {
  Calendar,
  MapPin,
  Tag,
  Trash2,
  Eye,
  Search,
  RefreshCw,
  PlusCircle,
  Users,
  DollarSign,
  Clock,
  HardHat,
  Mic,
  UserCheck,
  Sparkles,
  AlertTriangle,
  X,
} from "lucide-react";

export default function EventsPage() {
  const [requirements, setRequirements] = useState<RequirementItem[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Modals
  const [selectedItem, setSelectedItem] = useState<RequirementItem | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchEvents = async (category = categoryFilter) => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getRequirements(category === "all" ? undefined : category);
      setRequirements(data);
    } catch (err: any) {
      setError(err.message || "Failed to load events from backend database.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(categoryFilter);
  }, [categoryFilter]);

  const handleOpenDetail = async (id: string) => {
    setIsDetailLoading(true);
    try {
      // Calls GET /api/requirements/:id to test endpoint directly
      const item = await getRequirementById(id);
      setSelectedItem(item);
    } catch (err: any) {
      // Fallback to local item if any
      const local = requirements.find((r) => r._id === id) || null;
      setSelectedItem(local);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteRequirement(id);
      setRequirements((prev) => prev.filter((item) => item._id !== id));
      if (selectedItem?._id === id) setSelectedItem(null);
      setConfirmDeleteId(null);
    } catch (err: any) {
      alert(err.message || "Failed to delete requirement.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredRequirements = useMemo(() => {
    return requirements.filter((req) => {
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        req.eventName?.toLowerCase().includes(q) ||
        req.location?.toLowerCase().includes(q) ||
        req.venue?.toLowerCase().includes(q) ||
        req.eventType?.toLowerCase().includes(q)
      );
    });
  }, [requirements, searchQuery]);

  const counts = useMemo(() => {
    const total = requirements.length;
    const planner = requirements.filter((r) => r.category === "planner").length;
    const performer = requirements.filter((r) => r.category === "performer").length;
    const crew = requirements.filter((r) => r.category === "crew").length;
    return { total, planner, performer, crew };
  }, [requirements]);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case "planner":
        return {
          label: "Event Planner",
          icon: <UserCheck className="w-3.5 h-3.5 text-rose-400" />,
          classes: "bg-rose-950/80 border-rose-500/50 text-rose-300",
        };
      case "performer":
        return {
          label: "Performer",
          icon: <Mic className="w-3.5 h-3.5 text-fuchsia-400" />,
          classes: "bg-fuchsia-950/80 border-fuchsia-500/50 text-fuchsia-300",
        };
      case "crew":
        return {
          label: "Crew / Staff",
          icon: <HardHat className="w-3.5 h-3.5 text-amber-400" />,
          classes: "bg-amber-950/80 border-amber-500/50 text-amber-300",
        };
      default:
        return {
          label: category,
          icon: <Tag className="w-3.5 h-3.5 text-white/50" />,
          classes: "bg-white/10 border-white/20 text-white/70",
        };
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch (_) {
      return dateStr;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 pb-20">
      {/* Top Banner / Header */}
      <div className="relative rounded-[32px] p-8 md:p-10 mb-8 overflow-hidden bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] backdrop-blur-2xl border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85),0_0_35px_rgba(225,29,72,0.15)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-bold tracking-widest uppercase text-rose-400">
                Directory & Management
              </span>
              <span className="text-white/30">•</span>
              <span className="text-[11px] font-semibold text-white/50 tracking-wider">
                MongoDB Atlas Synced
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Event Requirements
            </h1>
            <p className="text-sm text-white/60 mt-1 max-w-xl">
              Manage all event requirements, monitor category allocations, and query individual details directly via backend APIs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchEvents()}
              disabled={isLoading}
              className="p-3 rounded-xl bg-white/[0.04] border border-white/15 hover:bg-white/[0.08] hover:border-white/30 text-white transition-all disabled:opacity-50"
              title="Refresh events from backend"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-rose-400" : ""}`} />
            </button>
            <Link
              href="/"
              className="bg-gradient-to-r from-rose-600 via-crimson-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-bold rounded-xl px-5 py-3 shadow-lg shadow-rose-950/60 transition-all flex items-center gap-2 text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post New Event</span>
            </Link>
          </div>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-black/40 border border-white/10 overflow-x-auto">
            {[
              { id: "all", label: "All Events", count: counts.total },
              { id: "planner", label: "Planners", count: counts.planner },
              { id: "performer", label: "Performers", count: counts.performer },
              { id: "crew", label: "Crew & Staff", count: counts.crew },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCategoryFilter(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  categoryFilter === tab.id
                    ? "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-rose-900/40"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    categoryFilter === tab.id
                      ? "bg-black/30 text-white"
                      : "bg-white/10 text-white/50"
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by event, city, type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 rounded-2xl pl-10 pr-4 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-rose-500/70 focus:ring-1 focus:ring-rose-500/30 transition-all"
            />
          </div>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-rose-950/60 border border-rose-500/50 text-rose-200 text-sm flex items-center justify-between">
          <span>{error}</span>
          <button
            onClick={() => fetchEvents()}
            className="text-xs underline font-semibold hover:text-white"
          >
            Retry
          </button>
        </div>
      )}

      {/* LOADING SKELETON */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-56 rounded-[28px] bg-white/[0.02] border border-white/10 animate-pulse"
            />
          ))}
        </div>
      )}

      {/* EMPTY STATE */}
      {!isLoading && filteredRequirements.length === 0 && (
        <div className="text-center py-16 px-4 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-xl">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-rose-950/50 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <Tag className="w-8 h-8 opacity-60" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">No Requirements Found</h2>
          <p className="text-sm text-white/50 max-w-sm mx-auto mb-6">
            {searchQuery
              ? `No requirements match "${searchQuery}". Try clearing search.`
              : `There are currently no requirements posted in this category.`}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-600 to-crimson-600 text-white text-sm font-bold shadow-lg shadow-rose-950/50 hover:from-rose-500 hover:to-crimson-500 transition-all"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create First Requirement</span>
          </Link>
        </div>
      )}

      {/* REQUIREMENTS GRID */}
      {!isLoading && filteredRequirements.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRequirements.map((req) => {
            const badge = getCategoryBadge(req.category);

            return (
              <div
                key={req._id}
                className="group relative rounded-[28px] p-6 bg-gradient-to-b from-white/[0.08] via-white/[0.03] to-white/[0.01] backdrop-blur-2xl border border-white/15 hover:border-rose-500/60 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.7)] flex flex-col justify-between"
              >
                <div>
                  {/* Card Header: Category & Type */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold border ${badge.classes}`}
                    >
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>

                    <span className="text-[11px] font-medium text-white/50 px-2.5 py-0.5 rounded-md bg-white/[0.05] border border-white/5">
                      {req.eventType}
                    </span>
                  </div>

                  {/* Title & Location */}
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-rose-200 transition-colors line-clamp-1">
                    {req.eventName}
                  </h3>

                  <div className="space-y-1.5 mb-5 text-xs text-white/60">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span>
                        {formatDate(req.startDate)}
                        {req.endDate && ` — ${formatDate(req.endDate)}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                      <span className="line-clamp-1">
                        {req.location}
                        {req.venue ? ` • ${req.venue}` : ""}
                      </span>
                    </div>
                  </div>

                  {/* Category Highlights */}
                  <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 mb-5">
                    {req.category === "planner" && (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase">Budget</span>
                          <span className="font-semibold text-white">
                            ${Number(req.details?.budgetMin || 0).toLocaleString()} - $
                            {Number(req.details?.budgetMax || 0).toLocaleString()}
                          </span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase">Attendees</span>
                          <span className="font-semibold text-white">
                            {Number(req.details?.attendeeCount || 0).toLocaleString()} guests
                          </span>
                        </div>
                      </div>
                    )}

                    {req.category === "performer" && (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase">Act Type</span>
                          <span className="font-semibold text-white">
                            {req.details?.performanceType || "Performance"}
                          </span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase">Duration</span>
                          <span className="font-semibold text-white">
                            {req.details?.durationMinutes} minutes
                          </span>
                        </div>
                      </div>
                    )}

                    {req.category === "crew" && (
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase">Role</span>
                          <span className="font-semibold text-white">
                            {req.details?.crewType || "Crew"}
                          </span>
                        </div>
                        <div>
                          <span className="text-white/40 block text-[10px] uppercase">Headcount</span>
                          <span className="font-semibold text-white">
                            {req.details?.numberOfCrew} personnel
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-[10px] text-white/40">
                    Posted {formatDate(req.createdAt)}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenDetail(req._id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-semibold text-white/80 hover:text-white transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>

                    <button
                      onClick={() => setConfirmDeleteId(req._id)}
                      disabled={deletingId === req._id}
                      className="p-1.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/60 border border-rose-500/20 text-rose-400 hover:text-rose-200 transition-all disabled:opacity-40"
                      title="Delete requirement"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DETAIL MODAL (UTILIZES GET /api/requirements/:id) */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-[32px] p-6 md:p-8 bg-gradient-to-b from-[#1c080f] to-[#100307] border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(225,29,72,0.2)] max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/15 text-white/70 hover:text-white transition-all"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="mb-6">
              <span className="text-[11px] font-bold tracking-widest uppercase text-rose-400">
                Requirement Detail View
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">{selectedItem.eventName}</h2>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-950/80 border border-rose-500/40 text-rose-300">
                  {selectedItem.category.toUpperCase()}
                </span>
                <span className="text-xs text-white/40">ID: {selectedItem._id}</span>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                <h4 className="font-bold text-rose-300 uppercase tracking-wider text-[11px]">
                  Basic Information
                </h4>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <span className="text-white/40 block">Event Type</span>
                    <span className="font-semibold text-white">{selectedItem.eventType}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Location</span>
                    <span className="font-semibold text-white">{selectedItem.location}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block">Start Date</span>
                    <span className="font-semibold text-white">{formatDate(selectedItem.startDate)}</span>
                  </div>
                  {selectedItem.endDate && (
                    <div>
                      <span className="text-white/40 block">End Date</span>
                      <span className="font-semibold text-white">{formatDate(selectedItem.endDate)}</span>
                    </div>
                  )}
                  {selectedItem.venue && (
                    <div>
                      <span className="text-white/40 block">Venue</span>
                      <span className="font-semibold text-white">{selectedItem.venue}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                  <h4 className="font-bold text-rose-300 uppercase tracking-wider text-[11px]">
                    Category Specifications ({selectedItem.category.toUpperCase()})
                  </h4>
                  <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
                    Live Parameters
                  </span>
                </div>

                {/* PLANNER DETAILS UI */}
                {selectedItem.category === "planner" && (
                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-white/40 block text-[10px] uppercase font-medium">Budget Range</span>
                        <span className="text-sm font-bold text-white mt-0.5 block">
                          ${Number(selectedItem.details?.budgetMin || 0).toLocaleString()} — ${Number(selectedItem.details?.budgetMax || 0).toLocaleString()}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-white/40 block text-[10px] uppercase font-medium">Expected Guests</span>
                        <span className="text-sm font-bold text-white mt-0.5 block">
                          {Number(selectedItem.details?.attendeeCount || 0).toLocaleString()} attendees
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-white/40 block text-[10px] uppercase font-medium">Timeline Flexibility</span>
                        <span className="text-sm font-bold text-rose-300 mt-0.5 block capitalize">
                          {selectedItem.details?.timelineFlexibility === "fixed" ? "Fixed / Strict Dates" : "Flexible Window"}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-white/40 block text-[10px] uppercase font-medium mb-2">
                        Required Coordination Services
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {Array.isArray(selectedItem.details?.servicesNeeded) && selectedItem.details.servicesNeeded.length > 0 ? (
                          selectedItem.details.servicesNeeded.map((service: string) => (
                            <span
                              key={service}
                              className="px-2.5 py-1 rounded-lg bg-rose-950/70 border border-rose-500/30 text-rose-200 text-xs font-medium"
                            >
                              ✓ {service}
                            </span>
                          ))
                        ) : (
                          <span className="text-white/40 text-xs">No specific services listed</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* PERFORMER DETAILS UI */}
                {selectedItem.category === "performer" && (
                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-white/40 block text-[10px] uppercase font-medium">Act / Performance Type</span>
                        <span className="text-sm font-bold text-white mt-0.5 block">
                          {selectedItem.details?.performanceType || "Not specified"}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-white/40 block text-[10px] uppercase font-medium">Set Duration</span>
                        <span className="text-sm font-bold text-white mt-0.5 block">
                          {selectedItem.details?.durationMinutes} minutes
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-white/40 block text-[10px] uppercase font-medium">Expected Crowd Size</span>
                        <span className="text-sm font-bold text-white mt-0.5 block">
                          {Number(selectedItem.details?.audienceSize || 0).toLocaleString()} audience
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-white/40 block text-[10px] uppercase font-medium">Sound Equipment</span>
                        <div className="flex items-center gap-2 mt-1">
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                              selectedItem.details?.equipmentProvided
                                ? "bg-rose-950 border border-rose-500/40 text-rose-300"
                                : "bg-white/10 text-white/70"
                            }`}
                          >
                            {selectedItem.details?.equipmentProvided ? "✓ Provided by Venue" : "Performer Brings Gear"}
                          </span>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-white/40 block text-[10px] uppercase font-medium">Genre / Musical Style</span>
                        <span className="text-xs font-semibold text-rose-200 mt-1 block">
                          {selectedItem.details?.genrePreference || "Open to suggestions / Flexible"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* CREW DETAILS UI */}
                {selectedItem.category === "crew" && (
                  <div className="space-y-3 pt-1">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-white/40 block text-[10px] uppercase font-medium">Crew Specialization</span>
                        <span className="text-sm font-bold text-white mt-0.5 block">
                          {selectedItem.details?.crewType || "Crew Operations"}
                        </span>
                      </div>
                      <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                        <span className="text-white/40 block text-[10px] uppercase font-medium">Headcount Needed</span>
                        <span className="text-sm font-bold text-white mt-0.5 block">
                          {selectedItem.details?.numberOfCrew} personnel
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-white/40 block text-[10px] uppercase font-medium mb-1.5">Shift Window Schedule</span>
                      <div className="text-xs text-white/90 flex flex-col sm:flex-row sm:items-center gap-2">
                        <span className="font-semibold text-rose-300">
                          Start: {selectedItem.details?.shiftStart ? new Date(selectedItem.details.shiftStart).toLocaleString() : "TBD"}
                        </span>
                        <span className="text-white/30 hidden sm:inline">→</span>
                        <span className="font-semibold text-rose-300">
                          End: {selectedItem.details?.shiftEnd ? new Date(selectedItem.details.shiftEnd).toLocaleString() : "TBD"}
                        </span>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-white/40 block text-[10px] uppercase font-medium">Special Safety Gear & PPE</span>
                      <span
                        className={`inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          selectedItem.details?.equipmentRequired
                            ? "bg-rose-950 border border-rose-500/40 text-rose-300"
                            : "bg-white/10 text-white/70"
                        }`}
                      >
                        {selectedItem.details?.equipmentRequired ? "⚠ Required (Hardhat / Harness / Radio)" : "Standard Attire Only"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center text-white/40 text-[11px] pt-2">
                <span>Created: {new Date(selectedItem.createdAt).toLocaleString()}</span>
                <span>Updated: {new Date(selectedItem.updatedAt).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL (UTILIZES DELETE /api/requirements/:id) */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-[28px] p-6 bg-gradient-to-b from-[#1f0910] to-[#120408] border border-rose-500/30 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-950/80 border border-rose-500/50 flex items-center justify-center text-rose-400 mb-4">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Delete Requirement?</h3>
            <p className="text-xs text-white/60 mb-6 leading-relaxed">
              This will permanently delete this requirement from MongoDB Atlas. This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-xl border border-white/20 text-white/70 text-xs font-semibold hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                disabled={Boolean(deletingId)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white text-xs font-bold shadow-lg shadow-rose-950/50 hover:from-red-500 hover:to-rose-500 transition-all flex items-center gap-1.5"
              >
                {deletingId ? "Deleting..." : "Delete Permanently"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
