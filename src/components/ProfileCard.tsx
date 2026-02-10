// import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
// import { LinkedinIcon, GithubIcon, MailIcon, XIcon } from "./Icons";


export function ProfileCard() {
  return (
    <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 space-y-4">
      <div className="flex items-center gap-4 md:flex-col md:items-start lg:flex-row lg:items-center">
        <img 
          src="https://github.com/orange-jaune.png" 
          alt="Profile" 
          className="w-16 h-16 rounded-full border-2 border-teal-500/50"
        />
        <div>
          <h3 className="font-bold text-zinc-100 text-lg">Stephane Mbatchou</h3>
          <p className="text-zinc-400 text-sm">Red Tomato</p>
        </div>
      </div>
      
      <p className="text-zinc-400 text-sm leading-relaxed">
Dedicated to uncovering the potential of AI and Distributed Computing through collaborative learning. This space translates abstract theory into accessible knowledge, sharing insights to foster a deeper understanding of the field. The mission is to inspire purposeful growth and technical confidence.      </p>

      {/* <div className="flex gap-3 pt-2">
        <a href="https://github.com/orange-jaune" target="_blank" className="text-zinc-500 hover:text-teal-400 transition-colors">
          <GithubIcon className="w-[18px] h-[18px]" />
        </a>
        <a href="#" className="text-zinc-500 hover:text-teal-400 transition-colors">
          <XIcon className="w-[18px] h-[18px]" />
        </a>
        <a href="#" className="text-zinc-500 hover:text-teal-400 transition-colors">
          <LinkedinIcon className="w-[18px] h-[18px]" />
        </a>
        <a href="mailto:hello@example.com" className="text-zinc-500 hover:text-teal-400 transition-colors">
          <MailIcon size={18} />
        </a>
      </div> */}
    </div>
  );
}




// About Me
// I am driven by a curiosity for the mechanics of complex systems and the iterative process of turning conceptual models into functional reality. This space serves as an open journal for documenting those discoveries and sharing the journey of building with intent.

// My Focus
// I concentrate on the intersection of AI/ML, system architecture, and design, with a rigorous emphasis on applied science and the craft of product building. My goal is to bridge the gap between abstract theory and practical application to foster knowledge sharing and the creation of impactful, real-world tools.



// About Me
// This platform documents my exploration of High Performance Computing and Artificial Intelligence, serving as a knowledge base for technical experiments and architectural patterns. My goal is to bridge the gap between theoretical research and practical, scalable application building.

// My Focus
// I am dedicated to deconstructing the architecture and design principles behind modern AI/ML systems to understand how they function at scale. I emphasize applied science, focusing on the engineering craft required to translate abstract models into robust, efficient products.