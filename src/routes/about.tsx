import { createFileRoute } from '@tanstack/react-router';
import { Cpu, Zap, Database } from 'lucide-react';

export const Route = createFileRoute('/about')({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4">About</h1>
        <p className="text-xl text-zinc-100">
          This platform documents my exploration of High Performance Computing and Artificial Intelligence, serving as a knowledge base for technical experiments and architectural patterns.
        </p>
      </header>

      <section className="prose prose-invert prose-zinc max-w-none space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4 flex items-center gap-2">
            <Cpu className="text-teal-400" size={24} /> My Focus
          </h2>
          <p className="text-zinc-100 leading-relaxed">
            I emphasize applied science, focusing on the engineering craft required to translate abstract models into robust, efficient products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 py-4">
          <div className="p-5 space-x-2">
            <Zap className="text-teal-400 mb-3 inline-block" size={20} />
            <span className="text-zinc-100 font-semibold mb-2">High Performance</span>
            {/* <p className="text-zinc-400 text-sm">Experience with CUDA, Triton, and C++ for low-latency inference.</p> */}
          </div>
          <div className="p-5 space-x-2">
            <Database className="text-teal-400 mb-3 inline-block" size={20} />
            <span className="text-zinc-100 font-semibold mb-2">Model Efficiency</span>
            {/* <p className="text-zinc-400 text-sm">Deep dive into 4-bit/8-bit quantization and PEFT methods.</p> */}
          </div>
        </div>

        {/* <div>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4">Connect</h2>
          <div className="flex flex-col gap-4">
            <a href="https://github.com/orange-jaune" className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all group">
              <Github className="text-zinc-400 group-hover:text-teal-400" />
              <div>
                <div className="text-zinc-100 font-medium">GitHub</div>
                <div className="text-zinc-500 text-sm">Check out my open source CUDA kernels</div>
              </div>
            </a>
            <a href="mailto:hello@example.com" className="flex items-center gap-3 p-4 rounded-xl border border-zinc-800 hover:border-teal-500/50 hover:bg-teal-500/5 transition-all group">
              <Mail className="text-zinc-400 group-hover:text-teal-400" />
              <div>
                <div className="text-zinc-100 font-medium">Email</div>
                <div className="text-zinc-500 text-sm">Get in touch for collaborations</div>
              </div>
            </a>
          </div>
        </div> */}
      </section>
    </div>
  );
}