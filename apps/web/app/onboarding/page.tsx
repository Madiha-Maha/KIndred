'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiClient } from '../../lib/api-client';
import { Sparkles, ArrowRight, User, Award, CheckCircle } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [role, setRole] = useState<'MENTOR' | 'LEARNER'>('LEARNER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [craft, setCraft] = useState('');
  const [rate, setRate] = useState('35');
  const [greeting, setGreeting] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleComplete() {
    setSubmitting(true);
    try {
      await apiClient.register({
        email: email || `user-${Date.now()}@kindred.org`,
        password: 'password123',
        name: name || (role === 'MENTOR' ? 'New Mentor' : 'New Apprentice'),
        role,
        bio: bio || 'Passionate about intergenerational wisdom and traditional practices.',
      });
      router.push(role === 'MENTOR' ? '/dashboard' : '/discover');
    } catch (e) {
      console.error(e);
      router.push('/discover');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F7F1E6] p-6 lg:p-12 flex items-center justify-center">
      <div className="max-w-xl w-full bg-[#FAF6EF] border border-[#E5D9C5] rounded-3xl p-8 sm:p-10 shadow-lg">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5D9C5]">
          <Link href="/" className="text-xs uppercase tracking-widest text-[#C1633D] font-bold">
            Kindred
          </Link>
          <span className="text-xs font-semibold text-[#415A44]">Step {step} of 3</span>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-3xl text-[#2F4131] font-medium">How do you wish to join?</h2>
              <p className="text-sm text-[#415A44] mt-1">
                Choose your primary role in the intergenerational exchange.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <button
                type="button"
                onClick={() => setRole('LEARNER')}
                className={`p-6 rounded-2xl border text-left transition flex flex-col justify-between ${
                  role === 'LEARNER'
                    ? 'border-[#C1633D] bg-[#FDFBF7] ring-1 ring-[#C1633D]'
                    : 'border-[#E5D9C5] bg-[#FAF6EF]'
                }`}
              >
                <div>
                  <span className="text-xs uppercase font-bold text-[#C1633D] tracking-wider">Seeker</span>
                  <h3 className="font-serif text-xl font-medium text-[#2F4131] mt-1">Apprentice</h3>
                  <p className="text-xs text-[#415A44] mt-2 leading-relaxed">
                    Learn heirloom craft techniques, slow living philosophy, and hands-on trades directly from elders.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole('MENTOR')}
                className={`p-6 rounded-2xl border text-left transition flex flex-col justify-between ${
                  role === 'MENTOR'
                    ? 'border-[#C1633D] bg-[#FDFBF7] ring-1 ring-[#C1633D]'
                    : 'border-[#E5D9C5] bg-[#FAF6EF]'
                }`}
              >
                <div>
                  <span className="text-xs uppercase font-bold text-[#C9A45C] tracking-wider">Keeper</span>
                  <h3 className="font-serif text-xl font-medium text-[#2F4131] mt-1">Senior Mentor</h3>
                  <p className="text-xs text-[#415A44] mt-2 leading-relaxed">
                    Pass down your lifetime of muscle memory, hard-won wisdom, and personal passion to eager apprentices.
                  </p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-full bg-[#C1633D] text-[#F7F1E6] font-medium hover:bg-[#A8502E] transition shadow-md flex items-center justify-center gap-2 text-sm"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-3xl text-[#2F4131] font-medium">Your Profile</h2>
              <p className="text-sm text-[#415A44] mt-1">
                Tell the community a little about your background.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#2F4131] mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Clara Whitmore"
                  className="w-full p-3 rounded-xl border border-[#E5D9C5] bg-[#FDFBF7] text-sm text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#2F4131] mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. clara@craftmail.com"
                  className="w-full p-3 rounded-xl border border-[#E5D9C5] bg-[#FDFBF7] text-sm text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#2F4131] mb-1.5">
                  Bio & Intentions
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="What brings you to Kindred? What crafts or stories move you?"
                  className="w-full p-3 rounded-xl border border-[#E5D9C5] bg-[#FDFBF7] text-sm text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3.5 px-6 rounded-full border border-[#2F4131] text-xs font-semibold text-[#2F4131] hover:bg-[#EDE3D1]"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 rounded-full bg-[#C1633D] text-[#F7F1E6] font-medium hover:bg-[#A8502E] text-sm"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-3xl text-[#2F4131] font-medium">
                {role === 'MENTOR' ? 'Your Studio & Craft' : 'Your Learning Wishlist'}
              </h2>
              <p className="text-sm text-[#415A44] mt-1">
                {role === 'MENTOR'
                  ? 'Set up your postcard details and hourly rate.'
                  : 'What crafts are you most excited to learn?'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-[#2F4131] mb-1.5">
                  Primary Craft or Tradition
                </label>
                <input
                  type="text"
                  value={craft}
                  onChange={(e) => setCraft(e.target.value)}
                  placeholder="e.g. Sourdough baking, Wood joinery, Bonsai"
                  className="w-full p-3 rounded-xl border border-[#E5D9C5] bg-[#FDFBF7] text-sm text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
                />
              </div>

              {role === 'MENTOR' && (
                <>
                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-[#2F4131] mb-1.5">
                      Session Rate ($ USD)
                    </label>
                    <input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      className="w-full p-3 rounded-xl border border-[#E5D9C5] bg-[#FDFBF7] text-sm text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider font-bold text-[#2F4131] mb-1.5">
                      Handwritten Postcard Greeting
                    </label>
                    <input
                      type="text"
                      value={greeting}
                      onChange={(e) => setGreeting(e.target.value)}
                      placeholder="e.g. Welcome to my workbench. Let's make something timeless."
                      className="w-full p-3 rounded-xl border border-[#E5D9C5] bg-[#FDFBF7] text-sm text-[#2F4131] focus:outline-none focus:border-[#C1633D]"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-3.5 px-6 rounded-full border border-[#2F4131] text-xs font-semibold text-[#2F4131] hover:bg-[#EDE3D1]"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleComplete}
                disabled={submitting}
                className="flex-1 py-3.5 rounded-full bg-[#2F4131] text-[#F7F1E6] font-medium hover:bg-[#1E2B20] text-sm"
              >
                {submitting ? 'Creating Profile...' : 'Complete & Enter Kindred'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
