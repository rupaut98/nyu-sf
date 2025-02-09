export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white py-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Text Section */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 md:mr-12">
          <h1 className="text-5xl font-extrabold mb-4">
            Swipe into your Dream Job
          </h1>
          <p className="text-lg mb-6">
            Tinder changed dating. Swiped-In changes Hiring <br />
            
          </p>
          <a
            href="/auth/login"
            className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors text-lg mb-6 inline-block"
          >
            Get Started
          </a>
          <ul className="text-left text-lg space-y-6 mt-6">
            <li>
              🌟 <span className="text-lg font-bold">Tinder-style Job Matching</span>
              <p className="text-base mt-1">
                Swipe through tailored job openings effortlessly.
              </p>
            </li>
            <li>
              🤖 <span className="text-lg font-bold">AI-Powered Screening</span>
              <p className="text-base mt-1">
                Let recruiters' AI agents handle the first interaction.
              </p>
            </li>
            <li>
              💡 <span className="text-lg font-bold">Smarter Applications</span>
              <p className="text-base mt-1">
                Get tips and recommendations to boost your profile.
              </p>
            </li>
          </ul>
        </div>

        {/* Right Image Section */}
        <div className="md:w-5/12"> 
          <img
            src="/mockup.png"
            alt="App Mockup"
            className="rounded-xl shadow-lg mx-auto w-full max-w-md"
          />
        </div>
      </div>
    </div>
  );
}