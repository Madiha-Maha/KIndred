import React, { useState } from 'react';
import { useKindredStore } from '../store/useKindredStore';
import { ArrowRight, Sparkles, CheckCircle2, User, Award } from 'lucide-react';

export const OnboardingView: React.FC = () => {
  const store = useKindredStore();
  const [step, setStep] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState<'LEARNER' | 'MENTOR'>('LEARNER');
  const [fullName, setFullName] = useState('Julian Thorne');
  const [email, setEmail] = useState('julian@craftmail.org');
  const [bio, setBio] = useState(
    'Aspiring woodworker and lover of heritage architecture. Wanting to learn hand-cut joinery.'
  );
  const [craft, setCraft] = useState('Traditional Green Woodworking');
  const [rate, setRate] = useState('35');
  const [greeting, setGreeting] = useState('Welcome to my workbench. Let’s make something timeless.');

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    store.setUserRole(selectedRole);
    if (selectedRole === 'LEARNER') {
      store.navigate('discover');
    } else {
      store.navigate('dashboard');
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto">
      <div className="bg-[#FAF6EF] border-2 border-[#E5D9C5] rounded-3xl p-6 sm:p-10 shadow-xl space-y-8">
        <div className="flex items-center justify-between border-b border-[#E5D9C5] pb-4 text-xs font-semibold">
          <span className="text-[#C1633D] uppercase tracking-wider">Kindred Onboarding</span>
          <span className="text-[#415A44]">Step {step} of 3</span>
        </div>

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-3xl font-medium text-[#2F4131]">
                How will you join Kindred?
              </h2>
              <p className="text-xs sm:text-sm text-[#415A44] mt-1">
                Choose your role in the intergenerational wisdom exchange.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setSelectedRole('LEARNER')}
                className={`p-6 rounded-2xl border text-left transition flex flex-col justify-between ${
                  selectedRole === 'LEARNER'
                    ? 'border-[#C1633D] bg-[#FDFBF7] ring-2 ring-[#C1633D] shadow-xs'
                    : 'border-[#E5D9C5] bg-[#FAF6EF]'
                }`}
              >
                <div>
                  <span className="text-xs uppercase font-bold text-[#C1633D] tracking-wider">
                    Seeker
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#2F4131] mt-1">
                    Apprentice
                  </h3>
                  <p className="text-xs text-[#415A44] mt-2 leading-relaxed">
                    Learn heirloom craft techniques, philosophy, and manual skills directly from elders who have practiced for decades.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedRole('MENTOR')}
                className={`p-6 rounded-2xl border text-left transition flex flex-col justify-between ${
                  selectedRole === 'MENTOR'
                    ? 'border-[#C1633D] bg-[#FDFBF7] ring-2 ring-[#C1633D] shadow-xs'
                    : 'border-[#E5D9C5] bg-[#FAF6EF]'
                }`}
              >
                <div>
                  <span className="text-xs uppercase font-bold text-[#C9A45C] tracking-wider">
                    Keeper
                  </span>
                  <h3 className="font-serif text-xl font-medium text-[#2F4131] mt-1">
                    Senior Mentor
                  </h3>
                  <p className="text-xs text-[#415A44] mt-2 leading-relaxed">
                    Pass down your lifetime of muscle memory, hard-won wisdom, and personal passion to eager apprentices.
                  </p>
                </div>
              </button>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-full bg-[#C1633D] text-[#F7F1E6] font-medium text-sm hover:bg-[#A8502E] transition shadow-md flex items-center justify-center gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="font-serif text-3xl font-medium text-[#2F4131]">
                Your Background & Story
              </h2>
              <p className="text-xs sm:text-sm text-[#415A44] mt-1">
                Tell the Kindred community who you are.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#2F4131] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-3.5 rounded-2xl border border-[#E5D9C5] bg-[#FDFBF7] text-xs text-[#2F4131]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#2F4131] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3.5 rounded-2xl border border-[#E5D9C5] bg-[#FDFBF7] text-xs text-[#2F4131]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#2F4131] mb-1">
                  Personal Biography & Intentions
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-3.5 rounded-2xl border border-[#E5D9C5] bg-[#FDFBF7] text-xs text-[#2F4131]"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-3 px-6 rounded-full border border-[#2F4131] text-xs font-semibold text-[#2F4131] hover:bg-[#EDE3D1]"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex-1 py-3 px-6 rounded-full bg-[#C1633D] text-[#F7F1E6] text-xs font-semibold hover:bg-[#A8502E]"
              >
                Next Step
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <form onSubmit={handleFinish} className="space-y-6">
            <div>
              <h2 className="font-serif text-3xl font-medium text-[#2F4131]">
                {selectedRole === 'MENTOR' ? 'Your Studio & Craft' : 'Your Learning Intent'}
              </h2>
              <p className="text-xs sm:text-sm text-[#415A44] mt-1">
                {selectedRole === 'MENTOR'
                  ? 'Set up your postcard details and hourly rate.'
                  : 'What crafts are you most eager to study?'}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-bold tracking-wider text-[#2F4131] mb-1">
                  Primary Tradition
                </label>
                <input
                  type="text"
                  value={craft}
                  onChange={(e) => setCraft(e.target.value)}
                  className="w-full p-3.5 rounded-2xl border border-[#E5D9C5] bg-[#FDFBF7] text-xs text-[#2F4131]"
                />
              </div>

              {selectedRole === 'MENTOR' && (
                <>
                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#2F4131] mb-1">
                      Session Rate ($ USD)
                    </label>
                    <input
                      type="number"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      className="w-full p-3.5 rounded-2xl border border-[#E5D9C5] bg-[#FDFBF7] text-xs text-[#2F4131]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-[#2F4131] mb-1">
                      Handwritten Postcard Greeting
                    </label>
                    <input
                      type="text"
                      value={greeting}
                      onChange={(e) => setGreeting(e.target.value)}
                      className="w-full p-3.5 rounded-2xl border border-[#E5D9C5] bg-[#FDFBF7] text-xs text-[#2F4131]"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-3 px-6 rounded-full border border-[#2F4131] text-xs font-semibold text-[#2F4131] hover:bg-[#EDE3D1]"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-6 rounded-full bg-[#2F4131] text-[#F7F1E6] text-xs font-semibold hover:bg-[#1E2B20] transition shadow-md"
              >
                Complete & Enter Kindred
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
