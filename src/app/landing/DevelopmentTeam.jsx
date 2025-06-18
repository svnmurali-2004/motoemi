import React from "react";
import { Marquee } from "@/components/magicui/marquee"; // Adjust path if needed
import Image from "next/image"; // Ensure you have next/image installed
const team = [
  {
    name: "Svn.Murali",
    role: "Team Lead",
    desc: "Full Stack Developer & Project Lead. Passionate about scalable systems and team growth.",
    highlight: true,
    initial: "S",
  },
  {
    name: "Hrishik",
    role: "Developer",
    desc: "Frontend specialist and UI/UX enthusiast.",
    highlight: false,
    initial: "H",
  },
  {
    name: "E Mithil",
    role: "Developer",
    desc: "Backend developer and automation expert.",
    highlight: false,
    initial: "E",
  },
  {
    name: "Nishanth",
    role: "Developer",
    desc: "Data analytics and integration specialist.",
    highlight: false,
    initial: "N",
  },
];

export default function DevelopmentTeam() {
  return (
    <section className="py-16 px-4 md:px-12 lg:px-24 bg-white" id="team">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-10 text-center">
          Meet Our Development Team
        </h2>

        {/* Team Lead - Horizontal Card */}
        <div className="flex justify-center mb-12">
          <div className="relative bg-gradient-to-br from-indigo-100 to-indigo-300 rounded-xl shadow-xl p-4 flex items-center gap-6 border-4 border-indigo-600 w-full max-w-3xl">
            <div className="relative w-20 h-20 min-w-20 rounded-full overflow-hidden border-4 border-indigo-400 shadow">
              <Image
                src="/teamlead.jpg" // ✅ Your uploaded image path
                alt="Team Lead"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-extrabold text-indigo-800">
                {team[0].name}
              </h3>
              <div className="text-indigo-600 text-sm font-semibold mb-1">
                {team[0].role}
              </div>
              <p className="text-gray-700 text-sm">{team[0].desc}</p>
            </div>
            <span className="absolute top-3 right-4 bg-indigo-700 text-white text-xs px-3 py-1 rounded-full shadow font-bold">
              Team Lead
            </span>
          </div>
        </div>

        {/* Other Team Members - Horizontal scroll using Marquee */}
        <div className="w-full">
          <Marquee pauseOnHover className="py-2">
            {team.slice(1).map((member) => (
              <div
                key={member.name}
                className="relative bg-white rounded-xl shadow-md border border-gray-200 flex items-center gap-4 px-4 py-3 mx-4 min-w-[300px] max-w-[320px]"
              >
                <div className="w-16 h-16 min-w-16 rounded-full border-4 border-indigo-100 flex items-center justify-center bg-indigo-50 text-2xl font-bold text-indigo-700">
                  {member.initial}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800">
                    {member.name}
                  </h3>
                  <div className="text-sm font-medium text-gray-500">
                    {member.role}
                  </div>
                  <p className="text-sm text-gray-600">{member.desc}</p>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
