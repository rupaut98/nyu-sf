export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">

          {/* Left Text Section */}
          <div className="md:w-1/2 text-center md:text-left">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4">
              Swipe into Your Dream Job
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-8">
              Tinder changed dating. Swiped-In changes hiring.
            </p>
            <a
              href="/auth/login"
              className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors text-lg md:text-xl inline-block"
            >
              Get Started
            </a>

            <div className="mt-12">
              <ul className="space-y-6">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <span className="text-2xl">🌟</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Tinder-style Job Matching</h3>
                    <p className="text-base mt-1">
                      Swipe through tailored job openings effortlessly.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">AI-Powered Screening</h3>
                    <p className="text-base mt-1">
                      Let recruiters' AI agents handle the first interaction.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <span className="text-2xl">💡</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Smarter Applications</h3>
                    <p className="text-base mt-1">
                      Get tips and recommendations to boost your profile.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Image Section */}
          <div className="md:w-1/2 mt-12 md:mt-0">
            <img
              src="/mockup.png"
              alt="App Mockup"
              className="rounded-xl shadow-lg mx-auto w-full max-w-lg"
            />
          </div>

        </div>
      </div>
    </div>
  );
}