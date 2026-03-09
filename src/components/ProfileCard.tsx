// import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
// import { LinkedinIcon, GithubIcon, MailIcon, XIcon } from "./Icons";


export function ProfileCard() {
  return (
    <div className="p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 space-y-4">
      <div className="flex items-center gap-4 md:flex-col md:items-start lg:flex-row lg:items-center">
        <img 
          src="/red-tomato.ico" 
          alt="Profile" 
          className="w-16 h-16 rounded-full border-2 border-teal-500/50"
        />
        <div>
          <h3 className="font-bold text-zinc-50 text-lg">Stephane Mbatchou</h3>
          <p className="text-zinc-200 text-sm">Tomate Rouge</p>
        </div>
      </div>
      
      <p className="text-zinc-50 text-sm leading-relaxed">
Dedicated to uncovering the potential of AI and Distributed Computing through collaborative learning. I will be sharing my insights to deepen my understanding and inspire purposeful growth and technical confidence.      </p>

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
