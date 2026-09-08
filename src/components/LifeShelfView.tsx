import React, { useState } from 'react';
import { useKindredStore } from '../store/useKindredStore';
import { INITIAL_SKILLS } from '../data/mockData';
import {
  Search,
  Star,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Heart,
  ShieldCheck,
} from 'lucide-react';

export const LifeShelfView: React.FC = () => {
  const store = useKindredStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSkillFilter, setActiveSkillFilter] = useState<string | null>(null);

  const categories = [
    'All',
    'Craft & Pottery',
    'Woodworking',
    'Culinary Heritage',
    'Analog Arts',
    'Botany & Philosophy',
    'Textile Arts',
  ];

  const filteredMentors = store.mentors.filter((mentor) => {
    const matchCategory =
      selectedCategory === 'All' ||
      mentor.skills.some((s) => s.category.toLowerCase().includes(selectedCategory.toLowerCase()));

    const matchSkill =
      !activeSkillFilter || mentor.skills.some((s) => s.id === activeSkillFilter);

    const matchSearch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.bio.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.skills.some((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      mentor.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchCategory && matchSkill && matchSearch;
  });

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EDE3D1] text-[#2F4131] text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
          Signature Discovery Experience
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-light text-[#2F4131] leading-tight">
          The Kindred <span className="italic font-normal text-[#C1633D]">Life-Shelf</span>
        </h1>

        <p className="text-sm sm:text-base text-[#415A44] leading-relaxed">
          Craft traditions are not abstract resume lines. On our life-shelf, each heirloom skill is
          preserved as a tactile vessel, loaf, timber, or lens — waiting for your hands to learn its weight.
        </p>

        {/* Search & Category Pills */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="relative w-full max-w-md">
            <Search className="w-4 h-4 text-[#415A44] absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by craft, wood type, town, or mentor..."
              id="shelf-search-input"
              className="w-full pl-10 pr-4 py-3 rounded-full border border-[#E5D9C5] bg-[#FAF6EF] text-xs sm:text-sm text-[#2F4131] shadow-2xs focus:outline-none focus:border-[#C1633D] transition"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setActiveSkillFilter(null);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                selectedCategory === cat && !activeSkillFilter
                  ? 'bg-[#2F4131] text-[#F7F1E6] shadow-xs'
                  : 'bg-[#FAF6EF] text-[#2F4131] border border-[#E5D9C5] hover:bg-[#EDE3D1]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* THE TACTILE WOODEN LIFE-SHELF (Signature UI Component) */}
      <div className="bg-[#FAF6EF] border-2 border-[#D8C7B0] rounded-3xl p-6 sm:p-10 shadow-lg space-y-6 relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5D9C5]">
          <div>
            <h2 className="font-serif text-2xl text-[#2F4131] font-medium flex items-center gap-2">
              <span>Physical Shelf Objects</span>
              <span className="text-xs bg-[#EDE3D1] px-2.5 py-1 rounded-full text-[#C1633D] font-sans font-bold">
                Click any vessel to inspect
              </span>
            </h2>
            <p className="text-xs text-[#415A44] mt-0.5">
              Select an heirloom craft object from the timber shelf to isolate its masters below.
            </p>
          </div>

          {activeSkillFilter && (
            <button
              onClick={() => setActiveSkillFilter(null)}
              className="text-xs font-semibold text-[#C1633D] hover:underline"
            >
              Clear Shelf Filter ✕
            </button>
          )}
        </div>

        {/* Visual Wooden Shelves */}
        <div className="space-y-12 pt-4">
          {/* Top Wooden Shelf Plank */}
          <div className="relative">
            {/* The Shelf Items sitting on top */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-4 pb-4 px-2">
              {INITIAL_SKILLS.map((skill) => {
                const isSelected = activeSkillFilter === skill.id;
                return (
                  <button
                    key={skill.id}
                    onClick={() =>
                      setActiveSkillFilter(activeSkillFilter === skill.id ? null : skill.id)
                    }
                    className={`group flex flex-col items-center p-3 rounded-2xl transition duration-200 text-center ${
                      isSelected
                        ? 'bg-[#EDE3D1] ring-2 ring-[#C1633D] -translate-y-2 shadow-md'
                        : 'bg-[#FAF6EF] hover:-translate-y-1.5 hover:bg-[#FDFBF7]'
                    }`}
                  >
                    {/* Visual Craft Artifact */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#FDFBF7] border border-[#E5D9C5] shadow-xs flex items-center justify-center text-3xl sm:text-4xl mb-2.5 transition-transform group-hover:scale-105">
                      {skill.shelfObjectIcon || '🏺'}
                    </div>

                    <span className="font-serif text-xs font-semibold text-[#2F4131] line-clamp-1 group-hover:text-[#C1633D]">
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-[#415A44] mt-0.5 line-clamp-1">
                      {skill.category}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* The Hardwood Shelf Plank with 3D Depth */}
            <div className="h-4 rounded-md shelf-wood w-full shadow-md relative">
              <div className="h-1 shelf-wood-groove rounded-full mx-2 my-0.5" />
            </div>
            <div className="h-2 bg-[#442208]/20 w-full blur-xs -mt-1" />
          </div>
        </div>
      </div>

      {/* MENTORS DISPATCH LIST */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-3xl text-[#2F4131] font-medium">
              Wisdom Masters on This Shelf
            </h2>
            <p className="text-xs text-[#415A44] mt-1">
              Showing {filteredMentors.length} elders ready to welcome apprentices into their studio.
            </p>
          </div>
        </div>

        {/* Grid of Postcard Previews */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMentors.map((mentor) => {
            const compatibility = store.calculateCompatibility('learner-1', mentor.skills[0].id);

            return (
              <div
                key={mentor.id}
                className="postcard-texture border-2 border-[#E5D9C5] rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-md transition flex flex-col justify-between relative group"
              >
                {/* Stamp simulator */}
                <div className="absolute top-5 right-5 pointer-events-none opacity-80 group-hover:opacity-100 transition">
                  <div className="w-12 h-14 border border-dashed border-[#C1633D] rounded-sm bg-[#FAF6EF] flex flex-col items-center justify-center text-[8px] text-[#C1633D] font-mono leading-none">
                    <span>KINDRED</span>
                    <span className="font-serif font-bold text-xs mt-0.5">${mentor.ratePerSession}</span>
                    <span className="text-[7px]">AIRMAIL</span>
                  </div>
                </div>

                {/* Mentor Header */}
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pr-12">
                    <img
                      src={mentor.avatarUrl}
                      alt={mentor.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-[#E5D9C5] shadow-xs"
                    />
                    <div>
                      <h3 className="font-serif text-xl font-medium text-[#2F4131]">
                        {mentor.name}
                      </h3>
                      <p className="text-xs text-[#415A44] flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#C1633D]" />
                        {mentor.location}
                      </p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex items-center gap-1 text-xs text-[#C9A45C]">
                          <Star className="w-3.5 h-3.5 fill-current" />
                          <span className="font-bold text-[#2F4131]">{mentor.averageRating}</span>
                          <span className="text-[11px] text-[#415A44]">
                            ({mentor.reviewsCount})
                          </span>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EDE3D1] text-[#2F4131] font-medium">
                          {mentor.yearsOfExperience} yrs
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Handwritten Postcard Quote */}
                  <div className="p-3.5 rounded-xl bg-[#FAF6EF] border border-[#EDE3D1] text-xs font-serif italic text-[#2F4131] leading-relaxed">
                    "{mentor.handwrittenGreeting}"
                  </div>

                  {/* Skills Tags */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#415A44]">
                      Heirloom Skills:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {mentor.skills.map((s) => (
                        <span
                          key={s.id}
                          className="px-2.5 py-1 rounded-md bg-[#EDE3D1] text-[#2F4131] text-[11px] font-medium"
                        >
                          {s.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Compatibility Meter */}
                  <div className="p-3 rounded-xl bg-[#FAF6EF] border border-[#E5D9C5] flex items-center justify-between text-xs">
                    <span className="font-medium text-[#2F4131] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#C9A45C]" />
                      Kindred Synergy
                    </span>
                    <span className="font-bold text-[#C1633D] px-2 py-0.5 rounded-full bg-[#EDE3D1]">
                      {compatibility.score}% Match
                    </span>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="pt-6 border-t border-[#E5D9C5] mt-6 flex items-center justify-between">
                  <div>
                    <span className="text-xl font-serif font-bold text-[#2F4131]">
                      ${mentor.ratePerSession}
                    </span>
                    <span className="text-xs text-[#415A44]"> / 60 min</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        store.navigate('mentor-detail', { mentorId: mentor.id })
                      }
                      className="px-4 py-2 rounded-full bg-[#2F4131] text-[#F7F1E6] text-xs font-medium hover:bg-[#1E2B20] transition flex items-center gap-1.5"
                    >
                      Read Postcard <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
