'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Star, MapPin, Clock, Search, ArrowRight } from 'lucide-react';
import { apiClient } from '../../lib/api-client';

export default function DiscoverPage() {
  const [mentors, setMentors] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await apiClient.getMentors();
        setMentors(res.mentors);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = ['All', 'Craft & Pottery', 'Woodworking', 'Culinary Heritage', 'Analog Arts', 'Textile Arts'];

  const filtered = mentors.filter((m) => {
    const matchCategory = selectedCategory === 'All' || m.skills.some((s: any) => s.category.includes(selectedCategory));
    const matchSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.skills.some((s: any) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7F1E6] p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10 text-center">
          <Link href="/" className="text-xs uppercase tracking-widest text-[#C1633D] font-bold hover:underline mb-2 inline-block">
            ← Return to Home
          </Link>
          <h1 className="font-serif text-4xl sm:text-5xl text-[#2F4131] font-light">
            The Kindred <span className="italic font-normal text-[#C1633D]">Life-Shelf</span>
          </h1>
          <p className="mt-3 text-[#415A44] max-w-xl mx-auto">
            Browse elder craftspeople, wisdom keepers, and heirloom practitioners ready to welcome you into their workshop.
          </p>

          {/* Search and Category Filters */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-[#415A44] absolute left-4 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by craft, mentor, or technique..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#E5D9C5] bg-[#FAF6EF] text-sm focus:outline-none focus:border-[#C1633D]"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-[#2F4131] text-[#F7F1E6]'
                    : 'bg-[#FAF6EF] text-[#2F4131] border border-[#E5D9C5] hover:bg-[#EDE3D1]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Life-Shelf Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((mentor) => (
            <div
              key={mentor.id}
              className="bg-[#FDFBF7] border border-[#E5D9C5] rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between relative overflow-hidden"
            >
              <div className="flex items-start gap-4">
                <img
                  src={mentor.avatarUrl}
                  alt={mentor.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#E5D9C5]"
                />
                <div>
                  <h3 className="font-serif text-xl text-[#2F4131] font-medium">{mentor.name}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#415A44] mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C1633D]" />
                    {mentor.location}
                  </div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-[#C9A45C]">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="font-semibold text-[#2F4131]">{mentor.averageRating}</span>
                    <span className="text-[#415A44]">({mentor.reviewsCount} sessions)</span>
                  </div>
                </div>
              </div>

              {/* Handwritten note snippet */}
              <div className="my-4 p-3 rounded-lg bg-[#FAF6EF] border border-[#EDE3D1] text-xs font-serif italic text-[#415A44] leading-relaxed">
                "{mentor.handwrittenGreeting}"
              </div>

              {/* Skills Shelf Tags */}
              <div className="space-y-2 mt-auto">
                <div className="flex flex-wrap gap-1.5">
                  {mentor.skills.map((s: any) => (
                    <span
                      key={s.id}
                      className="px-2.5 py-1 rounded-md bg-[#EDE3D1] text-[#2F4131] text-[11px] font-medium"
                    >
                      {s.name}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E5D9C5] flex items-center justify-between">
                  <div>
                    <span className="text-lg font-serif font-bold text-[#2F4131]">${mentor.ratePerSession}</span>
                    <span className="text-xs text-[#415A44]"> / 60 min</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/journal/${mentor.id}`}
                      className="text-xs text-[#415A44] hover:text-[#C1633D] font-medium"
                    >
                      Journal
                    </Link>
                    <Link
                      href={`/mentors/${mentor.id}`}
                      className="px-4 py-2 rounded-full bg-[#C1633D] text-[#F7F1E6] text-xs font-medium hover:bg-[#A8502E] transition flex items-center gap-1"
                    >
                      Postcard <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
