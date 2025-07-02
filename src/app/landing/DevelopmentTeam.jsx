import React from "react";
import { Marquee } from "@/components/magicui/marquee"; // Adjust path if needed
import Image from "next/image"; // Ensure you have next/image installed
import { SparklesText } from "@/components/magicui/sparkles-text";
import { ShineBorder } from "@/components/magicui/shine-border"; // Adjust path if needed
import { motion } from "framer-motion";

const team = [
  {
    name: "Svn.Murali",
    role: "Team Lead",
    desc: "Full Stack Developer & Project Lead. Passionate about scalable systems and team growth.",
    highlight: true,
    initial: "S",
  },
  {
    name: "Sravya",
    role: "Developer",
    desc: "Frontend specialist and UI/UX enthusiast.",
    highlight: false,
    initial: "H",
  },
  {
    name: "Jahnavi",
    role: "Developer",
    desc: "Backend developer and automation expert.",
    highlight: false,
    initial: "E",
  }
];

export default function DevelopmentTeam() {
  return (
    <motion.section
      className="py-16 px-4 md:px-12 lg:px-24 bg-white"
      id="team"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-6xl mx-auto">
        <SparklesText className="text-3xl sm:text-4xl font-extrabold text-indigo-700 mb-10 text-center">
          Meet Our Development Team
        </SparklesText>

        {/* Team Lead - Horizontal Card */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <ShineBorder className="h-[10px]" />
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
        </motion.div>

        {/* Other Team Members - Horizontal scroll using Marquee */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
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
        </motion.div>
      </div>
    </motion.section>
  );
}
